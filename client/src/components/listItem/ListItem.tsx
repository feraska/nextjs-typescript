"use client"
import React from "react"
import "./listItem.scss"
import useInfo from "../../hooks/useInfo"
import CardItem from "../cardItem/CardItem"
import { card } from "@/interfaces/card"

const ListItem:React.FC<{id:number}> = ({id}) => {
    const {data:item} = useInfo<card>(`https://api.themoviedb.org/3/movie/${id}`)//information about a movie
    
    if(!item) {
        return
    }

    return(
       <CardItem key={id} item={item}/>
    )
}
export default ListItem