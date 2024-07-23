import React, {  useRef, useState } from "react"
import Details from "../details/Details"
import "./video.scss"
import { card } from "../../hooks/useApi"
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5"
import { useRouter } from "next/navigation"

const Video:React.FC<{item:card,id?:number,isList?:boolean}> = ({item,id,isList}) => {
    const router = useRouter()
    const newRef = useRef(null);
    const [isMuted,setIsMuted] = useState(true)
    const getMovie = (e) => {
        if(handleOutsideClick(e)) {
        router.push(`/watch/${item.id}`)
        }
    }
    const handleOutsideClick = (e):boolean => {
        if (newRef.current && !newRef.current.contains(e.target)) {
          return true
        } else {
            setIsMuted((prev)=>!prev)
          return false
        }  
      };
   
    return(
        <div className="video">
            <div className="show" onClick={(e)=>getMovie(e)}>
                        {/* <iframe autoCapitalize=""
            src="https://www.youtube.com/embed/TYljxL4WeRo">
            </iframe> */}
            <video src="https://res.cloudinary.com/dpel2vfvq/video/upload/v1715930615/video_bie12o.mp4" autoPlay loop muted={isMuted} />
            <div className="volume" ref={newRef}>
            {isMuted?<IoVolumeMuteOutline/>:<IoVolumeHighOutline />}
            </div>
            </div>
            <Details item={item} id={id} isList={isList}/>
        </div>
    )
}
export default Video