import React, {  EventHandler, MouseEvent, MouseEventHandler, useRef, useState } from "react"
import Details from "../details/Details"
import "./video.scss"

import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5"
import { useRouter } from "next/navigation"
import { card } from "@/interfaces/card"
import useVideo from "@/hooks/useVideo"

const Video:React.FC<{item:card,isList?:boolean}> = ({item,isList=false}) => {
    const router = useRouter()
    const newRef = useRef<HTMLDivElement>(null);
    const [isMuted,setIsMuted] = useState(true)
    const {data,loading,error} = useVideo(`https://api.themoviedb.org/3/movie/${item.id}/videos`)
    
    const getMovie = (e:MouseEvent<HTMLDivElement>) => {
        if(handleOutsideClick(e)) {
        router.push(`/watch/${item?.id}`)
        }
    }
    const handleOutsideClick = (e:MouseEvent<HTMLDivElement>):boolean => {
     
        if (newRef.current && !newRef.current.contains(e.target as Node)) {
          return true
        } else {
            setIsMuted((prev)=>!prev)
          return false
        }  
      };
   
    return(
        <div className="video">
            <div className="show" onClick={getMovie}>
              
                        <iframe autoCapitalize=""
            src={`https://www.youtube.com/embed/${data?.results[0]?.key}?autoplay=1&mute=1`}
            
            frameBorder="0" 
            >
            </iframe>
            {/* <video src="https://www.youtube.com/watch?v=sjo6ajQ6uTs" autoPlay loop muted={isMuted} /> */}

            {/* <div className="volume" ref={newRef}>
            {isMuted?<IoVolumeMuteOutline/>:<IoVolumeHighOutline />}
            </div> */}
            </div>
            <Details item={item}  isList={isList}/>
        </div>
    )
}
export default Video