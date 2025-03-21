import { NextFunction, Request, Response } from "express";
import { createError } from "../utils/error";
import User from "../models/user"
import RequestWithUser from "../interfaces/requestWithUser"
//get user by id 
export const getUser = async(req:RequestWithUser,res:Response,next:NextFunction) => {
    try {
        const user = await User.findById(req.user?.id).select("-password")
        return res.status(200).json(user)
        
    } catch(err) {
        return next(createError(500,(err as Error).message))
    }
}
//add to my list user
export const addToList = async(req:RequestWithUser,res:Response,next:NextFunction) => {
    try {
        
        await User.findByIdAndUpdate(req.user?.id,{
            $addToSet:{
                list:+req.body.image
            }
        })
        return res.status(200).json("add to list")
    } catch(err) {
        return next(createError(500,(err as Error).message))
    }
}
//remove from my list user
export const removeFromList = async(req:RequestWithUser,res:Response,next:NextFunction) => {
    try {
         await User.findByIdAndUpdate(req.user?.id,{
            $pull:{
                list:+req.body.image
            }
        })
        
        return res.status(200).json("remove list")
    } catch(err) {
        return next(createError(500,(err as Error).message))
    }
}
//like movie by user
export const addToLikes= async(req:RequestWithUser,res:Response,next:NextFunction) => {
    try {
        await User.findByIdAndUpdate(req.user?.id,{
            $addToSet:{
                likes:+req.body.image
            }
        })
        return res.status(200).json("add to list")
    } catch(err) {
        return next(createError(500,(err as Error).message))
    }
}
//disike movie by user
export const removeFromLikes = async(req:RequestWithUser,res:Response,next:NextFunction) => {
    try {
         await User.findByIdAndUpdate(req.user?.id,{
            $pull:{
                likes:+req.body.image
            }
        })
        
        return res.status(200).json("remove list")
    } catch(err) {
        return next(createError(500,(err as Error).message))
    }
}
//increment 1 unread notification
export const unreadInc = async(req:RequestWithUser,res:Response,next:NextFunction) => {
    try {
         await User.findByIdAndUpdate(req.user?.id,{
             $inc: { unread: 1 } }, // If "unread" does not exist, it will be created and set to 1
  { new: true }
)
        
        return res.status(200).json("unread inc")
    } catch(err) {
        return next(createError(500,(err as Error).message))
    }
}
//update unread notifiaction to be 0
export const unreadEmpty = async(req:RequestWithUser,res:Response,next:NextFunction) => {
    try {
         await User.findByIdAndUpdate(req.user?.id,
            {unread:0},
             
  { new: true }
)
        
        return res.status(200).json("unread inc")
    } catch(err) {
        return next(createError(500,(err as Error).message))
    }
}