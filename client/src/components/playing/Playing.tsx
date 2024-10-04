"use client"
import React from "react"
import "./playing.scss"
import Image from "next/image"

const Playing:React.FC<{url:string}> = ({url}) => {

    //const {data,getData} = useApi(url)
    // useEffect(()=> {
    //     const get = async()=> {
    //         await getData()
    //     }
    //     get()
    // },[])
    return(
        <div className="playing">
          
             <Image alt="" width={500} height={100} src ={`https://image.tmdb.org/t/p/w500${url}}`}/>
            
       
         
        </div>
    )
}
export default Playing