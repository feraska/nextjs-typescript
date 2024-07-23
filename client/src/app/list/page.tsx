// import List from "@/pages/list/List"
import "@/app/App.scss"
import dynamic from "next/dynamic"
const List  = dynamic(()=>import("@/pages/list/List" ),{
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