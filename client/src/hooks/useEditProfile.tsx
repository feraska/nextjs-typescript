import User from "@/interfaces/user"
import axios, { AxiosError } from "axios"
import { useState } from "react"

const useEditProfile = (url:string) => {
    const [error,setError] = useState(false)//error
    const [loading,setLoading] = useState(false)//loading
    const [data,setData] = useState("")//message
    /**
     * post request
     * @param body  param body
     */
    const post = async(file:File|null,user:User)=> {
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append('file', file??""); // You can append other form data here as well
            formData.append('firstName',user.firstName)
            formData.append('lastName',user.lastName)
            const res = await axios.post(url,formData,{
                withCredentials:true,
                headers: {
                    'Content-Type': 'multipart/form-data', 
                },
             
            
            })
            setData(res.data)
            setError(false)
            setLoading(false)
        } 
        catch(err) {
            if(err instanceof AxiosError) {
                console.log(err.response?.data)
                setError(true)
                setLoading(false)
                throw new Error(JSON.stringify(err.response?.data))
                }
            
        }
        
    }
    return {
        post,error,data,loading
    }
}

export default useEditProfile