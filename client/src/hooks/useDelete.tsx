import axios, { AxiosError } from "axios";
import { useState } from "react";
const useDelete = (url:string) => {
    const [error,setError] = useState(false)//error
    const [loading,setLoading] = useState(false)//loading
    const [message,setMessage] = useState("")//message
    //delete request
    const deletE = async()=> {
        try {
            setLoading(true)
            const message = await axios.delete(url,{ withCredentials:true})
            
            setMessage(message.data)
            setError(false)
            setLoading(false)
        } 
        catch(err) {
            if(err instanceof AxiosError) {
                setMessage(err.response?.data)
                setError(true)
                setLoading(false)
                throw new Error(JSON.stringify(err.response?.data))
            }
        }
    }
    return {
        deletE,error,message,loading
    }
}
export default useDelete