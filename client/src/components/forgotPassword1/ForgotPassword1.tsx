"use client"
import { ChangeEvent, useEffect, useState } from "react"
import "./forgotPassword1.scss"
import { useRouter } from "next/navigation"
import usePost from "@/hooks/usePost"
import { api } from "@/enums/api"
import Loader from "../loader/Loader"
import { errorMsg } from "@/interfaces/message"
/**
 * 
 * @param email email the user type
 * @param onChangeEmail email text onchange  
 * @param onChangeEncCode encrypt code onchange
 */
const ForgotPassword1:React.FC<{email:string,onChangeEmail:(value:string)=>void,onChangeEncCode:(value:string)=>void}> = ({onChangeEmail,onChangeEncCode,email}) => {
    const router = useRouter()//router
    const {error,loading,message,post} = usePost(api.sendEmail)//send email request
    const [messageError,setMessageError] = useState<errorMsg>()//error message
    /**
     * if email in text is change
     * @param e event change
     */
    const changeHandlerEmail = (e:ChangeEvent<HTMLInputElement>) => {
        onChangeEmail(e.target.value)
    }
    /**
     * if message return successfull 
     */
    useEffect(()=> {
        if(message) {
            onChangeEncCode(message)
            router.push("?step=2")
        }
    },[message])
    /**
     * button send code click
     */
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
    /**
     * if cancel button click
     */
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