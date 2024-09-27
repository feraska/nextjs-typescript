"use client"
import { useContext, useEffect, useState } from "react"
import useApi from "./useApi"
import { AuthContext, actions } from "../context/AuthContext"
import useGet from "./useGet"
import { api } from "../enums/api"
import useGetArray from "./useGetArray"
import usePost from "./usePost"
import { io } from "socket.io-client"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { setGenre } from "@/redux/slices/genre"
import { addNotification, getNotification } from "@/redux/slices/notification"
import { getUser, login } from "@/redux/slices/user"

const useGlobal = () => {
    const genre = useAppSelector((state)=>state.genre.genre)
    const notification = useAppSelector((state)=>state.notification.notification)
    const User = useAppSelector((state)=>state.user.user)
    const sigin = useAppSelector((state)=>state.user.login)
    const socketIo = useAppSelector((state)=>state.user.socket)
    const dispatc = useAppDispatch()
    const {state,dispatch} = useContext(AuthContext)
    const {data,getData} = useApi("https://api.themoviedb.org/3/genre/movie/list")
    const {data:user,get} = useGet(api.findUser)
    const {data:messages,getData:getMessages} = useGetArray(api.getNotification)
    const {post} = usePost(api.addNotification)
    const [msg,setMsg] = useState(undefined)
    const [first,setFirst] = useState(0)
    const [firstSelect,setF] = useState(0)
    const [firstnot,setFirstNot] = useState(0)
    useEffect(()=> {
        
      //  return()=>{
        // if(firstSocket === 0) {
        //     setFirstSocket(1)
        //     return
        // }
        if(!User?._id) {
            
            return
        }
        if(socketIo?.id) {
            
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
      
   // }
    },[User?._id])

    useEffect(()=> {
        return()=>{
        if(!state.user?.email) {
            return
        }
        if(msg) {
        // dispatch({type:actions.addNotification,payload:{msg,to:state.user?._id}})
        dispatc(addNotification({msg,to:User?._id}))
        post({msg,to:User?._id})
        }
        }

    },[User?.email,msg])
    useEffect(()=> {
        const getAll = async()=> {
            try {
             await get()
            } catch (err) {
            //  dispatch({type:actions.login,payload:0})
            dispatc(login(0))
            }
             
         }
     //return()=> {
         if(first === 0) {
             setFirst(1)
             return
         }
         
         if(!state.user?._id) {
             getAll()
         }
    },[state.user?.email,first])
    useEffect(()=> {
        
        // if(first === 0) {
        //     setFirst(first+1)
        //     return
        // }
        
      
    if(user?._id) {
        // dispatch({type:actions.get_likes,payload:user.likes})
        // dispatch({type:actions.get_list,payload:user.list})
        // dispatch({type:actions.user,payload:user})
        dispatc(login(1))
        dispatc(getUser(user))
        
      }
//}
    },[user?._id])

    useEffect(()=> {
        if(firstSelect === 0) {
            setF(1)
            return
        }
        const getAll = async()=> {
           
            await getData()
        }
  //  return()=>{
        if(!genre?.length) {
            getAll()
        }
    },[firstSelect])

    useEffect(()=> {
       
       
    if(data){
        dispatc(setGenre(data.genres))
    }
//}
}

,[data])

useEffect(()=> {
    const getAll = async()=> {
        await getMessages()
       
        }
        if(firstnot === 0) {
            setFirstNot(1)
            return
        }
      //  return()=> {
            if(notification.length == 0 && User?.email) {
                getAll()
            }
            if(messages) {
                dispatc(getNotification(messages))
                
                }
   // }
  
    
},[messages,User?.email,firstnot])
}


export default useGlobal