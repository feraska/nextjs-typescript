"use client"
import React, { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import User from "../interfaces/user";
import { genere } from "../hooks/useApi";
import { Socket } from "socket.io-client";

export interface AppState   {
    genre:Array<genere>;
    likes:Array<number>;
    list:Array<number>;
    user?:User;
    login:number;
    loading:boolean;
    notification:Array<notification>,
    socket?:Socket
}
 export type u = User
interface iPayload extends AppState {
    msg:notification,
    id:number,
}
export interface notification {
    msg?:string,
    sender?:string,
    _id:string,
    createdAt:string
}

export enum actions  {
   get_genre = "get_genre",
   get_list = "get_list",
   get_likes = "get_likes",
   add_list = "add_list",
   remove_list = "remove_list",
   login = "login",
   user = "user",
   logout = "logout",
   like = "like",
   dislike = "dislike",
   addNotification = "addNotification",
   getNotification = "getNotification",
   socket = "socket"
}
export interface action  {
    type:actions,
    payload?:any
    
}
  
 const INITIAL_STATE:AppState = {
     genre: [],
     list: [],
     likes: [],
     user: undefined,
     login: 2,
     loading: false,
     notification: [],
    
 }
interface Props {
    children: React.ReactNode;
  }
export const AuthContext = createContext<{
    state: AppState;
    dispatch: React.Dispatch<action>;
  }>({
    state:INITIAL_STATE,
    dispatch: () => null
  });
  
export const AuthContextProvider:React.FC<Props> = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer,INITIAL_STATE)
    return(

        <AuthContext.Provider value={{
            state,
            dispatch
        }}>
            {children}
        </AuthContext.Provider>
    )
}