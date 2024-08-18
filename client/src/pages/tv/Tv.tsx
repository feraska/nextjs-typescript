"use client"
import { lazy, useContext, useState } from "react"
import dynamic from "next/dynamic"
const Navbar = dynamic(()=>import( "../../components/navbar/Navbar"),{ssr:false})
const Footer = dynamic(()=>import( "../../components/footer/Footer"),{ssr:false})
import useGlobal from "../../hooks/useGloabal"
import { AuthContext } from "../../context/AuthContext"
import Loading from "../../components/loading/Loading"
const Cards = dynamic(()=> import("../../components/cards/Cards"),{ssr:false}) 
const Playing = dynamic(()=> import("../../components/playing/Playing"),{ssr:false}) 
import  "./tv.scss"
const SelectGenre = dynamic(()=>import( "../../components/selectGenre/SelectGenre"),{ssr:false})
import Movie from "../movie/Movie"
const Vheader = dynamic(()=>import( "../../components/vheader/Vheader"),{ssr:false})
import { useRouter, useSearchParams } from "next/navigation"

const Tv = ()=> {
    const {state} = useContext(AuthContext)
    const [genre,setGenre] = useState("")
    const search = useSearchParams()
    const id = search?.get("t")
    const router = useRouter()
    
    useGlobal()
    if(state.login === 2) {
        return<Loading/>
    }
    if(state.login === 0) {
        router.push("/login")
        return
    } 
    return(
        <>
    
        {id&&<Movie/>}
        <Navbar/>
        {<Vheader/>}
        <SelectGenre setGenre={setGenre}/>
        <Playing url="https://api.themoviedb.org/3/discover/tv"/>
        <Cards url="https://api.themoviedb.org/3/discover/tv" genre={genre}/>
    <Footer/>
    </>
    )
}
export default Tv