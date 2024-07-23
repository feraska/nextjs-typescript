import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        max:50
    },
    password: {
        type:String,
        max:50,
        required:true,
    },
    firstName: {
        type:String,
        max:20,
        required:true,
    },
    lastName: {
        type:String,
        max:20,
        required:true,
    },
    list: {
        type:Array,
        default:[]
    },
    likes: {
        type:Array,
        default:[],
    },
   
},
{
    timestamps:true
}
)

export default mongoose.model("users",userSchema)
