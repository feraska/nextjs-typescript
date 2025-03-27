import React, { ChangeEvent, useState } from "react"
import "./forgotPassword3.scss"
import { useRouter } from "next/navigation"
const ForgotPassword3:React.FC<{email:string}> = ({email}) => {
    const router = useRouter()
    const [data,setData] = useState({
        newPassword:"",
        rePassword:""
    })
    const changeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setData({...data,[e.target.name]:e.target.value})
    }
    const clickHandler = () => {
        
    }
    const cancelClick = () => {
        router.push("/login")
    }
    return (
        <div className="step3">
           <div className="box">
            <h1>Enter Your New Password</h1>
            <input type="password" name="newPassword" onChange={changeHandler} placeholder="enter new passowrd"/>
            <input type="passsword" name="rePassword" onChange={changeHandler} placeholder="enter re-type passowrd"/>
            <button onClick={clickHandler}>Change Password</button>
            <button onClick={cancelClick}>Cancel</button>
        </div>

        </div>
    )
}
export default ForgotPassword3