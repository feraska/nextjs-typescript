import dynamic from "next/dynamic"
import "@/app/App.scss"
const Tv =  dynamic( ()=>import("@/pages/tv/Tv" ) ,{
    loading:()=><p>Loading..</p>,
    ssr:false
  })

const Page = () => {
    return (
        <Tv/>
    )
}
export default Page