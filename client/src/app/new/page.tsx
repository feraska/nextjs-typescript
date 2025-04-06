"use client"
import dynamic from "next/dynamic"
import "@/app/App.scss"
const Popular =  dynamic( ()=>import("@/page/popular/Popular") ,{
    loading:()=><p>Loading..</p>,
    ssr:false
  })

const Page = () => {
    return (
        <Popular/>
    )
}
export default Page