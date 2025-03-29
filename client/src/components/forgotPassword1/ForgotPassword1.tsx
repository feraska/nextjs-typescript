"use client"
import { ChangeEvent, useEffect, useState } from "react"
import "./forgotPassword1.scss"
import { useRouter } from "next/navigation"
import usePost from "@/hooks/usePost"
import { api } from "@/enums/api"
import Loader from "../loader/Loader"
import { errorMsg } from "@/interfaces/message"
const ForgotPassword1:React.FC<{email:string,onChangeEmail:(value:string)=>void,onChangeEncCode:(value:string)=>void}> = ({onChangeEmail,onChangeEncCode,email}) => {
    const router = useRouter()
    const {error,loading,message,post} = usePost(api.sendEmail)
    const [messageError,setMessageError] = useState<errorMsg>()//error message
    const changeHandlerEmail = (e:ChangeEvent<HTMLInputElement>) => {
        onChangeEmail(e.target.value)
    }
    useEffect(()=> {
        if(message) {
            console.log(message)
            onChangeEncCode(message)
            router.push("?step=2")
        }
    },[message])
    const clickHandler = async() => {
        try {
            await post({email})
            
        }
        catch(err) {
          
            const m = (err as Error)
            const s = JSON.parse(m.message)  
            const t:errorMsg = (s  as errorMsg)
            setMessageError(t)
                    
        }
    }
    const cancelClick = () => {
        router.push("/login")
    }
    return (
        <div className="step1">
            <div className="box">
            <h1>Enter Your Email</h1>
            <input type="text" onChange={changeHandlerEmail} placeholder="enter your email"/>
            {loading?<Loader/>:<>
            <button onClick={clickHandler}>Send Code</button>
            <button onClick={cancelClick}>Cancel</button>
            </>
            }
            <p>{error&&messageError?.message}</p>
        </div>
        </div>
    )
}
export default ForgotPassword1