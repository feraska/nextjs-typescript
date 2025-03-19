import axios, { AxiosError } from "axios"
import {  useState } from "react"

const useGetArray = (url:string) => {
    const [data,setData] = useState<[]>()//get data array
    const [error,setError] = useState("")//error
    const [loading,setloading] = useState(false)//loading
    //get data
    const getData = async() => {
        try {
            setloading(true)
            const res =  await axios.get(url,{withCredentials:true})
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
    
    
    return {getData,data,error,loading}
}
export default useGetArray