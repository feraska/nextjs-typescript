"use client"
import React, { useEffect } from "react"
import useApi from "../../hooks/useApi"
import "./playing.scss"
import Image from "next/image"

const Playing:React.FC<{url:string}> = ({url}) => {
    const {data,getData} = useApi(url)
    useEffect(()=> {
        const get = async()=> {
            await getData()
        }
        get()
    },[])
    return(
        <div className="playing">
            {data?.results.length&&
             <Image alt="" width={500} height={100} src ={`https://image.tmdb.org/t/p/w500/${data?.results.length>=1?data?.results[1].poster_path:data?.results[0].poster_path}`}/>
            }
       
         
        </div>
    )
}
export default Playing