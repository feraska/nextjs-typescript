"use client"
import "./navbar.scss"
import Logo from "../../assets/feras.png"
import {data} from "./data"
import { CiSearch } from "react-icons/ci";
import {  ChangeEvent,   MouseEventHandler,   useEffect, useRef, useState } from "react";
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
import { emptyUnread, getHum, logout } from "@/redux/slices/user";
import Loader from "../loader/Loader";
import usePut from "@/hooks/usePut";
const Navbar = () => {
    const notification = useAppSelector((state)=>state.notification.notification)//notification
    const user = useAppSelector((state)=>state.user.user)//user
    const dispatch = useAppDispatch()//dispatch redux
    const [scrolled,setScolled] = useState(false)//scroll x,y
    const {deletE,loading} = useDelete(api.logoutMainServer)//logout request
    const router = useRouter()//router
    const pathname = usePathname()//page pathname
    const search = useSearchParams()//query string
    const id = search?.get("q")//query string in search
    const [text,setText] = useState(id??"")//text in search
    const [showSearch,setShowSearch] = useState(search?.get("q")?true:false)//show searching text in search
    const [show,setShow] = useState(false)//show notification list 
    const {put:unreadEmpty} = usePut(api.emptyUnread)//update unread notification to user
    const searchRef = useRef<HTMLDivElement>(null);
    /**
     * navbar mobile
     */
    const clickHum = () => {
        
        dispatch(getHum())
    }
    /**
     * user type text search and check if user located in search page or not
     * @param e event change
     */
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
    
    /**
     * user logout 
     */
    const logOut = async() => {
        try {
            await deletE()
            dispatch(logout())
            router.push("/login")
        } catch(e) {

        }
    }

   

    useEffect(()=> {
        /**
         * check if scroll y bigger than 0 to change backgroud navbar
         */
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
    /**
     * handle click outside search
     */
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
            setShowSearch(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);
    
   
    /**
     * clear search
     */
    const clear = () => {
        setText("")
        setShowSearch(false)
        router.push("/")
       
        
    }
 
    /**
     * onclick icon notification
     */
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
            <RxHamburgerMenu className="h" onClick={clickHum}/>
            {user&&!loading?<PiSignOutLight className="logout" onClick={logOut}/>:<Loader/>}
            
            <h3>{user?.firstName}</h3>
            
            <ul>
            {data.map((value,i)=>(
                
                    <Link key={i} href={value.path} className={value.path === pathname?"active":""}  >
                    <li key={i}>{value.text}</li>
                    </Link>
             
            ))}
               </ul>
           
            </div>

            <div className="right">
                <div className="search" ref={searchRef}>
                {showSearch&&<IoIosClose className="close" onClick={clear} />}
                <CiSearch  className="icon"  onClick={()=>setShowSearch(!showSearch)}/>
                    {
                     showSearch&&  
                <input autoFocus value={text}  type="text" placeholder="type " onChange={handleChange} />
                    }
                </div>
                  
                
                {
                <div className="notification">
                <div className="info" onClick={clickNotification}> 
                <IoIosNotificationsOutline className="icon"/>
                {user?.unread!==0&&<span>{user?.unread}</span>}
                </div>
                {notification?.length!==0&&show&&<div className="message">
                    <ul>
                        {notification?.map((item)=>(
                                <li key={item._id}>
                                <div className="msg">
                                <span>{item?.msg}</span>
                                <span>{format(item?.createdAt??"")}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    

                </div>}
                </div>
                }

                
            </div>
        </nav>
        </header>
    )
}
export default Navbar