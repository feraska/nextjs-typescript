"use client"
import { ChangeEvent } from "react"
import "./forgotPassword2.scss"
import { useRouter } from "next/navigation"
const ForgotPassword2:React.FC<{onChangeDecCode:(value:string)=>void,encCode:string,decCode:string}> = ({onChangeDecCode,encCode,decCode}) => {
    const router = useRouter()
    const changeHandlerDecCode = (e:ChangeEvent<HTMLInputElement>) => {
        onChangeDecCode(e.target.value)
    }
    const clickHandler = () => {
    
    }
    const cancelClick = () => {
        router.push("/login")
    }
    return (
        <div className="step2">
            <div className="box">
            <h1>Enter Your Code</h1>
            <input type="text" onChange={changeHandlerDecCode} placeholder="enter your code"/>
            <button onClick={clickHandler}>Validate Code</button>
            <button onClick={cancelClick}>Cancel</button>
        </div>
        </div>
    )
}
export default ForgotPassword2