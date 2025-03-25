"use client"
import { ChangeEvent, FormEvent,   useState } from "react"
import dynamic from "next/dynamic"
const BackgroundImage = dynamic(()=> import( "../../components/backgroundImage/BackgroundImage"),{ssr:false})
import "./register.scss"
import usePost from "../../hooks/usePost"
import { api } from "../../enums/api"
import Loading from "../../components/loading/Loading"
import useGlobal from "../../hooks/useGloabal"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/redux/hooks"
import { errorMsg } from "@/interfaces/message"
import Loader from "@/components/loader/Loader"

const Register = () => {
    useGlobal()//globals
    const [user,setUser] = useState({
        "email":"",
        "password":"",
        "firstName":"",
        "lastName":""
    })//user state 
    const {post,message,loading,error} = usePost(api.registerMainServer)//register request
    const router = useRouter()//router
    const login = useAppSelector((state)=>state.user.login)//lgoin redux
    const [messageError,setMessageError] = useState<errorMsg>()//error message
    /**
     * input change handler
     * @param e change event input
     */
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setUser({...user,[e.target.name]:e.target.value})
    }
    /**
     * user onclick register button
     * @param e form event
     */
    const handleRegister = async(e:FormEvent) => {
        e.preventDefault()
        try {
        await post(user)
        } 
        catch(err) {
            const m = (err as Error)
            const s = JSON.parse(m.message)  
            const t:errorMsg = (s  as errorMsg)
            setMessageError(t)
        }
        
    }
    /**
     * initial page
     */
    if(login === 2 ) {
       
        return<Loading/>
    }
    //login success
    if(login === 1) {
       router.push("/")
       return
    } 
 
    return(
        <div className="register">
        <BackgroundImage/>

        <div className="container">

            <div className="form-container">
        <form onSubmit={handleRegister}>
          <h3>Register</h3>
          <div className="info">
                <label>*</label>
                <input type="text" placeholder="first name" name="firstName" onChange={handleChange}/>
            </div>
            <div className="info">
                <label>*</label>
                <input type="text" placeholder="last name" name="lastName" onChange={handleChange}/>
            </div>
            <div className="info">
                <label>*</label>
                <input type="text" placeholder="email" name="email" onChange={handleChange}/>
            </div>
            <div className="info">
                <label>*</label>
                <input type="password" placeholder="password" name="password" onChange={handleChange}/>
            </div>
            {loading?<Loader/>:<button type="submit" disabled={loading?true:false}>Register</button>}
            <p>{error&&messageError?.message}</p>
            
            <p>{message}</p>
        </form>
        <Link href={"/login"}>
            
                Sign in Now
            
        </Link>
        </div>

        </div>
    </div>
    )
}
export default Register