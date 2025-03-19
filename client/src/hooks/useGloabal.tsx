"use client"
import { useEffect, useState } from "react"
import useGet from "./useGet"
import { api } from "../enums/api"
import useGetArray from "./useGetArray"
import usePost from "./usePost"
import { io, Socket } from "socket.io-client"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { addNotification, getNotification } from "@/redux/slices/notification"
import { getUser, incUnread, login } from "@/redux/slices/user"
import usePut from "./usePut"

const useGlobal = () => {
    const User = useAppSelector((state)=>state.user.user)//user redux
    const dispatch = useAppDispatch()//dispatch redux
    const {data:user,get} = useGet(api.findUser)//get user
    const {data:messages,getData:getMessages,error} = useGetArray(api.getNotification)//get notification request
    const {post} = usePost(api.addNotification)//add notification request
    const [msg,setMsg] = useState("")//message from socket
    const [first,setFirst] = useState(0)
    const [firstnot,setFirstNot] = useState(0)
    const {put:unreadInc} = usePut(api.incUnread)//unread message from socket
    let socket: Socket | null = null;//socket
    //create socket
    useEffect(()=> {
        
        if(!User) {
            
            return
        }
        socket = io("https://nextjs-typescript-1.onrender.com")
        try {

            socket?.on("connect",()=> {
            console.log("connected")
            })
            socket?.on("sendMsg",(msg)=> {
            setMsg(msg)
            })

            socket.on("disconnect",()=> {
            console.log("disconnect")
            })
    } 
    catch(err) {

    }
    },[User])
    //get message from socket
    useEffect(()=> {
        if(!User?.email) {
            return
        }
        if(msg!== "") {
            dispatch(addNotification({msg}))
            post({msg})
            dispatch(incUnread())
            unreadInc()
            setMsg("")
        }

    },[User?.email,msg])
    //
    useEffect(()=> {
        const getAll = async()=> {
            try {
                await get()
                dispatch(login(1))
            } 
            catch (err) {
                dispatch(login(0))
            }
             
         }
         if(first === 0) {
             setFirst(1)
             return
         }
         
         if(!User?._id) {
             getAll()
         }
    },[User?.email,first])
    useEffect(()=> {
      
    if(user?._id) {
        dispatch(login(1))
        dispatch(getUser(user))
        
      }
    },[user?._id])

useEffect(()=> {
    const getAll = async()=> {
        await getMessages()
        
        }
        if(firstnot === 0) {
            setFirstNot(1)
            return
        }
            if( User?.email) {
                getAll()
            }
            if(messages) {
                
                dispatch(getNotification(messages))
                }
  
    
},[messages?.length,User?.email,firstnot])
}


export default useGlobal