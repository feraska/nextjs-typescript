
import { createError } from "./error";
import { NextFunction, Request, Response } from "express";
import RequestWithUser from "../interfaces/requestWithUser";
import User from "../models/user";
//validate email is exsit
export const validateEmail = async(req: RequestWithUser, res: Response, next: NextFunction)  => {
    try {
    const {email} = req.body
    const user = await User.findOne({email})
    if(!user) {
        return next(createError(400,"the email not exsit"))
    }
    
    next()
    }
    catch(err) {
        return next(createError(500,(err as Error).message))
 
    }
  
};