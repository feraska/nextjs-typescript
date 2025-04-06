"use client"
import dynamic from "next/dynamic"
import "@/app/App.scss"
const Profile = dynamic(()=>import( "@/page/profile/Profile") ,{
    loading:()=><p>Loading..</p>,
    ssr:false
  })

const Page = () => {
    return (
        <Profile/>
    )
}
export default Page