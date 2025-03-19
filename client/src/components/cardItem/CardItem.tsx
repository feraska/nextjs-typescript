
"use client"
import React, { useState } from "react"
import "./cardItem.scss"
import dynamic from "next/dynamic"
import Image from "next/image"
import { card } from "@/interfaces/card"
const Video = dynamic(()=>import("@/components/video/Video"),{ssr:false})
/**
 * 
 * @param item:card item typeof card
 * @returns card items component
 */
const CardItem:React.FC<{item:card}> = ({item}) => {
    const [isHovered,setIsHovered] = useState(false)//if the mouse is over
   
    return (
        <li className="card-item" onMouseOver={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>
            <Image width={100} height={100} src={`https://image.tmdb.org/t/p/w500/${item.poster_path ? item.poster_path : item.backdrop_path}`} alt={""} />
            {isHovered&&<Video item={item}/>}
        </li>
    )
}
export default CardItem