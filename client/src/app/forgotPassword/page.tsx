// import List from "@/pages/list/List"
"use client"
import "@/app/App.scss"
import dynamic from "next/dynamic"
const Forgot1Password  = dynamic(()=>import("@/page/forgotPassword/ForgotPassword" ),{
    loading:()=><p>Loading..</p>,
    ssr:false
  }
 )

const Page = () => {
    return (
        <Forgot1Password/>
    )
}
export default Page