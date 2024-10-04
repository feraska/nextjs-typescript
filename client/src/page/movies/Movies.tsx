"use client"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
const Navbar = dynamic(()=>import( "../../components/navbar/Navbar"),{ssr:false})
const Footer = dynamic(()=> import( "../../components/footer/Footer"),{ssr:false})
import useGlobal from "../../hooks/useGloabal"
import Loading from "../../components/loading/Loading"
// import { AuthContext } from "../../context/AuthContext"
const SelectGenre = dynamic(()=>import( "../../components/selectGenre/SelectGenre"),{ssr:false})
const Movie = dynamic(()=>import("../movie/Movie"),{ssr:false,loading:()=><p>loading...</p>}) ;
const Vheader =  dynamic(()=>import( "../../components/vheader/Vheader"),{ssr:false})
import {useRouter,  useSearchParams } from "next/navigation"
import useScroll from "@/hooks/useScroll"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import useApi from "@/hooks/useApi"
import { setGenre } from "@/redux/slices/genre"

const Cards = dynamic(()=> import("../../components/cards/Cards"),{ssr:false}) 
const Playing = dynamic(()=> import("../../components/playing/Playing"),{ssr:false}) 

const Movies = () => {
    const {data} = useApi("https://api.themoviedb.org/3/genre/movie/list")
    const dispatch = useAppDispatch()
    useEffect(()=> {
        if(data?.genres) {
            dispatch(setGenre(data.genres))
        }
    },[data?.genres])
    const [genre,setgenre] = useState("")
    const search = useSearchParams()
    const id = search?.get("t")
    const router = useRouter()
    useScroll(id??"")
    useGlobal()
    //const {state} = useContext(AuthContext)
    const login = useAppSelector((state)=>state.user.login)
    if(login === 2) {
        return<Loading/>
    }
    if(login === 0) {
        router.push("/")
        return
    } 
    
   
    return (
        <>
         {id&&<Movie/>}
        <Navbar/>
        {<Vheader/>}
        <SelectGenre setGenre={setgenre}/>
            <Playing url="/9SSEUrSqhljBMzRe4aBTh17rUaC.jpg"/>
            <Cards url="https://api.themoviedb.org/3/movie/now_playing" genre={genre}/>
        <Footer/>
        </>
    )
}
export default Movies