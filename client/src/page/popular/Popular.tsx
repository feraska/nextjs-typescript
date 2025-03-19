"use client"

import dynamic from "next/dynamic"
const Navbar = dynamic( ()=>import("../../components/navbar/Navbar"),{ssr:false})
const Footer = dynamic(()=>import( "../../components/footer/Footer"),{ssr:false})
import useGlobal from "../../hooks/useGloabal"

import Loading from "../../components/loading/Loading"
const Movie = dynamic(()=>import("../movie/Movie"),{ssr:false}) ;
const Vheader = dynamic(()=>import( "../../components/vheader/Vheader"),{ssr:false})
import {  useRouter, useSearchParams } from "next/navigation"
import useScroll from "@/hooks/useScroll"
import { useAppSelector } from "@/redux/hooks"

const Cards = dynamic(()=> import("../../components/cards/Cards"),{ssr:false}) 
const Playing = dynamic(()=> import("../../components/playing/Playing"),{ssr:false}) 

const Popular = () => {
    const search = useSearchParams()//query string
    const id = search?.get("t")//query string modal
    useScroll(id??"")//save scroll x,y
    useGlobal()//globals
    const router = useRouter()//router
    const login = useAppSelector((state)=>state.user.login)//login redux
    const hum = useAppSelector((state)=>state.user.hum)//hum redux
    //initial page
    if(login === 2) {
        return<Loading/>
    }
    //if login false (not be user)
    if(login === 0) {
        router.push("/login")
        return
    } 
    return(
        <>
         {id&&<Movie/>}
        <Navbar/>
        {hum&&<Vheader/>}
            <Playing url= "/58D6ZAvOKxlHjyX9S8qNKSBE9Y.jpg"/>
            <Cards url="https://api.themoviedb.org/3/movie/popular"/>
        
        <Footer/>
        </>
    )
}
export default Popular