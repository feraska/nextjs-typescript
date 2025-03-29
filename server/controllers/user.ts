import { NextFunction, Request, Response } from "express";
import { createError } from "../utils/error";
import User from "../models/user"
import RequestWithUser from "../interfaces/requestWithUser"
import bcrypt from "bcrypt"
import cloudinary from "cloudinary"
import nodemailer from "nodemailer"

//get user by id 
export const getUser = async(req:RequestWithUser,res:Response,next:NextFunction) => {
    try {
        const user = await User.findById(req.user?.id).select("-password")
        if(!user) {
            return next(createError(400,"user not exsit"))
        }
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
        
        return res.status(200).json("unread empty")
    } catch(err) {
        return next(createError(500,(err as Error).message))
    }
}
//edit password
export const editPassword = async(req:RequestWithUser,res:Response,next:NextFunction) => {
    try {
        const {currentPassword,newPassword,rePassword} = req.body
        if(currentPassword === "") {
            return next(createError(400,"the current password must not be empty"))
        }
        if(newPassword === "") {
            return next(createError(400,"the current new password must not be empty"))
        }
        if(rePassword === "") {
            return next(createError(400,"the current re-password must not be empty"))
        }
        if(newPassword !== rePassword) {
            return next(createError(400,"the new password and re-password must be equal"))
        }
        const user = await User.findById(req.user?.id)
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(newPassword,salt)
        if(!user) {
            return next(createError(400,"error not be user"))
        }
        const isCorrectPassword = await bcrypt.compare(currentPassword,user.password)
        if(!isCorrectPassword) {
            return next(createError(400,"the current password not corrected"))
        }
        user.password = hashedPassword
        await user.save()
       
       return res.status(200).json("edit password successfully")
   } catch(err) {
       return next(createError(500,(err as Error).message))
   }
}
//edit profile
export const editProfile = async(req:RequestWithUser,res:Response,next:NextFunction) => {
    try {
        const {firstName,lastName} = req.body
        const user = await User.findById(req.user?.id)
        if(!user) {
            return 
        }
        if(!req.file && !firstName && !lastName) {
            return res.json("not exsit data to update")
        }
        if(!req.file) {
            if(firstName !== "") {
                user.firstName = firstName
            }
            if(firstName !== "") {
                user.lastName = lastName
            }
            await user.save()
            return res.json("update without file")
        }
        if(user?.img?.public_id) {
            await cloudinary.v2.uploader.destroy(user.img.public_id);
        }
        
         // Upload new image to Cloudinary
         const uploadPromise = new Promise((resolve, reject) => {
            cloudinary.v2.uploader.upload_stream(
                { folder: 'movie' },
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (!user.img) {
                            user.img = { public_id: "", url: "" };
                        }
                        user.img.public_id = result?.public_id!;
                        user.img.url = result?.secure_url!;
                        resolve(result);
                    }
                }
            ).end(req.file?.buffer);
        });
        // Wait for image upload to finish before continuing
        await uploadPromise;

    if(firstName !== "") {
        user.firstName = firstName
    }
    if(lastName !== "") {
        user.lastName = lastName
    }
    await user.save()
    res.status(200).json("edit profile")
} 
catch(err) {
    return next(createError(500,(err as Error).message))
}
}
//send email
export const sendEmail = async(req:RequestWithUser,res:Response,next:NextFunction) => {
    try {
        const {email} = req.body
        let transporter = nodemailer.createTransport({
            service:'gmail',
            // host: "smtp.ethereal.email",
            // port: 587,
            // secure: false, // true for 465, false for other ports
            auth: {
              user: process.env.EMAIL, // generated ethereal user
              pass: process.env.PASSWORD, // generated ethereal password
            },
          });
       
            const random = req.random
          // send mail with defined transport object
            await transporter.sendMail({
            from: process.env.EMAIL, // sender address
            to: email, // list of receivers
            subject: "change password", // Subject line
            text:"code", // plain text body
            html: `<h1>${random}</h1>`, // html body
          });
           return res.status(200).json(req.code)
        
        }
        catch( err ) {
            return next(createError(500,(err as Error).message))
        }
}
//validate code
export const validateCode = async(req:RequestWithUser,res:Response,next:NextFunction) => {
    try {
        const {decCode} = req.body
        if(req.decCode?.code !== decCode) {
            return next(createError(400,"code not equal"))
        }
        return next()
        }
        catch( err ) {
            return next(createError(500,(err as Error).message))
        }
}
//forgot password
export const forgotPassword = async(req:RequestWithUser,res:Response,next:NextFunction) => {
    try {
        const {newPassword,rePassword} = req.body
        if(newPassword !== rePassword) {
            return next(createError(500,"the new password and re-type password not equal"))
        }
        const user = await User.findById(req.user?.id)
        if(!user) {
            return next(createError(400,"user not exsit"))
        }
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(newPassword,salt)
        user.password = hashedPassword
        await user.save()
        return res.status(200).json("forgot password successfully")
        }
        catch( err ) {
            return next(createError(500,(err as Error).message))
        }
}
