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
    const [id,setId] = useState("")//id
    /**
     * change email value
     * @param value current email value 
     */
    const emailChange = (value:string) => {
      setEmail(value)
    }
    /**
     * change encrypted code value
     * @param value current encrypted code value
     */
    const encCodeChange = (value:string) => {
      setEncCode(value)
    }
    /**
     * change decrypted code value
     * @param value current decrypted code value
     */
    const decCodeChange = (value:string) => {
      setDecCode(value)
    }
    /**
     * change id value
     * @param value current encrypted id value
     */
    const idChange = (value:string) => {
      setId(value)
    }
    if(step === "1") {
      return <ForgotPassword1 email = {email} onChangeEmail = {emailChange} onChangeEncCode={encCodeChange}/>
    }
    if(step === "2") {
      return <ForgotPassword2 email={email} onChageId={idChange}  onChangeDecCode = {decCodeChange} encCode = {encCode} decCode={decCode}/>
    }
    if(step === "3") {
      return <ForgotPassword3 id={id}/>
    }
    return <p>not found page</p>
   
}
export default ForgotPassword