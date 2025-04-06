"use client"
import dynamic from "next/dynamic"
import "@/app/App.scss"
const Search = dynamic( ()=>import( "@/page/search/Search") ,{
    loading:()=><p>Loading..</p>,
    ssr:false
  })

const Page = () => {
    return (
        <Search/>
    )
}
export default Page