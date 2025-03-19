import dynamic from "next/dynamic";
const Cards = dynamic(()=>import ( "../../components/cards/Cards"),{ssr:false})  
const Playing = dynamic(()=>import("../../components/playing/Playing"),{ssr:false}) ;
import "./home.scss"
const Navbar = dynamic( ()=>import( "../../components/navbar/Navbar"),{ssr:false});
const Footer = dynamic(()=>import( "../../components/footer/Footer"),{ssr:false});
import useGlobal from "../../hooks/useGloabal";
import Loading from "../../components/loading/Loading";
const Movie = dynamic(()=>import("../movie/Movie"),{ssr:false,loading:()=><p>loading...</p>}) ;
const Vheader = dynamic( ()=>import( "../../components/vheader/Vheader"),{ssr:false});
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import useScroll from "@/hooks/useScroll";
import { useAppSelector } from "@/redux/hooks";


const Home = () => {
    const login = useAppSelector((state)=>state.user.login)//login redux
    const router = useRouter()//router
    const search = useSearchParams()//query string
    const id = search?.get("t")//query string modal
    useScroll(id??"")//save scroll x,y
    useGlobal()//globals
    //if initial page 
    if(login === 2) {
        
        return<Loading/>
    }
    //if not be user(login false)
    if(login === 0) {
        router.push("/login")
        return
    }
   
    return (
        <>
      
     
       {id&&<Movie />}
        <Navbar/>
        {<Vheader/>}
      
        <div>

             <Playing url="/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg"/>
            <Cards url="https://api.themoviedb.org/3/discover/movie" /> 
          
          
        </div>
        <Footer/>
        </>
    )
}



export default Home;