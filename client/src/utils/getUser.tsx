"use client"

import axios from "axios";
import { useState } from "react";

// const nav = navigator.userAgent
// export const isMobile = nav.match(/Mobile/i)?true:false;
export const  mobileWidth = window.matchMedia("(max-width: 768px)").matches; 
export const getData = async(url:string) => {
        
        const res =  await axios.get(url,{
            headers:{
                Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0M2ExYmEyODQzOTRiZTdlNmRjOGJjZGQyNjc0MDI3ZCIsInN1YiI6IjY1OWQ3ZGUyNjcyOGE4MDFhNTJmMGY1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nbpGYJefKmzpVTswVPSaTSzFUWPf3m80zj1sgDAtdn8"
            }
            
            
        })
        return res.data
}


