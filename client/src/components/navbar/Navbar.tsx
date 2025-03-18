"use client"
import "./navbar.scss"
import Logo from "../../assets/feras.png"
import {data} from "./data"
import { CiSearch } from "react-icons/ci";
import {  ChangeEvent,   useEffect, useState } from "react";
//import { AuthContext, actions } from "../../context/AuthContext";
import { PiSignOutLight } from "react-icons/pi";
import useDelete from "../../hooks/useDelete";
import { api } from "../../enums/api";
import { IoIosClose, IoIosNotificationsOutline } from "react-icons/io";
import { format } from "timeago.js";
import React from "react"
import {  mobileWidth } from "@/utils/getUser";
import { RxHamburgerMenu } from "react-icons/rx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { emptyUnread, logout } from "@/redux/slices/user";
import Loader from "../loader/Loader";
import usePut from "@/hooks/usePut";
const Navbar = () => {
    const notification = useAppSelector((state)=>state.notification.notification)
    const user = useAppSelector((state)=>state.user.user)
    const dispatch = useAppDispatch()
    const [scrolled,setScolled] = useState(false)
    // const {state,dispatch} = useContext(AuthContext)
    const {deletE,loading} = useDelete(api.logoutMainServer)
    const router = useRouter()
    const pathname = usePathname()
    const search = useSearchParams()
    const id = search?.get("q")
    const [text,setText] = useState(id??"")
    const [showSearch,setShowSearch] = useState(search?.get("q")?true:false)
    const [show,setShow] = useState(false)
    const {put:unreadEmpty} = usePut(api.emptyUnread)
    const handleChange =  (e:ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
        setTimeout(()=> {
        if(!pathname.includes("search"))
        router.push(`/search?q=${e.target.value}`)
        else {
            router.push(`${pathname}?q=${e.target.value}`)
        }
        },1000)
        
    }
    
    
    const logOut = async() => {
        try {
        await deletE()
        // dispatch({type:actions.logout,payload:undefined})
        dispatch(logout())
        router.push("/login")
        } catch(e) {

        }
    }
    useEffect(()=> {
        
        const scroll = window.onscroll = ()=> {
            
            if(window.scrollY > 0) {
             
                setScolled(true)
            } else {
                setScolled(false)
            }
        }
        return()=> {
            removeEventListener("scroll",scroll)
        }
    },[])
    const run = () => {
        
        const vNav = (document.getElementsByClassName("v-nav")[0] as HTMLElement) 
       
        //vNav.style.display = "flex"
        
        if(vNav?.style.display === "") {
            vNav.style.display = "flex"
         //   setIsClick(true)
        }
         else if(vNav.style.display === "none") {
            vNav.style.display = "flex"
         //   setIsClick(true)
        }
        else if(vNav.style.display === "flex") {
             vNav.style.display = "none"
        }
       
       
    }
    const clear = () => {
       // setTimeout(()=> {
            setText("")
            setShowSearch(true)
            router.push("/")
       // },1000)
       
        
    }
    const clickNotification = async() => {
        setShow(!show)
        dispatch(emptyUnread())
        await unreadEmpty()
        
    }
    return(
        <header className={scrolled?"scrolled":""}>
        <nav>
            <div className="left">
            <div className="logo">
                <Image alt="" width={100} height={100} src={Logo.src}/>
            </div>
            <RxHamburgerMenu className="h" onClick={run}/>
            {user&&!loading?<PiSignOutLight className="logout" onClick={logOut}/>:<Loader/>}
            
            <h3>{user?.firstName}</h3>
            
            <ul>
            {data.map((value,i)=>(
                
                    <Link key={i} href={value.path} className={value.path === pathname?"active":""} replace>
                    <li key={i}>{value.text}</li>
                    </Link>
             
            ))}
               </ul>
           
            </div>

            <div className="right">
                <div className="search">
                {showSearch&&<IoIosClose className="close" onClick={clear} />}
                <CiSearch className="icon" onClick={()=>setShowSearch(true)} />
                    {
                        showSearch&&
                <input autoFocus value={text}  type="text" placeholder="type " onChange={handleChange} onBlur={()=>setShowSearch(false)}/>
                    }
                </div>
                  
                
                {!mobileWidth&&(
                <div className="notification">
                <div className="info" onClick={clickNotification}> 
                <IoIosNotificationsOutline className="icon"/>
                {user?.unread!==0&&<span>{user?.unread}</span>}
                </div>
                {notification?.length!==0&&show&&<div className="message">
                    <ul>
                        {notification?.map((item)=>(
                                <li key={item._id}>
                                {/* <Image alt="" width={100} height={100} src="https://res.cloudinary.com/dpel2vfvq/image/upload/v1710696637/fiverr/oezstpr0zovkzvju7zcg.jpg"/> */}
                                <div className="msg">
                                <span>{item?.msg}</span>
                                <span>{format(item?.createdAt??"")}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    

                </div>}
                </div>
                )}

                
            </div>
        </nav>
        </header>
    )
}
export default Navbar