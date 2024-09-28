import React, {  EventHandler, MouseEvent, MouseEventHandler, useRef, useState } from "react"
import Details from "../details/Details"
import "./video.scss"

import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5"
import { useRouter } from "next/navigation"
import { card } from "@/interfaces/card"

const Video:React.FC<{item:card,isList?:boolean}> = ({item,isList=false}) => {
    const router = useRouter()
    const newRef = useRef<HTMLDivElement>(null);
    const [isMuted,setIsMuted] = useState(true)
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
                        {/* <iframe autoCapitalize=""
            src="https://www.youtube.com/embed/TYljxL4WeRo">
            </iframe> */}
            <video src="https://res.cloudinary.com/dpel2vfvq/video/upload/v1715930615/video_bie12o.mp4" autoPlay loop muted={isMuted} />
            <div className="volume" ref={newRef}>
            {isMuted?<IoVolumeMuteOutline/>:<IoVolumeHighOutline />}
            </div>
            </div>
            <Details item={item}  isList={isList}/>
        </div>
    )
}
export default Video