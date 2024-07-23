"use client"
import { IoArrowBack } from "react-icons/io5"

import "./watch.scss"
import { useRouter } from "next/navigation"
const Watch = () => {
    const router = useRouter()
    
    return (
    <div className="player">
          <div className="back">
            <IoArrowBack  onClick={() => router.back()} className="back-icon"/>
          </div>
          <video src={"https://res.cloudinary.com/dpel2vfvq/video/upload/v1715930615/video_bie12o.mp4"} autoPlay loop controls  />
        </div>
    )
}
export default Watch