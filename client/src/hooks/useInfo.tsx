"use client"
import {  useEffect, useState } from "react"

import axios, { AxiosError } from "axios"
import { card } from "@/interfaces/card"


const useInfo = (url:string) => {
    const [data,setData] = useState<card>()//get data
    const [error,setError] = useState("")//error
    const [loading,setloading] = useState(false)//loading
    const [first,setFirst] = useState(0)
    useEffect(()=> { 
        //get data
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
                    setError(err.response?.data)
                    setloading(false)
                    throw new Error(JSON.stringify(err.response?.data))
                    }
            }
        }
        if(first === 0) {
            setFirst(1)
            return
        }
        getData()
    
},[url,first])
return {
    data,loading,error
}
}


export default useInfo