
import { createError } from "./error";
import { NextFunction, Request, Response } from "express";
import RequestWithUser from "../interfaces/requestWithUser";
import jwt from "jsonwebtoken";
import code from "../interfaces/code";

export const decCode = async(req: RequestWithUser, res: Response, next: NextFunction)  => {
    try {
        const {encCode} = req.body
        const decoded = jwt.verify(encCode, process.env.JWT!)//decrypt the code
        if(!decoded) {
            return next(createError(403, "code is not valid"));
        }
        req.decCode = (decoded as code)
        next()
    }
    catch(err) {
        return next(createError(500,(err as Error).message))
 
    }
  
};