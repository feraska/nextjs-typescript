import jwt from "jsonwebtoken";
import { createError } from "./error";
import { NextFunction, Request, Response } from "express";
import RequestWithUser from "../interfaces/requestWithUser";
import User from "../interfaces/user";
//vertify token cookies
export const verifyToken =(req: RequestWithUser, res: Response, next: NextFunction)  => {
  
  const token = req.cookies.access_token || req.body.id;//cookies check if login
 
  if (!token) return next(createError(401, "You are not authenticated!"));
 
  const decoded = jwt.verify(token, process.env.JWT!)//decrypt the token
    if(!decoded) {
        return next(createError(403, "Token is not valid!"));
    }
    req.user = (decoded as User);
    next()
  
};