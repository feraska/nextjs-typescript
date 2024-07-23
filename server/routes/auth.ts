import express from "express"
import { login, logout, register } from "../controllers/auth"
import { api } from "../enums/api"
const router = express.Router()
router.post(api.login,login)
router.post(api.register,register)
router.delete(api.logout,logout)
export default router