"use client"
import dynamic from "next/dynamic"
const Footer = dynamic(()=>import( "../../components/footer/Footer"),{ssr:false})
const Navbar = dynamic(()=>import( "../../components/navbar/Navbar"),{ssr:false})
import "./search.scss"
import useFilter from "../../hooks/useFilter"
const CardItem = dynamic(()=>import( "../../components/cardItem/CardItem"),{ssr:false})
import Loading from "../../components/loading/Loading"
// import { useContext, useEffect, useState } from "react"
// import { AuthContext } from "../../context/AuthContext"
import React from "react"
const Movie = dynamic(()=>import("../movie/Movie"),{ssr:false,loading:()=><p>loading...</p>}) ;
const Vheader = dynamic(()=>import( "../../components/vheader/Vheader"),{ssr:false})
import { useRouter, useSearchParams } from "next/navigation"
import useGlobal from "@/hooks/useGloabal"
import useScroll from "@/hooks/useScroll"
import { useAppSelector } from "@/redux/hooks"
const Search = () => {
    const search = useSearchParams()
    const id = search?.get("t")
    
   
    //const {state} = useContext(AuthContext)
    const login = useAppSelector((state)=>state.user.login)
    useScroll(id??"")
    useGlobal()
    const {data,loading} = useFilter(`https://api.themoviedb.org/3/search/movie?query=${search?.get("q")}`)
    const router = useRouter()
    if(login === 2) {
       
        return<Loading/>
    }
    if(login === 0) {
        router.push("/login")
        return
    }
    if(loading) {
        return<p>Loading...</p>
    } 
    return(
        <>
         {id&&<Movie/>}
        <Navbar/>
        {<Vheader/>}
        
        <div className="filter">
            {loading&&<p>Loading...</p>}
            <h1>Search</h1>
            <ul>
                {data?.results?.map((item,i)=>(
                    <CardItem item={item} key={i}/>
                ))}
            </ul>
        </div>
        <Footer/>
        </>
    )
}
export default Search