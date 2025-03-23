import React from "react"
import Details from "../details/Details"
import "./video.scss"

import { card } from "@/interfaces/card"
import useInfo from "@/hooks/useInfo"
import { video } from "@/interfaces/video"
/**
 * 
 * @param item:card item details 
 * @returns video component
 */
const Video:React.FC<{item:card}> = ({item}) => {
    const {data} = useInfo<video>(`https://api.themoviedb.org/3/movie/${item.id}/videos`)//get video by item.id
    
   
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