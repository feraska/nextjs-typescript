// import List from "@/pages/list/List"
import "@/app/App.scss"
import dynamic from "next/dynamic"
const Languages  = dynamic(()=>import("@/page/languages/Languages" ),{
    loading:()=><p>Loading..</p>,
    ssr:false
  }
 )

const Page = () => {
    return (
        <Languages/>
    )
}
export default Page