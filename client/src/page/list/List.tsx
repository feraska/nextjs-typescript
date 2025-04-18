"use client"
import "./list.scss"
import dynamic from "next/dynamic"
const Navbar = dynamic(()=>import("../../components/navbar/Navbar"),{ssr:false}) 
const Footer = dynamic(()=>import( "../../components/footer/Footer"),{ssr:false})
import Loading from "../../components/loading/Loading"
import useGlobal from "../../hooks/useGloabal"
const  ListItem = dynamic(()=>import( "../../components/listItem/ListItem"),{ssr:false})
const Movie = dynamic(()=>import("../movie/Movie"),{ssr:false}) ;
const Vheader = dynamic(()=>import( "../../components/vheader/Vheader"),{ssr:false})
import {useRouter , useSearchParams } from "next/navigation"
import useScroll from "@/hooks/useScroll"
import { useAppSelector } from "@/redux/hooks"

const List = ()=> {
    const router = useRouter()//router
    const search = useSearchParams()//query string
    const id = search?.get("t")//query string modal
    const user = useAppSelector((state)=>state.user.user)//user redux
    const login = useAppSelector((state)=>state.user.login)//login redux
    const hum = useAppSelector((state)=>state.user.hum)//hum redux
    useScroll(id??"")//save scroll x,y
    useGlobal()//globals
    //initial page
    if(login === 2) {
        return<Loading/>
    }
    //login false
    if(login === 0) {
        router.push("/login")
    return
    }
    return(
        <>
         {id&&<Movie/>}
        <Navbar/>
        {hum&&<Vheader/>}
        <div className="list" >
            <h1>My List</h1>
            <ul>
            {user?.list?.map((id,i)=>(
               <ListItem id={id} key={i}/>
            ))}
            </ul>
        </div>
        <Footer/>
        </>
    )
}
export default List