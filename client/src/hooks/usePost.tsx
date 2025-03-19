import axios, { AxiosError } from "axios";
import { useState } from "react";
const usePost = (url:string) => {
    const [error,setError] = useState(false)//error
    const [loading,setLoading] = useState(false)//loading
    const [message,setMessage] = useState("")//message
    /**
     * post request
     * @param body  param body
     */
    const post = async(body:any)=> {
        try {
            setLoading(true)
            
            const message = await axios.post(url,body,{
                withCredentials:true,
                headers: {
                    'Content-Type': 'application/json'
                },
             
            })
            setMessage(message.data)
            setError(false)
            setLoading(false)
        } 
        catch(err) {
            if(err instanceof AxiosError) {
                setError(true)
                setLoading(false)
                throw new Error(JSON.stringify(err.response?.data))
                }
            
        }
        
    }
    return {
        post,error,message,loading
    }
}
export default usePost