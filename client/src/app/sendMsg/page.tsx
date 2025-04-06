"use client"
import dynamic from "next/dynamic"
import "@/app/App.scss"
const SendMsg = dynamic( ()=>import( "@/page/sendMsg/sendMsg") ,{
    loading:()=><p>Loading..</p>,
    ssr:false
  })

const Page = () => {
    return (
        <SendMsg/>
    )
}
export default Page