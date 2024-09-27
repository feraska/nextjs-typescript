"use client"
import dynamic from "next/dynamic"
import "@/app/App.scss"
const Watch =  dynamic(()=>import ("@/page/watch/Watch") ,{
    loading:()=><p>Loading..</p>,
    ssr:false
  })
import { useParams } from "next/navigation"


const Page = () => {
    const id = useParams()
    return (
        <Watch/>
    )
}
export default Page