import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    users: Array,
    msg: {
        type: String, required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
},
{
    timestamps:true
}
)
export default mongoose.model("notifications",notificationSchema)