import axios, { AxiosError } from "axios"
import {  useState } from "react"
export interface play {
    dates:{
        maximum:Date,
        minimum:Date,
    },
    results:Array<card>,
    genres:[]
    
}
export interface card {
    backdrop_path?:string,
    original_title?:string,
    poster_path?:string,
    adult?:boolean,
    genre_ids?:Array<number>,
    id:number,
    original_name?:string,
    genres:Array<genere>,
    spoken_languages:Array<lang>
}
export interface lang {
    english_name:string
}
export interface genre {
    name:string
}
export interface genere {
    id:number,
    name:number
}
const useApi = (url:string) => {
    const [data,setData] = useState<play>()
    const [error,setError] = useState("")
    const [loading,setloading] = useState(false)
        const getData = async() => {
            try {
                setloading(true)
              const res =  await axios.get(url,{
                    headers:{
                        Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0M2ExYmEyODQzOTRiZTdlNmRjOGJjZGQyNjc0MDI3ZCIsInN1YiI6IjY1OWQ3ZGUyNjcyOGE4MDFhNTJmMGY1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nbpGYJefKmzpVTswVPSaTSzFUWPf3m80zj1sgDAtdn8"
                    }
                })
                setloading(false)
                setData(res.data)
            } catch (err) {
                if(err instanceof AxiosError) {
                setloading(false)
                setError(err.response?.data)
                throw new Error(err.response?.data) 
                }
            }
        }
       

    
    
    return {getData,data,error,loading}
}
export default useApi