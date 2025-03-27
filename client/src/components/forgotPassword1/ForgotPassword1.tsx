"use client"
import { ChangeEvent } from "react"
import "./forgotPassword1.scss"
import { useRouter } from "next/navigation"
const ForgotPassword1:React.FC<{onChangeEmail:(value:string)=>void,onChangeEncCode:(value:string)=>void}> = ({onChangeEmail,onChangeEncCode}) => {
    const router = useRouter()
    const changeHandlerEmail = (e:ChangeEvent<HTMLInputElement>) => {
        onChangeEmail(e.target.value)
    }
    const clickHandler = () => {

    }
    const cancelClick = () => {
        router.push("/login")
    }
    return (
        <div className="step1">
            <div className="box">
            <h1>Enter Your Email</h1>
            <input type="text" onChange={changeHandlerEmail} placeholder="enter your email"/>
            <button onClick={clickHandler}>Send Code</button>
            <button onClick={cancelClick}>Cancel</button>
        </div>
        </div>
    )
}
export default ForgotPassword1