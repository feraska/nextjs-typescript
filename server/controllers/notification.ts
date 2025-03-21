import { NextFunction, Request, Response } from "express"
import Notification from "../models/notification"
import RequestWithUser from "../interfaces/requestWithUser"
import { createError } from "../utils/error"
//get all notification
export const getAllNotification= async(req:RequestWithUser,res:Response,next:NextFunction) => {
    try{
        const message = await Notification.find().sort({updatedAt:-1})
       return res.status(200).json(message)
    } catch(err) {
        return next(createError(500,(err as Error).message))
    }

}
//add notification
export const addNotification = async(req:RequestWithUser,res:Response,next:NextFunction) => {
    
    try {
        const {msg} = req.body
        const data = await Notification.create({
            msg:msg,
            
        })
        if(data) {
            return res.json({msg:"Message added successfully"})
        }
        return res.json({msg:"Failed to add message to database"})
    } catch(err) {
        return next(createError(500,(err as Error).message))
    }
}