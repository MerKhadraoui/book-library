import express from "express"
import { createUser, deleteUser } from "../controllers/userController.js"
import {loginHandler}from "../controllers/authController.js"

const router= express.Router()

router.post("/create-user",createUser)
router.post("/login",loginHandler)
router.delete("/delete/:id", deleteUser)

export default router