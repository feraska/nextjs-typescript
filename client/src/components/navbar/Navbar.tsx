"use client"
import "./navbar.scss"
import Logo from "../../assets/logo.png"
import {data} from "./data"
import { CiSearch } from "react-icons/ci";
import {  FormEvent, useContext, useEffect, useRef, useState } from "react";
import { AuthContext, actions } from "../../context/AuthContext";
import { PiSignOutLight } from "react-icons/pi";
import useDelete from "../../hooks/useDelete";
import { api } from "../../enums/api";
import { IoIosNotificationsOutline } from "react-icons/io";
import { format } from "timeago.js";

import {  mobileWidth } from "@/utils/getUser";
import { RxHamburgerMenu } from "react-icons/rx";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
const Navbar = () => {
    const notification = useAppSelector((state)=>state.notification.notification)
    const user = useAppSelector((state)=>state.user.user)
    const [showSearch,setShowSearch] = useState(false)
    const [scrolled,setScolled] = useState(false)
    const {state,dispatch} = useContext(AuthContext)
    const {deletE} = useDelete(api.logoutMainServer)
    const router = useRouter()
    const pathname = usePathname()

    const handleChange = (e:FormEvent<HTMLInputElement>) => {
        router.push(`/search?q=${e.currentTarget.value}`)
    }
    const logout = async() => {
        await deletE()
        dispatch({type:actions.logout,payload:undefined})
        router.push("/login")
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
            console.log(vNav)
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
    return(
        <header className={scrolled?"scrolled":""}>
        <nav>
            <div className="left">
            <div className="logo">
                <Image alt="" width={100} height={100} src={Logo.src}/>
            </div>
            <RxHamburgerMenu className="h" onClick={run}/>
            {user&&<PiSignOutLight className="logout" onClick={logout}/>}
            
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
                
                <CiSearch className="icon"  onClick={()=>setShowSearch((prev)=>!prev)}/>
                    {showSearch&&
                <input autoFocus  type="text" placeholder="type " onBlur={()=>setShowSearch(false)} onChange={(e)=>handleChange(e)}/>
                    }
                </div>
                  
                
                {!mobileWidth&&(
                <div className="notification">
                <div className="info"> 
                <IoIosNotificationsOutline className="icon"/>
                <span>{notification?.length}</span>
                </div>
                <div className="message">
                    <ul>
                        {notification?.map((item)=>(
                             <li key={item._id}>
                                <Image alt="" width={100} height={100} src="https://res.cloudinary.com/dpel2vfvq/image/upload/v1710696637/fiverr/oezstpr0zovkzvju7zcg.jpg"/>
                                <div className="msg">
                             <span>{item?.msg}</span>
                             <span>{format(item.createdAt)}</span>
                             </div>
                           </li>
                        ))}
                    </ul>
                 

                </div>
                </div>
                )}

                
            </div>
        </nav>
        </header>
    )
}
export default Navbar