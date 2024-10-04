"use client"
import { ChangeEvent, FormEvent,   useState } from "react"
import dynamic from "next/dynamic"
const BackgroundImage = dynamic(()=> import( "../../components/backgroundImage/BackgroundImage"),{ssr:false})
import "./register.scss"
import usePost from "../../hooks/usePost"
import { api } from "../../enums/api"
// import { AuthContext } from "../../context/AuthContext"
import Loading from "../../components/loading/Loading"
import useGlobal from "../../hooks/useGloabal"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/redux/hooks"

const Register = () => {
    useGlobal()
    // const {state} = useContext(AuthContext)
    const [user,setUser] = useState({
        "email":"",
        "password":"",
        "firstName":"",
        "lastName":""
    })
    const {post,message,loading} = usePost(api.registerMainServer)
    const router = useRouter()
    const login = useAppSelector((state)=>state.user.login)
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setUser({...user,[e.target.name]:e.target.value})
    }
    const handleRegister = async(e:FormEvent) => {
        e.preventDefault()
        await post(user)
        
    }
    if(login === 2) {
       
        return<Loading/>
    }
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
            
                <input type="text" placeholder="first name" name="firstName" onChange={handleChange}/>
            </div>
            <div className="info">
            
                <input type="text" placeholder="last name" name="lastName" onChange={handleChange}/>
            </div>
            <div className="info">
            
                <input type="text" placeholder="email" name="email" onChange={handleChange}/>
            </div>
            <div className="info">
              
                <input type="password" placeholder="password" name="password" onChange={handleChange}/>
            </div>
            <button type="submit" disabled={loading?true:false}>Register</button>
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