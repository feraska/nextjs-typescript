import { NextFunction, Request, Response } from "express"
import Notification from "../models/notification"
import RequestWithUser from "../interfaces/requestWithUser"
import { createError } from "../utils/error"
export const getAllNotification= async(req:RequestWithUser,res:Response,next:NextFunction) => {
    try{
        
        const message = await Notification.find({
            users:{
                $all:[req.user?.id]
            }
        }).sort({updatedAt:1})
        // const projectMessages = message.map((msg) => {
        //     return {
        //         fromSelf:msg.sender.toString() === from,
        //         message:msg.message.text
        //     }
        // })
       return res.status(200).json(message)
    } catch(err) {
        return next(createError(500,(err as Error).message))
    }

}
export const addNotification = async(req:RequestWithUser,res:Response,next:NextFunction) => {
    
    try {
        const {from,to,msg} = req.body
        const data = await Notification.create({
            msg:msg,
            users:[from,to],
            sender:from
        })
        if(data) {
            return res.json({msg:"Message added successfully"})
        }
        return res.json({msg:"Failed to add message to database"})
    } catch(err) {
        return next(createError(500,(err as Error).message))
    }
}