"use client"
import dynamic from "next/dynamic"
import { lazy, useContext, useState } from "react"
const Navbar = dynamic(()=>import( "../../components/navbar/Navbar"),{ssr:false})
const Footer = dynamic(()=> import( "../../components/footer/Footer"),{ssr:false})
import useGlobal from "../../hooks/useGloabal"
import Loading from "../../components/loading/Loading"
import { AuthContext } from "../../context/AuthContext"
const SelectGenre = dynamic(()=>import( "../../components/selectGenre/SelectGenre"),{ssr:false})
const Movie = dynamic(()=>import("../movie/Movie"),{ssr:false,loading:()=><p>loading...</p>}) ;
const Vheader =  dynamic(()=>import( "../../components/vheader/Vheader"),{ssr:false})
import {useRouter,  useSearchParams } from "next/navigation"

const Cards = dynamic(()=> import("../../components/cards/Cards"),{ssr:false}) 
const Playing = dynamic(()=> import("../../components/playing/Playing"),{ssr:false}) 

const Movies = () => {
    const [genre,setGenre] = useState("")
    const search = useSearchParams()
    const id = search?.get("t")
    const router = useRouter()
    useGlobal()
    const {state} = useContext(AuthContext)
    if(state.login === 2) {
        return<Loading/>
    }
    if(state.login === 0) {
        router.push("/")
        return
    } 
    
   
    return (
        <>
         {id&&<Movie/>}
        <Navbar/>
        {<Vheader/>}
        <SelectGenre setGenre={setGenre}/>
            <Playing url="/9SSEUrSqhljBMzRe4aBTh17rUaC.jpg"/>
            <Cards url="https://api.themoviedb.org/3/movie/now_playing" genre={genre}/>
        <Footer/>
        </>
    )
}
export default Movies