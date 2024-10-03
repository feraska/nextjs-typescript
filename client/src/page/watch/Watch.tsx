"use client"
import { IoArrowBack } from "react-icons/io5"

import "./watch.scss"
import { useParams, useRouter } from "next/navigation"
import useGlobal from "@/hooks/useGloabal"
import { useContext } from "react"
import { AuthContext } from "@/context/AuthContext"
import Loading from "@/components/loading/Loading"
import { useAppSelector } from "@/redux/hooks"
import useVideo from "@/hooks/useVideo"
const Watch = () => {
    const {state} = useContext(AuthContext)
    const router = useRouter()
    const login = useAppSelector((state)=>state.user.login)
    const params = useParams()
    const id = params.id
    const {data,loading,error} = useVideo(`https://api.themoviedb.org/3/movie/${id}/videos`)
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
          <iframe autoCapitalize=""
            src={`https://www.youtube.com/embed/${data?.results[0]?.key}?autoplay=1&mute=1`}
            
            frameBorder="0" 
            >
            </iframe>
        </div>
    )
}
export default Watch