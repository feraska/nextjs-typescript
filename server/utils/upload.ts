import multer from 'multer';

import { NextFunction, Request, Response } from "express";

const storage = multer.memoryStorage();
// Set up multer upload
const upload = multer({ storage: storage });
export const uploadSingle = (req:Request,res:Response,next:NextFunction) => {
    upload.single('file')(req,res,(err:any)=> {
        if(err) {
            return res.status(400).json(`error uploading file${err}`)
        }
        next()
    })
    
}