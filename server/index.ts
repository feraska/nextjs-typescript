import express, { NextFunction, Request, Response } from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth"
import userRouter from "./routes/user"
import notificationRouter from "./routes/notification"
import bodyParser from "body-parser"
import { api } from "./enums/api"
dotenv.config()
const app = express()
const connectToDataBase = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL!)
        console.log("connection successfully")

    } catch(err) {
        console.log((err as Error).message)
    }
}
connectToDataBase()
const corsOptions = {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
    credentials: true, // Enable credentials (cookies, authorization headers, etc)
};
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
//app.use(bodyParser.json())


app.use(api.auth,authRouter)
app.use(api.user,userRouter)
app.use(api.notification,notificationRouter)
//error handler
app.use((err:any, req:Request, res:Response, next:NextFunction) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
      success: false,
      status,
      message,
    });
  });
app.listen(Number(process.env.PORT),"0.0.0.0",()=> {
    console.log(`the server run in port ${process.env.PORT}`)
})
