"use client"
import React, { useState } from "react"
import "./listItem.scss"
import useInfo from "../../hooks/useInfo"
import dynamic from "next/dynamic"
const Video = dynamic(()=>import("@/components/video/Video"),{ssr:false})
import Image from "next/image"

const ListItem:React.FC<{id:number}> = ({id}) => {
    const {data:item} = useInfo(`https://api.themoviedb.org/3/movie/${id}`)//information about a movie
    const [hover,setHover] = useState(false)//mouse hover
    if(!item) {
        return
    }

    return(
        <li className="list-item" onMouseOver={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
             <Image width={100} height={100} alt="" src={`https://image.tmdb.org/t/p/w500/${item?.poster_path?item?.poster_path:item?.backdrop_path}` }/>
             {hover&&<Video item={item} />}
        </li>
    )
}
export default ListItem