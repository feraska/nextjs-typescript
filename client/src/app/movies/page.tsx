"use client"
import dynamic from "next/dynamic"
import "@/app/App.scss"
const Movies = dynamic(()=>import( "@/page/movies/Movies") ,{
    loading:()=><p>Loading..</p>,
    ssr:false
  })

const Page = () => {
    return (
        <Movies/>
    )
}
export default Page