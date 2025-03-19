"use client"
import React from "react"
import "./playing.scss"
import Image from "next/image"
/**
 * 
 * @param url get url data 
 * @returns playing component
 */
const Playing:React.FC<{url:string}> = ({url}) => {

    return(
        <div className="playing">
          
             <Image alt="" width={500} height={100} src ={`https://image.tmdb.org/t/p/w500${url}}`}/>
            
       
        </div>
    )
}
export default Playing