import { NextFunction, Response } from "express"
import RequestWithUser from "../interfaces/requestWithUser"
import jwt from "jsonwebtoken"
import { createError } from "./error"
//get random code of 6 number and store the code number in req.random and encrypted code in req.code
export const getCode = async(req:RequestWithUser,res:Response,next:NextFunction)=>{
    try {
        const random = Math.floor(100000 + Math.random() * 900000).toString()
        const encCode = jwt.sign({ code: random }, process.env.JWT!);
        req.random = random
        req.code = encCode
        next()
    }
    catch(err){
        return next(createError(500,(err as Error).message))
    }
}