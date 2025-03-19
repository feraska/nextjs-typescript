import { NextFunction,Request,Response } from "express"
import User from "../models/user"
import { createError } from "../utils/error"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
//register user
export const register = async(req:Request,res:Response,next:NextFunction) => {
    try {
        const {email,firstName,lastName,password} = req.body
        const salt = await bcrypt.genSalt(16)
        const hashedPassword = await bcrypt.hash(password,salt)
        await User.create({
            email,
            firstName,
            password:hashedPassword,
            lastName
        })
        return res.status(200).json("register successfully")
    } catch (err) {
        return next(createError(500,(err as Error).message))
    }
   
    
}
//login user
export const login = async(req:Request,res:Response,next:NextFunction) => {
    try {
 
    const {email,password} = req.body
    
    const user = await User.findOne({email})
   
    if(!user) {
        return next(createError(400,"user not found"))
        }
    const isCorrectPassword = await bcrypt.compare(password,user.password)
    
    if(!isCorrectPassword) {
        return next(createError(400,"the password not correct"))
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT!);
    res.cookie("access_token",token,{
        httpOnly: true,
        secure: true,
        sameSite: "none",
    })
    
    return res.status(200).json("login successfully")

    } catch(err) {
        return next(createError(500,(err as Error).message))
    }
   
}
//logout user
export const logout = (req:Request,res:Response,next:NextFunction) => {
    try {
    res.clearCookie('access_token',{
        httpOnly:true,
        secure:true,
        sameSite:"none"
    })
    return res.status(200).json("logout")
    } catch (err) {
        return next(createError(500,(err as Error).message))
    }
  }