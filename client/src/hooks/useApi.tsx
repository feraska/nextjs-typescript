import { play } from "@/interfaces/play"
import axios, { AxiosError } from "axios"
import {  useEffect, useState } from "react"



const useApi = (url:string) => {
    const [data,setData] = useState<play>()//data array
    const [error,setError] = useState("")//error
    const [loading,setloading] = useState(false)//loading
    useEffect(()=> {
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
                }
                catch (err) {
                    if(err instanceof AxiosError) {
                        setloading(false)
                        setError(err.response?.data)
                        throw new Error(err.response?.data) 
                    }
                }
        }
        getData()
    },[])
        
       

    
    
    return {data,error,loading}
}
export default useApi