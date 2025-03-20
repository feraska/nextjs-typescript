import { card } from "@/interfaces/card"
import axios, { AxiosError } from "axios"
import { useSearchParams } from "next/navigation"

import React, { useEffect, useState } from "react"
/**
 * 
 * @param url request api
 * @param page page state number
 * @param setPage set page state
 * @returns void
 */
const useLoadMore = (url:string,page:number,setPage:React.Dispatch<React.SetStateAction<number>>) => {
    const [data,setData] = useState<card[]>([])//data array
    const [error,setError] = useState("")//error
    const [loading,setloading] = useState(false)//loading
    const search = useSearchParams()//query string
    const [init,setInit] = useState(0)//initial new search
    const [first,setFirst] = useState(0)
    useEffect(()=> {
        setPage(1)
        setInit(0)
    },[search?.get("q"),search?.get("s")])
    useEffect(()=> {
        //get data
        const getData = async() => {
            try {
                setloading(true)
                const res =  await axios.get(`${url}`,{
                    headers:{
                        Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0M2ExYmEyODQzOTRiZTdlNmRjOGJjZGQyNjc0MDI3ZCIsInN1YiI6IjY1OWQ3ZGUyNjcyOGE4MDFhNTJmMGY1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nbpGYJefKmzpVTswVPSaTSzFUWPf3m80zj1sgDAtdn8"
                    }
                })
                setloading(false)
                if(page === 1) {
                    setData(res.data.results)
                } else
                setData((prev)=>[...prev,...res.data.results])
                } 
                catch (err) {
                    if(err instanceof AxiosError) {
                        setloading(false)
                        setError(err.response?.data)
                        throw new Error(err.response?.data)
                    }
                }
        }
        if(first === 0) {
            setFirst(1)
            return
        }
        if(init === 0 && page === 1) {
            setInit(1)
            }
            getData()
        
     },[page,init,first])
     //load more data
     const loadMore = () => {
         setPage((prev)=>prev+1)
     }
     //handle scroll infinite down
     const handleScroll = () => {
         if (Math.abs(window.innerHeight + document.documentElement.scrollTop - document.documentElement.offsetHeight)>=1 || loading) {
           return;
         }
         
         loadMore()
       };
       //scroll event
       useEffect(() => {
         window.addEventListener('scroll', handleScroll);
         return () => window.removeEventListener('scroll', handleScroll);
       }, []);
         
return {
    data,loading,error
}
}

export default useLoadMore