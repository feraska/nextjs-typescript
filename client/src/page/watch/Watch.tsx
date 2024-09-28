"use client"
import { IoArrowBack } from "react-icons/io5"

import "./watch.scss"
import { useRouter } from "next/navigation"
import useGlobal from "@/hooks/useGloabal"
import { useContext } from "react"
import { AuthContext } from "@/context/AuthContext"
import Loading from "@/components/loading/Loading"
import { useAppSelector } from "@/redux/hooks"
const Watch = () => {
    const {state} = useContext(AuthContext)
    const router = useRouter()
    const login = useAppSelector((state)=>state.user.login)
    useGlobal()
    
    if(login === 2) {
        return<Loading/>
    }
    if(login === 0) {
        router.push("/login")
        return
    }
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