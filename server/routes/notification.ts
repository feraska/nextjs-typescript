import express from "express"
import { addNotification, getAllNotification } from "../controllers/notification"
import { verifyToken } from "../utils/verifyToken"
import { api } from "../enums/api"
const router = express.Router()
router.get(api.getNotification,verifyToken,getAllNotification)
router.post(api.addNotification,verifyToken,addNotification)
export default router