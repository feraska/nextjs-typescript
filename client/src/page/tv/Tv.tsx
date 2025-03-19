"use client"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
const Navbar = dynamic(()=>import( "../../components/navbar/Navbar"),{ssr:false})
const Footer = dynamic(()=>import( "../../components/footer/Footer"),{ssr:false})
import useGlobal from "../../hooks/useGloabal"
import Loading from "../../components/loading/Loading"
const Cards = dynamic(()=> import("../../components/cards/Cards"),{ssr:false}) 
const Playing = dynamic(()=> import("../../components/playing/Playing"),{ssr:false}) 
import  "./tv.scss"
const SelectGenre = dynamic(()=>import( "../../components/selectGenre/SelectGenre"),{ssr:false})
const Movie = dynamic(()=>import("../movie/Movie"),{ssr:false,loading:()=><p>loading...</p>}) ;
const Vheader = dynamic(()=>import( "../../components/vheader/Vheader"),{ssr:false})
import { useRouter, useSearchParams } from "next/navigation"
import useScroll from "@/hooks/useScroll"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import useApi from "@/hooks/useApi"
import { setGenre } from "@/redux/slices/genre"

const Tv = ()=> {
    const {data} = useApi("https://api.themoviedb.org/3/genre/tv/list")//get data tv
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
    const login = useAppSelector((state)=>state.user.login)//login redux
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
        {<Vheader/>}
        <SelectGenre setGenre={setgenre}/>
        <Playing url="/uCY1j1YqfDWRbbS7hJwd9szX1sJ.jpg"/>
        <Cards url="https://api.themoviedb.org/3/discover/tv" genre={genre}/>
    <Footer/>
    </>
    )
}
export default Tv