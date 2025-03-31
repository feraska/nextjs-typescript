import { NextFunction, Response } from "express";
import RequestWithUser from "../interfaces/requestWithUser";
import USer from "../models/user"
import jwt from "jsonwebtoken"
import { createError } from "./error";
//get encrypted id user according by email
export const getId = async(req: RequestWithUser, res: Response, next: NextFunction)  => {
    try {
        const {email} = req.body
        const user = await USer.findOne({email})
        if(!user) {
            return next(createError(400,"error"))
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT!);
        if(!token) {
            return next(createError(400,"error"))
        }
        return res.status(200).json(token)
    }
    catch(err) {
        return next(createError(500,(err as Error).message))
 
    }
  
};