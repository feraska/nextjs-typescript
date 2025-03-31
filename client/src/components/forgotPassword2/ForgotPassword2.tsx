"use client"
import { ChangeEvent, useEffect, useState } from "react"
import "./forgotPassword2.scss"
import { useRouter } from "next/navigation"
import usePost from "@/hooks/usePost"
import { api } from "@/enums/api"
import { errorMsg } from "@/interfaces/message"
import Loader from "../loader/Loader"
/**
 * 
 * @param email email 
 * @param onChageId id onchange handler
 * @param encCode encrypt code 
 * @param decCode decrypt code
 */
const ForgotPassword2:React.FC<{email:string,onChageId:(value:string)=>void,onChangeDecCode:(value:string)=>void,encCode:string,decCode:string}> = ({email,onChageId,onChangeDecCode,encCode,decCode}) => {
    const router = useRouter()//router
    const {error,loading,message,post} = usePost(api.validateCode)//validate code request
    const [messageError,setMessageError] = useState<errorMsg>()//error message
    /**
     * if message return successfull
     */
    useEffect(()=> {
        if(message) {
            onChageId(message)
            router.push("?step=3")
        }
    },[message])
    /**
     * if decrypted code get value
     * @param e event change
     */
    const changeHandlerDecCode = (e:ChangeEvent<HTMLInputElement>) => {
        onChangeDecCode(e.target.value)
    }
    /**
     * if validate code click
     */
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
    /**
     * if cancel button click
     */
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