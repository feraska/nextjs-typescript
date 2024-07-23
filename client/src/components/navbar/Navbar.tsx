"use client"
import "./navbar.scss"
import Logo from "../../assets/logo.png"
import {data} from "./data"
import { CiSearch } from "react-icons/ci";
import {  FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext, actions } from "../../context/AuthContext";
import { PiSignOutLight } from "react-icons/pi";
import useDelete from "../../hooks/useDelete";
import { api } from "../../enums/api";
import { IoIosNotificationsOutline } from "react-icons/io";
import { format } from "timeago.js";

import {  mobileWidth } from "@/utils/getUser";
import { RxHamburgerMenu } from "react-icons/rx";
import { useRouter } from "next/navigation";
import Link from "next/link";
const Navbar = () => {
    const [showSearch,setShowSearch] = useState(false)
    const [scrolled,setScolled] = useState(false)
    const {state,dispatch} = useContext(AuthContext)
    const {deletE} = useDelete(api.logoutMainServer)
    const router = useRouter()
    // const nav = navigator.userAgent
    // const isMobile = nav.match(/Mobile/i)?true:false;
    // const  mobileWidth = window.matchMedia("(max-width: 768px)").matches; 
    const handleChange = (e:FormEvent<HTMLInputElement>) => {
        router.push(`/search?q=${e.currentTarget.value}`)
    }
    const logout = async() => {
        await deletE()
        dispatch({type:actions.logout})
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
        
        const vNav = document.getElementsByClassName("v-nav")[0]
        //vNav.style.display = "flex"
        
        if(vNav.style.display === "") {
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
        // <header className={scrolled?"scrolled":""}>
        <nav className={scrolled?"scrolled":""}>
            <div className="left">
            <div className="logo">
                <img src={Logo.src}/>
            </div>
            <RxHamburgerMenu className="h" onClick={run}/>
            {state?.user&&<PiSignOutLight className="logout" onClick={logout}/>}
            
            <h3>{state?.user?.firstName}</h3>
            
            <ul>
            {data.map((value,i)=>(
                
                    <Link key={i} href={value.path}>
                    <li key={i}>{value.text}</li>
                    </Link>
             
            ))}
               </ul>
           
            </div>

            <div className="right">
                <div className="search">
                    
                <CiSearch className="icon" onClick={()=>setShowSearch((prev)=>!prev)} />
                
                    <input className={showSearch?"visible":"none"} type="text" placeholder="type " onBlur={()=>setShowSearch(false)} onChange={(e)=>handleChange(e)}/>
                </div>
                {!mobileWidth&&(
                <div className="notification">
                <div className="info"> 
                <IoIosNotificationsOutline className="icon"/>
                <span>{state?.notification?.length}</span>
                </div>
                <div className="message">
                    <ul>
                        {state?.notification?.map((item)=>(
                             <li key={item._id}>
                                <img src="https://res.cloudinary.com/dpel2vfvq/image/upload/v1710696637/fiverr/oezstpr0zovkzvju7zcg.jpg"/>
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
        // </header>
    )
}
export default Navbar