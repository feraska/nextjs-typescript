import { Request } from "express";
import User from "./user";
import code from "./code";

 interface RequestWithUser extends Request {
    user?:User,
    random?:string,
    code?:string,
    decCode?:code
}
export default RequestWithUser
