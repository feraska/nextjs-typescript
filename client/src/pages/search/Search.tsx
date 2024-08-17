"use client"
import dynamic from "next/dynamic"
const Footer = dynamic(()=>import( "../../components/footer/Footer"),{ssr:false})
const Navbar = dynamic(()=>import( "../../components/navbar/Navbar"),{ssr:false})
import "./search.scss"
import useFilter from "../../hooks/useFilter"
const CardItem = dynamic(()=>import( "../../components/cardItem/CardItem"),{ssr:false})
import Loading from "../../components/loading/Loading"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import Movie from "../movie/Movie"
const Vheader = dynamic(()=>import( "../../components/vheader/Vheader"),{ssr:false})
import { useRouter, useSearchParams } from "next/navigation"
import useGlobal from "@/hooks/useGloabal"
const Search = () => {
    const search = useSearchParams()
    const id = search?.get("t")
    const {state} = useContext(AuthContext)
    useGlobal()
    const {data,loading} = useFilter(`https://api.themoviedb.org/3/movie/now_playing?page=${search?.get("q")}`)
    const router = useRouter()
    if(state.login === 2) {
       
        return<Loading/>
    }
    if(state.login === 0) {
        router.push("/login")
    }
    // if(loading) {
    //     return<p>Loading...</p>
    // } 
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