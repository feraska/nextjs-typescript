import React from "react"
import Details from "../details/Details"
import "./video.scss"

import { card } from "@/interfaces/card"
import useVideo from "@/hooks/useVideo"

const Video:React.FC<{item:card,isList?:boolean}> = ({item}) => {
    const {data} = useVideo(`https://api.themoviedb.org/3/movie/${item.id}/videos`)
    
   
    return(
        <div className="video">
            <div className="show" >
              
                        <iframe autoCapitalize=""
            src={`https://www.youtube.com/embed/${data?.results[0]?.key}?autoplay=1&mute=1`}
            
            frameBorder="0" 
            >
            </iframe>
            </div>
            <Details item={item} />
        </div>
    )
}
export default Video