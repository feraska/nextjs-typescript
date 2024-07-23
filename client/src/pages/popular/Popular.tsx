"use client"
import { lazy, useContext } from "react"
import dynamic from "next/dynamic"
const Navbar = dynamic( ()=>import("../../components/navbar/Navbar"),{ssr:false})
const Footer = dynamic(()=>import( "../../components/footer/Footer"),{ssr:false})
import useGlobal from "../../hooks/useGloabal"
import { AuthContext } from "../../context/AuthContext"
import Loading from "../../components/loading/Loading"
import Movie from "../movie/Movie"
const Vheader = dynamic(()=>import( "../../components/vheader/Vheader"),{ssr:false})
import {  useRouter, useSearchParams } from "next/navigation"

const Cards = dynamic(()=> import("../../components/cards/Cards"),{ssr:false}) 
const Playing = dynamic(()=> import("../../components/playing/Playing"),{ssr:false}) 

const Popular = () => {
    const search = useSearchParams()
    const id = search?.get("t")
    useGlobal()
    const {state} = useContext(AuthContext)
    const router = useRouter()
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
            <Playing url="https://api.themoviedb.org/3/movie/popular"/>
            <Cards url="https://api.themoviedb.org/3/movie/popular"/>
        
        <Footer/>
        </>
    )
}
export default Popular