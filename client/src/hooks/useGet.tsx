import axios, { AxiosError } from "axios"
import { useState } from "react"
import User from "../interfaces/user"

interface o  {
    get:()=>Promise<void>,
    data:User | undefined,
    error:boolean,
    loading:boolean
}
const useGet =  (url:string):o => {
    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(false)
    const [data,setData] = useState<User>()

    const get = async()=> {
            try {
                setLoading(true)
                const message = await axios.get(url,{
                    withCredentials:true
                })
                
                setData(message.data)
                setError(false)
                setLoading(false)
            } catch(err) {
                setData(undefined)
                setError(true)
                setLoading(false)
                throw new Error((err as AxiosError).response?.data.message)
                
            }
       
        
    }
    
    return {
        get,error,data,loading
    }
}
export default useGet