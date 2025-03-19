"use client"
import React, {   useState } from "react"
import dynamic from "next/dynamic"
import { IoIosArrowForward,IoIosArrowBack } from "react-icons/io"
const CardItem = dynamic(()=> import("../cardItem/CardItem"),{ssr:false}) 
import "./cards.scss"
import useApi from "../../hooks/useApi"
/**
 * 
 * @param param url it is api get request
 * @param genre optional param if user located in tv or movies page
 * @returns cards component
 */
const Cards:React.FC<{url:string,genre?:string}> = ({url,genre}) => {
    const {data} = useApi(url)//get to from api
    const list = React.createRef<HTMLUListElement>()//cards list slider
    const [numberSlider,setNumberSlider] = useState(0)//number of slider
    /**
     * onclick left or right arrow
     * @param type left or right slider
     * @returns void
     */
    const handleSlider = async(type:string) => {
        if(!list.current) {
            return
        }
       
       
        
        const distance = list.current.getBoundingClientRect().x
        if(type === "left") {
            list.current.style.transform = `translateX(${300+15+distance}px)`
            setNumberSlider((prev)=>prev-1)
        } if(type === "right") {
            list.current.style.transform = `translateX(${-300-15+distance}px)`
            setNumberSlider((prev)=>prev+1)
        }
   }
   //filter the slider according type of genre
   if(genre) {
    return(
    <div className="slider">
            <IoIosArrowBack className={`icon left ${(numberSlider===0)?"none":"visible"}`}  onClick={()=>handleSlider("left")}/>
        <ul ref={list}>
            {data?.results.length&&
            data.results.filter((a)=>a?.genre_ids?.includes(+genre))?.map((item,i)=>(
                
                <CardItem item={item} key={i}/>
                
                
            ))
            } 
        </ul>
        <IoIosArrowForward className={`icon right ${(numberSlider===data?.results.filter((a)=>a?.genre_ids?.includes(+genre)).length)?"none":"visible"}`} onClick={()=>handleSlider("right")}/>
        </div>
   
   
    )
}
    return(
        <div className="slider">
           
            <IoIosArrowBack className={`icon left ${(numberSlider===0)?"none":"visible"}`}  onClick={()=>handleSlider("left")}/>
        <ul ref={list}>
            {data?.results.length&&
            data.results.map((item,i)=>(
                
                <CardItem item={item} key={i}/>
                
                
            ))
            } 
        </ul>
        <IoIosArrowForward className={`icon right ${(numberSlider===data?.results.length)?"none":"visible"}`} onClick={()=>handleSlider("right")}/>
        </div>
        
    )
}
export default Cards