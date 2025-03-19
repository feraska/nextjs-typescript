"use client"
import dynamic from "next/dynamic"
const Footer = dynamic(()=>import( "../../components/footer/Footer"),{ssr:false})
const Navbar = dynamic(()=>import( "../../components/navbar/Navbar"),{ssr:false})
import "./search.scss"
const CardItem = dynamic(()=>import( "../../components/cardItem/CardItem"),{ssr:false})
import Loading from "../../components/loading/Loading"
import React, {  useState } from "react"
const Movie = dynamic(()=>import("../movie/Movie"),{ssr:false,loading:()=><p>loading...</p>}) ;
const Vheader = dynamic(()=>import( "../../components/vheader/Vheader"),{ssr:false})
import { useRouter, useSearchParams } from "next/navigation"
import useGlobal from "@/hooks/useGloabal"
import useScroll from "@/hooks/useScroll"
import { useAppSelector } from "@/redux/hooks"
import useLoadMore from "@/hooks/useLoadMore"


const Search = () => {
    const search = useSearchParams()
    const id = search?.get("t")
    

    const login = useAppSelector((state)=>state.user.login)
    const [page,setPage] = useState(1)
    useScroll(id??"")
    useGlobal()
      
    const {data,error,loading} = useLoadMore(`https://api.themoviedb.org/3/search/movie?query=${search?.get("q")}&page=${page}`,page,setPage)
    const router = useRouter()
    
   
   
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
        
        <div className="filter">
            
            
            <ul>
                {data?.map((item,i)=>(
                    <CardItem item={item} key={i}/>
                ))}
            </ul>
            {loading&&<Loading/>}
        </div>
        <Footer/>
        </>
    )
}
export default Search