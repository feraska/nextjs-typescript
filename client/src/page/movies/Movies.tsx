"use client"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
const Navbar = dynamic(()=>import( "../../components/navbar/Navbar"),{ssr:false})
const Footer = dynamic(()=> import( "../../components/footer/Footer"),{ssr:false})
import useGlobal from "../../hooks/useGloabal"
import Loading from "../../components/loading/Loading"
const SelectGenre = dynamic(()=>import( "../../components/selectGenre/SelectGenre"),{ssr:false})
const Movie = dynamic(()=>import("../movie/Movie"),{ssr:false}) ;
const Vheader =  dynamic(()=>import( "../../components/vheader/Vheader"),{ssr:false})
import {useRouter,  useSearchParams } from "next/navigation"
import useScroll from "@/hooks/useScroll"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import useApi from "@/hooks/useApi"
import { setGenre } from "@/redux/slices/genre"

const Cards = dynamic(()=> import("../../components/cards/Cards"),{ssr:false}) 
const Playing = dynamic(()=> import("../../components/playing/Playing"),{ssr:false}) 

const Movies = () => {
    const {data} = useApi("https://api.themoviedb.org/3/genre/movie/list")//get movies
    const dispatch = useAppDispatch()//dispatch redux
    useEffect(()=> {
        if(data?.genres) {
            dispatch(setGenre(data.genres))
        }
    },[data?.genres])
    const [genre,setgenre] = useState("")//genre user choice
    const search = useSearchParams()//query string
    const id = search?.get("t")//query string modal
    const router = useRouter()//router
    useScroll(id??"")//save scorll x,y
    useGlobal()//globals
    const login = useAppSelector((state)=>state.user.login)//login redux
    const hum = useAppSelector((state)=>state.user.hum)//hum redux
    //initial login
    if(login === 2) {
        return<Loading/>
    }
    //login false
    if(login === 0) {
        router.push("/login")
        return
    } 
    
   
    return (
        <>
         {id&&<Movie/>}
        <Navbar/>
        {hum&&<Vheader/>}
        <SelectGenre setGenre={setgenre}/>
            <Playing url="/9SSEUrSqhljBMzRe4aBTh17rUaC.jpg"/>
            <Cards url="https://api.themoviedb.org/3/movie/now_playing" genre={genre}/>
        <Footer/>
        </>
    )
}
export default Movies