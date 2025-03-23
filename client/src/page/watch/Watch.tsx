"use client"
import { IoArrowBack } from "react-icons/io5"

import "./watch.scss"
import { useParams, useRouter } from "next/navigation"
import useGlobal from "@/hooks/useGloabal"
import Loading from "@/components/loading/Loading"
import { useAppSelector } from "@/redux/hooks"
import useInfo from "@/hooks/useInfo"
import { video } from "@/interfaces/video"
const Watch = () => {
    const router = useRouter()//router
    const login = useAppSelector((state)=>state.user.login)//login
    const params = useParams()//params
    const id = params.id//get params id
    
    const {data} = useInfo<video>(`https://api.themoviedb.org/3/movie/${id}/videos`)//get video about id
    useGlobal()//globals
    //initial page
    if(login === 2) {
        return<Loading/>
    }
    //login false
    if(login === 0) {
        router.push("/login")
        return
    }
    return (
    <div className="player">
          <div className="back">
            <IoArrowBack  onClick={() => router.back()} className="back-icon"/>
          </div>
          <iframe autoCapitalize=""
            src={`https://www.youtube.com/embed/${data?.results[0]?.key}?autoplay=1&mute=1`}
            allowFullScreen
            frameBorder="0" 
            >
            </iframe>
        </div>
    )
}
export default Watch