"use client"
import { ChangeEvent, useEffect, useState } from "react"
import "./forgotPassword2.scss"
import { useRouter } from "next/navigation"
import usePost from "@/hooks/usePost"
import { api } from "@/enums/api"
import { errorMsg } from "@/interfaces/message"
import Loader from "../loader/Loader"
const ForgotPassword2:React.FC<{email:string,onChageId:(value:string)=>void,onChangeDecCode:(value:string)=>void,encCode:string,decCode:string}> = ({email,onChageId,onChangeDecCode,encCode,decCode}) => {
    const router = useRouter()
    const {error,loading,message,post} = usePost(api.validateCode)
    const [messageError,setMessageError] = useState<errorMsg>()//error message
    useEffect(()=> {
        if(message) {
            onChageId(message)
            console.log(message)
            router.push("?step=3")
        }
    },[message])
    const changeHandlerDecCode = (e:ChangeEvent<HTMLInputElement>) => {
        onChangeDecCode(e.target.value)
    }
    const clickHandler = async() => {
        try {
            await post({email,encCode,decCode})
            
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
        <div className="step2">
            <div className="box">
            <h1>Enter Your Code</h1>
            <input type="text" onChange={changeHandlerDecCode} placeholder="enter your code"/>
            {loading?<Loader/>:
            <>
            <button onClick={clickHandler}>Validate Code</button>
            <button onClick={cancelClick}>Cancel</button>
            </>
            }
            <p>{error&&messageError?.message}</p>
        </div>
        </div>
    )
}
export default ForgotPassword2