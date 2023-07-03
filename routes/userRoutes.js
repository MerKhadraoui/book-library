import express from "express"
import { createUser, deleteUser } from "../controllers/userController.js"
import {loginHandler}from "../controllers/authController.js"
import {authorization} from "../middleware/authorization.js"

const router= express.Router()

router.post("/create-user",createUser)
router.post("/login",loginHandler)
router.delete("/:id", authorization,deleteUser);

export default router