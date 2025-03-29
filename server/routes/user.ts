import express from "express"
import { api } from "../enums/api"
import { addToLikes, addToList, editPassword, editProfile, forgotPassword, getUser, removeFromLikes, removeFromList, sendEmail, unreadEmpty, unreadInc, validateCode} from "../controllers/user"
import { verifyToken } from "../utils/verifyToken"
import { uploadSingle } from "../utils/upload"
import { validateEmail } from "../utils/validateEmail"
import { getCode } from "../utils/getCode"
import { decCode } from "../utils/decCode"
import { getId } from "../utils/getId"
const router = express.Router()
router.get(api.findUser,verifyToken,getUser)
router.put(api.addTolist,verifyToken,addToList)
router.put(api.removeFromList,verifyToken,removeFromList)
router.put(api.likes,verifyToken,addToLikes)
router.put(api.dislike,verifyToken,removeFromLikes)
router.put(api.incUnread,verifyToken,unreadInc)
router.put(api.emptyUnread,verifyToken,unreadEmpty)
router.put(api.editPassword,verifyToken,editPassword)
router.post(api.editProfile,verifyToken,uploadSingle,editProfile)
router.post(api.sendEmail,validateEmail,getCode,sendEmail)
router.post(api.validateCode,decCode,validateCode,getId)
router.put(api.forgotPassword,verifyToken,forgotPassword)
export default router