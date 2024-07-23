import axios, { AxiosError } from "axios";
import { useState } from "react";
const usePost = (url:string) => {
    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(false)
    const [message,setMessage] = useState("")
    const post = async(body)=> {
        try {
            setLoading(true)
            
            const message = await axios.post(url,body,{
                withCredentials:true,
                headers: {
                    'Content-Type': 'application/json'
                },
             
            })
            // const d = await fetch(url,{
            //     method:"POST",
            //     body:body,
            //     credentials:"include"
             
            // })
            // const message = await d.json()
            setMessage(message.data)
            setError(false)
            setLoading(false)
        } catch(err) {
            setMessage((err as AxiosError).response?.data.message)
            setError(true)
            setLoading(false)
            throw new Error((err as AxiosError).response?.data.message)
            
        }
        
    }
    return {
        post,error,message,loading
    }
}
export default usePost