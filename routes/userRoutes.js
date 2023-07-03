import express from "express"
import {createUser,getAllUsers } from "../controllers/userController.js"
import {loginHandler,passwordChangeHandler}from "../controllers/authController.js"
import { authorization } from "../middleware/authorization.js"

const router= express.Router()

router.post("/create-user",createUser)
router.post("/login",loginHandler)
router.get("/list", getAllUsers)
router.put("/change-password",authorization,passwordChangeHandler)




export default router