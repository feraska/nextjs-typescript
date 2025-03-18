import express from "express"
import { api } from "../enums/api"
import { addToLikes, addToList, getUser, removeFromLikes, removeFromList, unreadEmpty, unreadInc } from "../controllers/user"
import { verifyToken } from "../utils/verifyToken"
const router = express.Router()
router.get(api.findUser,verifyToken,getUser)
router.put(api.addTolist,verifyToken,addToList)
router.put(api.removeFromList,verifyToken,removeFromList)
router.put(api.likes,verifyToken,addToLikes)
router.put(api.dislike,verifyToken,removeFromLikes)
router.put(api.incUnread,verifyToken,unreadInc)
router.put(api.emptyUnread,verifyToken,unreadEmpty)
export default router