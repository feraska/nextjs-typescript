"use client"
import { useContext, useEffect, useState } from "react"
import useApi from "./useApi"
import { AuthContext, actions } from "../context/AuthContext"
import useGet from "./useGet"
import { api } from "../enums/api"
import useGetArray from "./useGetArray"
import usePost from "./usePost"
import { io } from "socket.io-client"

const useGlobal = () => {
    const {state,dispatch} = useContext(AuthContext)
    const {data,getData} = useApi("https://api.themoviedb.org/3/genre/movie/list")
    const {data:user,get} = useGet(api.findUser)
    const {data:messages,getData:getMessages} = useGetArray(api.getNotification)
    const {post} = usePost(api.addNotification)
    const [msg,setMsg] = useState(undefined)
    useEffect(()=> {
        return()=>{
        if(state?.socket?.id){
            return
        }
        const socket = io("https://0tb1mjxb-9000.euw.devtunnels.ms/")
        socket?.on("connect",()=> {
            console.log("connected")
            dispatch({type:actions.socket,payload:socket})
        })
        socket?.on("sendMsg",(msg)=> {
            setMsg(msg)
           
  
          })

          socket.on("disconnect",()=> {
            console.log("disconnect")
        })
      
    }
    },[state?.socket?.id])
    useEffect(()=> {
        return()=>{
        if(msg) {
        dispatch({type:actions.addNotification,payload:{...msg,to:state.user?._id}})
        post({...msg,to:state.user?._id})
        }
        }

    },[msg])
    useEffect(()=> {
        const getAll = async()=> {
           try {
            await get()
           } catch (err) {
            dispatch({type:actions.login,payload:0})
           }
            
        }
    return()=> {
        
        if(!state?.user) {
            getAll()
        }
    if(user) {
        dispatch({type:actions.get_likes,payload:user.likes})
        dispatch({type:actions.get_list,payload:user.list})
        dispatch({type:actions.user,payload:user})
        dispatch({type:actions.login,payload:1})
      }
}

    },[user])
    useEffect(()=> {
        const getAll = async()=> {
           
            await getData()
        }
    return()=>{
        if(!state.genre?.length) {
            getAll()
        }
       
    if(data){
    
    dispatch({type:actions.get_genre,payload:data?.genres})
    }
}
}

,[data])

useEffect(()=> {
    const getAll = async()=> {
        await getMessages()
       
        }
        return()=> {
            if(state.notification.length == 0) {
                getAll()
            }
            if(messages) {
                dispatch({type:actions.getNotification,payload:messages})
                
                }
    }
  
    
},[messages])
}


export default useGlobal