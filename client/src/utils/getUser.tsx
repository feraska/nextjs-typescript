"use client"
import { io, Socket } from "socket.io-client";

// const nav = navigator.userAgent
// export const isMobile = nav.match(/Mobile/i)?true:false;
export const  mobileWidth = window.matchMedia("(max-width: 768px)").matches; 
export const socket: Socket = io("https://nextjs-typescript-1.onrender.com")



