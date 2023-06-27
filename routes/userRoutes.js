import express from "express"

import {createUser } from "../controllers/userController.js"
import {loginHandler}from "../controllers/authController.js"
import{getAllUsers}from "../controllers/userController.js"

const router= express.Router()

router.post("/create-user",createUser)
router.post("/login",loginHandler)
router.get("/list", getAllUsers)




export default router