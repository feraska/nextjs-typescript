"use client"
import { ChangeEvent, useState } from "react"
import "./sendMsg.scss"
import usePost from "@/hooks/usePost"
import { api } from "@/enums/api"
import useGlobal from "@/hooks/useGloabal"
import { useAppSelector } from "@/redux/hooks"
import Loading from "@/components/loading/Loading"
import { useRouter } from "next/navigation"
import { socket } from "@/utils/getUser"
import { errorMsg } from "@/interfaces/message"
import Loader from "@/components/loader/Loader"
import Navbar from "@/components/navbar/Navbar"
import Vheader from "@/components/vheader/Vheader"
const SendMsg = () => {
    const [msg,setMsg] = useState("")
    const {post,loading,error} = usePost(api.addNotification)//add notification request
    const sigIn = useAppSelector((state)=>state.user.login)//login
    const user = useAppSelector((state)=>state.user.user)//login
    const router = useRouter()//router
    const [messageError,setMessageError] = useState<errorMsg>()//error message
    const hum = useAppSelector((state)=>state.user.hum)//hum redux
    useGlobal()
    //initial page
    if(sigIn === 2 || !user) {
        return<Loading/>
    }
    //false
    if(sigIn === 0) {
        router.push("/login")
        return
    }
    
    if(sigIn === 1 && !user?.isAdmin) {
        router.push("/")
        return
    }
    const handleChange =  (e:ChangeEvent<HTMLInputElement>) => {
        setMsg(e.target.value)
    }
    const clickHandler = async() => {
        try {
            socket?.emit("sendToAll",msg)
            await post({msg})
            setMsg("")
        }
        catch(err) {
            const m = (err as Error)
            const s = JSON.parse(m.message)  
            const t:errorMsg = (s  as errorMsg)
            setMessageError(t)
        }
    }
    return (
        <>
        <Navbar/>
        {hum&&<Vheader/>}
        <div className="sendMsg">
            <div className="box">
            <h1>Send Msg</h1>
            <input type="text" placeholder="send msg" onChange={handleChange} value={msg}/>
            {loading?<Loader/>:
            <button onClick={clickHandler}>Send Msg</button>
            }
            <p>{error&&messageError?.message}</p>
            </div>
        </div>
        </>
    )
}
export default SendMsg