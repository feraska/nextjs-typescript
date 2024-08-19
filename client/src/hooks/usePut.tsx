import axios, { AxiosError } from "axios";
import { useState } from "react";
const usePut = (url:string) => {
    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(false)
    const [message,setMessage] = useState("")
    const put = async(body={})=> {
        try {
            setLoading(true)
            const message = await axios.put(url,body,{
                withCredentials:true
            })
            setMessage(message.data)
            setError(false)
            setLoading(false)
        } catch(err) {
            if(err instanceof AxiosError) {
            setMessage(err.response?.data)
            setError(true)
            setLoading(false)
            throw new Error(err.response?.data)
            }
        }
        
    }
    return {
        put,error,message,loading
    }
}
export default usePut