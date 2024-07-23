"use client"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import "./list.scss"
import dynamic from "next/dynamic"
const Navbar = dynamic(()=>import("../../components/navbar/Navbar"),{ssr:false}) 
const Footer = dynamic(()=>import( "../../components/footer/Footer"),{ssr:false})
import Loading from "../../components/loading/Loading"
import useGlobal from "../../hooks/useGloabal"
const  ListItem = dynamic(()=>import( "../../components/listItem/ListItem"),{ssr:false})
import Movie from "../movie/Movie"
const Vheader = dynamic(()=>import( "../../components/vheader/Vheader"),{ssr:false})
import {useRouter , useSearchParams } from "next/navigation"

const List = ()=> {
    const {state} = useContext(AuthContext)
    const router = useRouter()
   const search = useSearchParams()
    const id = search?.get("t")
   useGlobal()
   if(state.login === 2) {
    return<Loading/>
}
if(state.login === 0) {
    router.push("/login")
}
    return(
        <>
         {id&&<Movie/>}
        <Navbar/>
        {<Vheader/>}
        <div className="list" >
            <h1>My List</h1>
            <ul>
            {state.list?.map((id,i)=>(
               <ListItem id={id} key={i}/>
            ))}
            </ul>
        </div>
        <Footer/>
        </>
    )
}
export default List