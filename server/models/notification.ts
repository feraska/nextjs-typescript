import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    msg: {
        type: String, required: true
    },

},
{
    timestamps:true
}
)
export default mongoose.model("notifications",notificationSchema)