import dynamic from "next/dynamic"
import "@/app/App.scss"
const Register = dynamic(()=>import( "@/pages/register/Register") ,{
    loading:()=><p>Loading..</p>,
    ssr:false
  })

const Page = () => {
    return (
        <Register/>
    )
}
export default Page