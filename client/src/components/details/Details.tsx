import { FaPlay } from "react-icons/fa"
import "./details.scss"
import { IoIosRemoveCircle, IoMdAdd } from "react-icons/io"
import { SlDislike, SlLike } from "react-icons/sl"
import React from "react"
import { actions } from "../../context/AuthContext"
import usePut from "../../hooks/usePut"
import { api } from "../../enums/api"
import { MdOutlineExpandMore } from "react-icons/md"

import Tooltip from "../tooltip/Tooltip"
import { useRouter, useSearchParams } from "next/navigation"
import { card } from "@/interfaces/card"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { addList, dislike, like, removeList } from "@/redux/slices/user"
const Details:React.FC<{item:card,isList:boolean}> = ({item,isList}) => {
    //const {state,dispatch} = useContext(AuthContext)
    const dispatch = useAppDispatch()
    const {put} = usePut(api.addToList)
    const {put:addToLikes} = usePut(api.like)
    const {put:removeFromLikes} = usePut(`${api.dislike}`)
    const {put:remove} = usePut(`${api.removeFromList}`)
    const router = useRouter()
    const user = useAppSelector((state)=>state.user.user)
    const genre = useAppSelector((state)=>state.genre.genre)
    const search = useSearchParams()
    const id = search?.get("q")
    const removeMovie = async()=> {
        try {
            await remove({image:item?.id})
        // dispatch({type:actions.remove_list,payload:item?.id})
        dispatch(removeList(item?.id))
        } catch(err) {
            console.log(err)
        }
    }
    const addHandler = async() => {
        try {
        await put({image:item?.id})
        
        // dispatch({type:actions.add_list,payload:item?.id})
        dispatch(addList(item?.id))
        
        } catch(err) {
            console.log(err)
        }
    }
    const likeHandler = async(action:string) => {
        try {
            if(action === actions.like) {
                await addToLikes({image:item?.id})
                // dispatch({type:actions.like,payload:item?.id})
                dispatch(like(item.id))
            } else {
                await removeFromLikes({image:item?.id})
                // dispatch({type:actions.dislike,payload:item?.id})
                dispatch(dislike(item?.id))
            }
        } catch(err) {
            console.log(err)
        }
    }
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
            <Tooltip text={!isList?"add":"remove"}>
            {!isList?<IoMdAdd className="icon-buttons" onClick={addHandler}/>:<IoIosRemoveCircle className="icon-buttons" onClick={removeMovie} />}
            </Tooltip>
            <Tooltip text={!user?.likes.includes(item?.id)?"like":"dislike"}>
            {!user?.likes.includes(item?.id)?<SlLike className="icon-buttons" onClick={()=>likeHandler(actions.like)}/>:<SlDislike className="icon-buttons" onClick={()=>likeHandler(actions.dislike)}/>}
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
           </div>
           
        </div>
        
        )
    }
export default Details