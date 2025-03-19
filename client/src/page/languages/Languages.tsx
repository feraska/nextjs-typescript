"use client"
import dynamic from "next/dynamic"
const Footer = dynamic(()=>import( "../../components/footer/Footer"),{ssr:false})
const Navbar = dynamic(()=>import( "../../components/navbar/Navbar"),{ssr:false})
import "./languages.scss"
const CardItem = dynamic(()=>import( "../../components/cardItem/CardItem"),{ssr:false})
import Loading from "../../components/loading/Loading"
import React, { ChangeEvent, useState } from "react"
const Movie = dynamic(()=>import("../movie/Movie"),{ssr:false,loading:()=><p>loading...</p>}) ;
const Vheader = dynamic(()=>import( "../../components/vheader/Vheader"),{ssr:false})
import { useRouter, useSearchParams } from "next/navigation"
import useGlobal from "@/hooks/useGloabal"
import useScroll from "@/hooks/useScroll"
import { useAppSelector } from "@/redux/hooks"
import useLoadMore from "@/hooks/useLoadMore"


const Languages = () => {
    const search = useSearchParams()//query string
    const id = search?.get("t")//query string modal
    const login = useAppSelector((state)=>state.user.login)//login redux
    const [page,setPage] = useState(1)//page number
    useScroll(id??"")//save scroll x,y
    useGlobal()//globals
    //load more data
    const {data,error,loading} = useLoadMore(`https://api.themoviedb.org/3/discover/movie?with_original_language=${search?.get("q")??"en"}&page=${page}&sort_by=${search?.get("s")}`,page,setPage)
    const router = useRouter()//router
    const hum = useAppSelector((state)=>state.user.hum)//hum redux
    /**
     * filter according language selected
     * @param e change event
     */
    const languageChange = (e:ChangeEvent<HTMLSelectElement>)=> {
        router.push(`?q=${e.target.value}&s=${search?.get("s")??""}`)
    }
    /**
     * sorting according user choice
     * @param e change event
     */
    const sortyChange = (e:ChangeEvent<HTMLSelectElement>)=> {
        router.push(`?q=${search?.get("q")??"en"}&s=${e.target.value}`)
    }
   
   //if initial page
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
        {hum&&<Vheader/>}
        
        <div className="languages">
            <div className="box">
            <h1>Languages</h1>
            <div className="dropdown">
                <div className="drop">
                    <label>Language</label>
                    <select defaultValue={search.get("q")??""} onChange={languageChange}>
                        <option value={"en"}>English</option>
                        <option value={"he"}>Hebrew</option>
                        <option value={"ar"}>arabic</option>
                    </select>
                </div>

                <div className="drop">
                    <label>Sortby</label>
                    <select defaultValue={search.get("sort")??""} onChange={sortyChange}>
                        <option value={"popularity.desc"}>Populary</option>
                        <option value={"primary_release_date.desc"}>Year Relased</option>
                        <option value={"original_title.asc"}>A-Z</option>
                        <option value={"original_title.desc"}>Z-A</option>
                    </select>
                </div>
            </div>
            <ul>
                {data?.map((item,i)=>(
                    <CardItem item={item} key={i}/>
                ))}
            </ul>
            {/**data loading more */}
            {loading&&<Loading/>}
        </div>
        </div>
        <Footer/>
        </>
    )
}
export default Languages