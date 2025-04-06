"use client"
import dynamic from "next/dynamic"
import "@/app/App.scss"
const Login = dynamic(()=>import("@/page/login/Login") ,{
    loading:()=><p>Loading..</p>,
    ssr:false
  })

const Page = () => {
    return(
        <Login/>
    )
}
export default Page