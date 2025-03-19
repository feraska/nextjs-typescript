"use client"
import dynamic from "next/dynamic"
import "@/app/App.scss"
const Watch =  dynamic(()=>import ("@/page/watch/Watch") ,{
    loading:()=><p>Loading..</p>,
    ssr:false
  })



const Page = () => {
    return (
        <Watch/>
    )
}
export default Page