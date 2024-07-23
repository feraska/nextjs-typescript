import axios, { AxiosError } from "axios"
import {  useState } from "react"

const useGetArray = (url:string) => {
    const [data,setData] = useState<[]>()
    const [error,setError] = useState("")
    const [loading,setloading] = useState(false)
        const getData = async() => {
            try {
                setloading(true)
              const res =  await axios.get(url,{withCredentials:true})
                setloading(false)
                setData(res.data)
            } catch (err) {
                setloading(false)
                setError((err as Error).message)
                throw new Error((err as AxiosError).response?.data.message)
            }
        }
    
       
       

    
    
    return {getData,data,error,loading}
}
export default useGetArray