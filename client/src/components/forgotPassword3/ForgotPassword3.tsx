import React, { ChangeEvent, useState } from "react"
import "./forgotPassword3.scss"
import { useRouter } from "next/navigation"
import usePut from "@/hooks/usePut"
import { api } from "@/enums/api"
import { errorMsg } from "@/interfaces/message"
import Loader from "../loader/Loader"
/**
 * 
 * @param id encrypted user id
 * 
 */
const ForgotPassword3:React.FC<{id:string}> = ({id}) => {
    const router = useRouter()
    const [data,setData] = useState({
        newPassword:"",
        rePassword:""
    })//new password and re-type password type in text
    const [messageError,setMessageError] = useState<errorMsg>()//error message
    const {error,loading,message,put} = usePut(api.forgotPassword)//new password request
    /**
     * input field is change
     * @param e change event
     */
    const changeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setData({...data,[e.target.name]:e.target.value})
    }
    /**
     * if change password button click
     */
    const clickHandler = async() => {
        try {
            await put({id,newPassword:data.newPassword,rePassword:data.rePassword})
            router.push("/login")
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
        <div className="step3">
           <div className="box">
            <h1>Enter Your New Password</h1>
            <input type="password" name="newPassword" onChange={changeHandler} placeholder="enter new passowrd"/>
            <input type="password" name="rePassword" onChange={changeHandler} placeholder="enter re-type passowrd"/>
            {loading?<Loader/>:
            <>
            <button onClick={clickHandler}>Change Password</button>
            <button onClick={cancelClick}>Cancel</button>
            </>
            }
            <p>{error&&messageError?.message}</p>
        </div>

        </div>
    )
}
export default ForgotPassword3