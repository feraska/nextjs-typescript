"use client"

import dynamic from "next/dynamic"
const Navbar = dynamic( ()=>import("../../components/navbar/Navbar"),{ssr:false})
const Footer = dynamic(()=>import( "../../components/footer/Footer"),{ssr:false})
import useGlobal from "../../hooks/useGloabal"

import Loading from "../../components/loading/Loading"
const Movie = dynamic(()=>import("../movie/Movie"),{ssr:false,loading:()=><p>loading...</p>}) ;
const Vheader = dynamic(()=>import( "../../components/vheader/Vheader"),{ssr:false})
import {  useRouter, useSearchParams } from "next/navigation"
import useScroll from "@/hooks/useScroll"
import { useAppSelector } from "@/redux/hooks"

const Cards = dynamic(()=> import("../../components/cards/Cards"),{ssr:false}) 
const Playing = dynamic(()=> import("../../components/playing/Playing"),{ssr:false}) 

const Popular = () => {
    const search = useSearchParams()
    const id = search?.get("t")
    useScroll(id??"")
    useGlobal()
    // const {state} = useContext(AuthContext)
    const router = useRouter()
    const login = useAppSelector((state)=>state.user.login)
    if(login === 2) {
        return<Loading/>
    }
    if(login === 0) {
        router.push("/login")
        return
    } 
    return(
        <>
         {id&&<Movie/>}
        <Navbar/>
        {<Vheader/>}
            <Playing url= "/58D6ZAvOKxlHjyX9S8qNKSBE9Y.jpg"/>
            <Cards url="https://api.themoviedb.org/3/movie/popular"/>
        
        <Footer/>
        </>
    )
}
export default Popular