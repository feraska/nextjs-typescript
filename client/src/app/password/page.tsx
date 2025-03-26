import dynamic from "next/dynamic"
import "@/app/App.scss"
const Password = dynamic(()=>import( "@/page/password/Password") ,{
    loading:()=><p>Loading..</p>,
    ssr:false
  })

const Page = () => {
    return (
        <Password/>
    )
}
export default Page