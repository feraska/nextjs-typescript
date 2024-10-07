import { card } from "@/interfaces/card"
import axios, { AxiosError } from "axios"
import { useSearchParams } from "next/navigation"

import React, { useEffect, useState } from "react"

const useLoadMore = (url:string,page:number,setPage:React.Dispatch<React.SetStateAction<number>>) => {
    const [data,setData] = useState<card[]>([])
    const [error,setError] = useState("")
    const [loading,setloading] = useState(false)
    const [init,setInit] = useState(0)
    const search = useSearchParams()
    useEffect(()=> {
        setPage(1)
        setInit(0)
    },[search?.get("q"),search?.get("s")])
    useEffect(()=> {
        // console.log(page)
         const f = async()=> {
                 await getData()
         }
         if(init === 0 && page === 1 || init !== 0) {
         f()
         setInit(1)
         } else {
             f()
         }
     },[page,init])
     const loadMore = () => {
         setPage((prev)=>prev+1)
     }
     const handleScroll = () => {
         if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) {
           return;
         }
         
         loadMore()
       };
       
       useEffect(() => {
         window.addEventListener('scroll', handleScroll);
         return () => window.removeEventListener('scroll', handleScroll);
       }, []);
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
            } catch (err) {
                if(err instanceof AxiosError) {
                setloading(false)
                setError(err.response?.data)
                throw new Error(err.response?.data)
                }
            }
        }
return {
    data,loading,error
}
}

export default useLoadMore