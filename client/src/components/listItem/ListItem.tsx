"use client"
import React, { useState } from "react"
import "./listItem.scss"

import useInfo from "../../hooks/useInfo"

// import Video from "../video/Video"
import dynamic from "next/dynamic"
const Video = dynamic(()=>import("@/components/video/Video"),{ssr:false})
import { useRouter } from "next/navigation"
const ListItem:React.FC<{id:string}> = ({id}) => {
    const {data:item} = useInfo(`https://api.themoviedb.org/3/movie/${id}`)
    const [hover,setHover] = useState(false)
    const router = useRouter()
    // const getInfo = () => {
    //     navigate(`/movie?t=${id}`)
    // }
    return(
        <li className="list-item" onMouseOver={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
             <img alt="" src={`https://image.tmdb.org/t/p/w500/${item?.poster_path?item?.poster_path:item?.backdrop_path}` }/>
             {hover&&<Video item={item} id={id} isList={true}/>}
        </li>
    )
}
export default ListItem