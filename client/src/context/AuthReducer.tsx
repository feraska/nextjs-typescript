
import { Socket } from "socket.io-client";
import { AppState, action,  actions } from "./AuthContext";
import User from "@/interfaces/user";
const AuthReducer = (state:AppState, action:action):AppState => {
    switch(action.type) {
        case actions.socket:
            //if(action.payload instanceof Socket)
            return {
                ...state,
                socket: action.payload
            }
        case actions.login:
            //if(typeof action.payload === "number")
            return {
                ...state,
                login:action.payload
            }
        case actions.logout:
            return {
                ...state,
                user:undefined,
                login:2,
            }    
        case actions.user:
            //if("_id" in action.payload)
            return {
                ...state,
                user:action.payload
            }

        case actions.get_genre:
            
            return {
                ...state,
               genre:action.payload

               }
        case actions.addNotification:
            return {
                ...state,
                notification:[...state.notification,action.payload]
            }       
        case actions.get_likes: {
            return {
                ...state,
               likes:action.payload

               }
        }
        case actions.getNotification: {
            return {
                ...state,
                notification:action.payload
            }
        }
        case actions.like: 
        return {
            
                ...state,
                likes:[...state.likes,action.payload]
            }
            case actions.dislike:
                    return {
                        ...state,
                        likes:[...state.likes.filter((value)=>value!==action.payload)]
                    }       

               case actions.get_list:
                return {
                    ...state,
                    list:action.payload
                }
               case actions.add_list:
                if(!state.list.includes(action.payload)) {
                    return {
                        ...state,
                        list:[...state.list,action.payload]
                    }
                }
                return {
                    ...state
                }
                
                case actions.remove_list:
                    return {
                        ...state,
                        list:[...state.list.filter((value)=>value!==action?.payload)]
                    }
                    default:
                        return state
              
            }
       

    }
export default AuthReducer;