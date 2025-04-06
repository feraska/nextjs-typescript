// import List from "@/pages/list/List"
"use client"
import "@/app/App.scss"
import dynamic from "next/dynamic"
const List  = dynamic(()=>import("@/page/list/List" ),{
    loading:()=><p>Loading..</p>,
    ssr:false
  }
 )

const Page = () => {
    return (
        <List/>
    )
}
export default Page