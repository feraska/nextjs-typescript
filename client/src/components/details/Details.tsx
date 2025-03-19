import { FaPlay } from "react-icons/fa"
import "./details.scss"
import { IoIosRemoveCircle, IoMdAdd } from "react-icons/io"
import { SlDislike, SlLike } from "react-icons/sl"
import React, { useState } from "react"
import usePut from "../../hooks/usePut"
import { api } from "../../enums/api"
import { MdOutlineExpandMore } from "react-icons/md"

import Tooltip from "../tooltip/Tooltip"
import { useRouter, useSearchParams } from "next/navigation"
import { card } from "@/interfaces/card"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { addList, dislike, like, removeList } from "@/redux/slices/user"
import { errorMsg } from "@/interfaces/message"
import Loader from "../loader/Loader"
/**
 * 
 * @param item card item movie 
 * @returns 
 */
const Details:React.FC<{item:card}> = ({item}) => {
    const dispatch = useAppDispatch()//dispatch redux
    const {put} = usePut(api.addToList)//request add to my list user
    const {put:addToLikes} = usePut(api.like)//request like the movie
    const {put:removeFromLikes} = usePut(`${api.dislike}`)//request dislike the movie
    const {put:remove} = usePut(`${api.removeFromList}`)//request remove from my list user
    const router = useRouter()//router page
    const user = useAppSelector((state)=>state.user.user)//user redux
    const genre = useAppSelector((state)=>state.genre.genre)//genre redux
    const search = useSearchParams()//query string
    const id = search?.get("q")//query string q
    const [messageError,setMessageError] = useState<errorMsg>()//error msg
    const [loadingList,setLoadingList] = useState(false)//loading to add or remove from list
    const [loadingLike,setLoadingLike] = useState(false)//loading to like or dislike a movie
   
    /**
     * add a movie to my list user
     * @param action check add or remove a movie from/to list
     */
    const addHandler = async(action:string) => {
        try {
            setLoadingList(true)
            if(action === "add") {
                await put({image:item?.id})
                dispatch(addList(item?.id))
            } else {
                await remove({image:item?.id})
                dispatch(removeList(item?.id))
            }
            
            setLoadingList(false)
        
        } catch(err) {
            const m = (err as Error)
            const s = JSON.parse(m.message)  
            const t:errorMsg = (s  as errorMsg)
            setMessageError(t)
            setLoadingList(false)
        }
    }
    /**
     * 
     * @param action to check like or dislike
     */
    const likeHandler = async(action:string) => {
        try {
            setLoadingLike(true)
            if(action === "like") {
                await addToLikes({image:item?.id})
                dispatch(like(item.id))
            } else {
                await removeFromLikes({image:item?.id})
                dispatch(dislike(item?.id))
            }
            setLoadingLike(false)
        } catch(err) {
            const m = (err as Error)
            const s = JSON.parse(m.message)  
            const t:errorMsg = (s  as errorMsg)
            setMessageError(t)
            setLoadingLike(false)
        }
    }
    /**
     * show details in modal
     */
    const showDetails = () => {
        if(!id)
        router.push(`?t=${item?.id}`)
        else 
        router.push(`?t=${item?.id}&q=${id}`)
    }
   if(!item) {
    return
   }
    return (
    
        <div className="details">
            <div className="clicks">
            <div className="buttons">
            <FaPlay className="icon-buttons" onClick={()=>router.push(`/watch/${item?.id}`)}/>
            <Tooltip text={!user?.list.includes(item.id)?"add to my list":"remove from my list"}>
            {
            !loadingList?
            !user?.list.includes(item.id)?<IoMdAdd className="icon-buttons" onClick={()=>addHandler("add")}/>
            :<IoIosRemoveCircle className="icon-buttons" onClick={()=>addHandler("remove")} />
            :<Loader/>
            }
            </Tooltip>
            <Tooltip text={!user?.likes.includes(item?.id)?"like":"dislike"}>
                
            {!loadingLike?
            !user?.likes.includes(item?.id)?<SlLike className="icon-buttons" onClick={()=>likeHandler("like")}/>:
                <SlDislike className="icon-buttons" onClick={()=>likeHandler("dislike")}/>
                :<Loader/>
            }
                
            </Tooltip>
            </div>
            <Tooltip text="info">
            <MdOutlineExpandMore className="more" onClick={showDetails}/>
            </Tooltip>
            </div>
            <div className="info">
                <span>{item?.original_title?item?.original_title:item?.original_name}</span>
            </div>
            
            <div className="genre">
            {genre?.filter((a)=>item?.genre_ids?.includes(a?.id))?.map((item)=>(
                <span key={item.id} >{item?.name}</span>
            ))}
            
            <p>{messageError?.message}</p>
           </div>
           
        </div>
        
        )
    }
export default Details