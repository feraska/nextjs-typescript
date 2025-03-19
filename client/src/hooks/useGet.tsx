import axios, { AxiosError } from "axios"
import { useState } from "react"
import User from "../interfaces/user"


const useGet =  (url:string) => {
    const [error,setError] = useState(false)//error
    const [loading,setLoading] = useState(false)//loading
    const [data,setData] = useState<User>(
        {
        _id:"",
        email:"",
        firstName:"",
        lastName:"",
        likes:[],
        list:[],
        unread:0
    }//data user
)

    //get data
    const get = async()=> {
        try {
            setLoading(true)
            const message = await axios.get(url,{
                withCredentials:true
                })
                
                setData(message.data)
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
        get,error,data,loading
    }
}
export default useGet