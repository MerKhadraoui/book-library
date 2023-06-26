import express from "express"
const router= express.Router()
import { addUser, createUser } from "../controllers/userController.js"
import {loginHandler}from "../controllers/authController.js"
import{getAllUsers}from "../controllers/userController.js"


router.post("/create-user",createUser)
router.post("/login",loginHandler)
router.get("/list", getAllUsers)

router.post("/add", addUser)////Eugenia ->for testing purpose


export default router