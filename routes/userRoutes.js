import express from "express"
const router = express.Router()
import { createUser } from "../controllers/userController.js"
import { loginHandler } from "../controllers/authController.js"


router.post("/create-user", createUser)
router.post("/login", loginHandler)

export default router