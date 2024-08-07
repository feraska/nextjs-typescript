import { lazy, useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Cards = dynamic(()=>import ( "../../components/cards/Cards"),{ssr:false})  
const Playing = dynamic(()=>import("../../components/playing/Playing"),{ssr:false}) ;
import "./home.scss"

const Navbar = dynamic( ()=>import( "../../components/navbar/Navbar"),{ssr:false});
const Footer = dynamic(()=>import( "../../components/footer/Footer"),{ssr:false});
import useGlobal from "../../hooks/useGloabal";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../components/loading/Loading";
import Movie from "../movie/Movie";

const Vheader = dynamic( ()=>import( "../../components/vheader/Vheader"),{ssr:false});
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";


const Home = () => {
    const {state,dispatch} = useContext(AuthContext)
    const router = useRouter()
    const search = useSearchParams()
    const id = search?.get("t")
   useGlobal()
  
    if(state.login === 2) {
        
        return<Loading/>
    }
    if(state.login === 0) {
        router.push("/login")
    }
   
    return (
        <>
       
       {id&&<Movie/>}
        <Navbar/>
        {<Vheader/>}
        
        <div>
        
            <Playing url="https://api.themoviedb.org/3/discover/movie"/>
            <Cards url="https://api.themoviedb.org/3/discover/movie" />
          
          
        </div>
        <Footer/>
        </>
    )
}



export default Home;