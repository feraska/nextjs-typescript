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
    const [first,setFirst] = useState(0)
    useEffect(()=> {
        setPage(1)
        setInit(0)
    },[search?.get("q"),search?.get("s")])
    useEffect(()=> {
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
        // console.log(page)
        //  const f = async()=> {
        //          await getData()
        //  }
        if(first === 0) {
            setFirst(1)
            return
        }
         if(init === 0 && page === 1) {
         //f()
         getData()
         setInit(1)
         }
         if(init === 1 && page !== 1)
          {
             //f()
             getData()
         }
     },[page,init,first])
     const loadMore = () => {
         setPage((prev)=>prev+1)
     }
     const handleScroll = () => {
         if (Math.abs(window.innerHeight + document.documentElement.scrollTop - document.documentElement.offsetHeight)>=1 || loading) {
           return;
         }
         
         loadMore()
       };
       
       useEffect(() => {
         window.addEventListener('scroll', handleScroll);
         return () => window.removeEventListener('scroll', handleScroll);
       }, []);
         
return {
    data,loading,error
}
}

export default useLoadMore