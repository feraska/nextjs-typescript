"use client"
import { useEffect, useState } from "react"
// import useApi from "./useApi"
// import { AuthContext, actions } from "../context/AuthContext"
import useGet from "./useGet"
import { api } from "../enums/api"
import useGetArray from "./useGetArray"
import usePost from "./usePost"
import { io, Socket } from "socket.io-client"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
// import { setGenre } from "@/redux/slices/genre"
import { addNotification, getNotification } from "@/redux/slices/notification"
import { getSocket, getUser, incUnread, login } from "@/redux/slices/user"
import usePut from "./usePut"

const useGlobal = () => {
    // const genre = useAppSelector((state)=>state.genre.genre)
    //const notification = useAppSelector((state)=>state.notification.notification)
    const User = useAppSelector((state)=>state.user.user)
    // const sigin = useAppSelector((state)=>state.user.login)
    const socketIo = useAppSelector((state)=>state.user.socket)
    const dispatch = useAppDispatch()
    //const {state,dispatch} = useContext(AuthContext)
    //const {data} = useApi("https://api.themoviedb.org/3/genre/movie/list")
    const {data:user,get} = useGet(api.findUser)
    const {data:messages,getData:getMessages,error} = useGetArray(api.getNotification)
    const {post} = usePost(api.addNotification)
    const [msg,setMsg] = useState("")
    const [first,setFirst] = useState(0)
    // const [firstSelect,setF] = useState(0)
    const [firstnot,setFirstNot] = useState(0)
    const {put:unreadInc} = usePut(api.incUnread)
    let socket: Socket | null = null;
    useEffect(()=> {
        
      //  return()=>{
        // if(firstSocket === 0) {
        //     setFirstSocket(1)
        //     return
        // }
        if(!User) {
            
            return
        }
        socket = io("https://nextjs-typescript-1.onrender.com")
        // if(socketIo?.id) {
            
        //     return
        // }
        try {
        
        socket?.on("connect",()=> {
            console.log("connected")
            //dispatch({type:actions.socket,payload:socket})
           // dispatch(getSocket(socket))
        })
        socket?.on("sendMsg",(msg)=> {
            console.log(msg)
            setMsg(msg)
            
  
          })

          socket.on("disconnect",()=> {
            console.log("disconnect")
        })
    } catch(err) {

    }
   // }
    },[User])

    useEffect(()=> {
        if(!User?.email) {
            return
        }
        if(msg!== "") {
        // dispatch({type:actions.addNotification,payload:{msg,to:state.user?._id}})
        dispatch(addNotification({msg}))
        post({msg})
        dispatch(incUnread())
        unreadInc()
        setMsg("")
        }

    },[User?.email,msg])
    useEffect(()=> {
        const getAll = async()=> {
            try {
             await get()
            } catch (err) {
            //  dispatch({type:actions.login,payload:0})
            dispatch(login(0))
            }
             
         }
     //return()=> {
         if(first === 0) {
             setFirst(1)
             return
         }
         
         if(!User?._id) {
             getAll()
         }
    },[User?.email,first])
    useEffect(()=> {
        
        // if(first === 0) {
        //     setFirst(first+1)
        //     return
        // }
        
      
    if(user?._id) {
        // dispatch({type:actions.get_likes,payload:user.likes})
        // dispatch({type:actions.get_list,payload:user.list})
        // dispatch({type:actions.user,payload:user})
        dispatch(login(1))
        dispatch(getUser(user))
        
      }
//}
    },[user?._id])

//     useEffect(()=> {
//         if(firstSelect === 0) {
//             setF(1)
//             return
//         }
//         // const getAll = async()=> {
           
//         //     await getData()
//         // }
//   //  return()=>{
//         // if(!genre?.length) {
//         //     getAll()
//         // }
//     },[firstSelect])

//     useEffect(()=> {
       
       
//     if(data){
//         dispatc(setGenre(data.genres))
//     }
// //}
// }

// ,[data])

useEffect(()=> {
    const getAll = async()=> {
        await getMessages()
        
        }
        if(firstnot === 0) {
            setFirstNot(1)
            return
        }
      //  return()=> {
            if( User?.email) {
                getAll()
            }
            if(messages) {
                
                dispatch(getNotification(messages))
                }
   // }
  
    
},[messages?.length,User?.email,firstnot])
}


export default useGlobal