"use client"
import { ChangeEvent, FormEvent,  useState } from "react"
import dynamic from "next/dynamic"
const BackgroundImage = dynamic(()=>import("../../components/backgroundImage/BackgroundImage"),{ssr:false}) 
import "./login.scss"
import usePost from "../../hooks/usePost"
import { api } from "../../enums/api"
import Loading from "../../components/loading/Loading"
import useGlobal from "../../hooks/useGloabal"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { login } from "@/redux/slices/user"
import { errorMsg } from "@/interfaces/message"
import Loader from "@/components/loader/Loader"


const  Login = () => {
    useGlobal()//globals
    const router = useRouter()//router
    const sigIn = useAppSelector((state)=>state.user.login)//login
    
    const dispatch = useAppDispatch()//dispatch redux
    const [user,setUser] = useState({
        "email":"",
        "password":""
    })//user state
    const {post,message,loading,error} = usePost(api.loginMainServer)//login request
    const [messageError,setMessageError] = useState<errorMsg>()//error message
    /**
     * email,password input event change
     * @param e change event
     */
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setUser({...user,[e.target.name]:e.target.value})
    }
    /**
     * user on click login button 
     * @param e formEvent
     */
    const handleLogin = async(e:FormEvent) => {
        e.preventDefault()
         try {
            await post(user)
            dispatch(login(1))
            router.push("/") 
        } 
        catch(err) {
            const m = (err as Error)
            const s = JSON.parse(m.message)  
            const t:errorMsg = (s  as errorMsg)
            setMessageError(t)
        }
         
    }

    //initial page
    if(sigIn === 2 ) {
        return<Loading/>
    }
    //login success go to home page
    if(sigIn === 1) {
        router.push("/")
        return
    } 
    return(
        <div className="login">
            <BackgroundImage/>

            <div className="container">

                <div className="form-container">
            <form onSubmit={handleLogin}>
              <h3>Login</h3>
            
                <div className="info">
                
                    <input type="text" name="email" placeholder="user name" onChange={handleChange}/>
                </div>
                <div className="info">
                  
                    <input type="password" name="password" placeholder="password" onChange={handleChange}/>
                </div>
                
                {loading?<Loader/>:<button type="submit"  disabled={loading?true:false}>Login</button>}
                <p>{error&&messageError?.message}</p>
                
            </form>
            
            <Link href="/register">
                
                    Sign up Now
                
            </Link>
            </div>

            </div>
        </div>
    )
}
export default Login