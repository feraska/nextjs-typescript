"use client"
import ForgotPassword1 from "@/components/forgotPassword1/ForgotPassword1"
import ForgotPassword2 from "@/components/forgotPassword2/ForgotPassword2"
import ForgotPassword3 from "@/components/forgotPassword3/ForgotPassword3"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

const ForgotPassword = () => {
    const query = useSearchParams()
    const step = query.get("step")
    const [email,setEmail] = useState("")//email
    const [encCode,setEncCode] = useState("")//encCode
    const [decCode,setDecCode] = useState("")//decCode
    const emailChange = (value:string) => {
      setEmail(value)
    }
    const encCodeChange = (value:string) => {
      setEncCode(value)
    }
    const decCodeChange = (value:string) => {
      setDecCode(value)
    }
    if(step === "1") {
      return <ForgotPassword1 onChangeEmail = {emailChange} onChangeEncCode={encCodeChange}/>
    }
    if(step === "2") {
      return <ForgotPassword2 onChangeDecCode = {decCodeChange} encCode = {encCode} decCode={decCode}/>
    }
    if(step === "3") {
      return <ForgotPassword3 email={email}/>
    }
    return <p>not found page</p>
   
}
export default ForgotPassword