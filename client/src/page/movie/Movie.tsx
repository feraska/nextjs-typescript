import "./movie.scss"
import useInfo from "../../hooks/useInfo"
import { AiFillCloseCircle } from "react-icons/ai"
import {  usePathname, useRouter, useSearchParams } from "next/navigation"

import Image from "next/image"
const Movie = () => {

    const router = useRouter()//router
    const path = usePathname()//page path
    const search = useSearchParams()//query string
    const id = search?.get("t")//query string modal
    const q = search?.get("q")//query string search

    const {data:item} = useInfo(`https://api.themoviedb.org/3/movie/${id}`)//get info about id
    return(
        <div className="window">
            <div className="data">
            <AiFillCloseCircle className="close" onClick={()=>router.push(q?`${path}?q=${q}`:path??"/")}/>
        <div className="movie">
            <div className="item">
            <h1>{item?.original_title}</h1>
            <div className="genre">
                {item?.genres?.map((genre,i)=>(
                    <h3 key={i}>{genre.name}</h3>

            ))}
            </div>
            <div className="lang">
                {item?.spoken_languages.map((lan,i)=>(
                    <h3 key={i}>{lan.english_name}</h3>
                ))}
            </div>
            <div className="images">
            <Image alt="" width={100} height={100} src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}/>
            <Image alt="" width={100} height={100} src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}/>
            </div>
            <p>{item?.overview}</p>
        </div>
        </div>
        </div>
        </div>
        
    )
}
export default Movie