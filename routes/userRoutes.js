import express from "express"
import { createUser, getAllUsers, deleteUser } from "../controllers/userController.js"
import { loginHandler, passwordChangeHandler, logoutHandler } from "../controllers/authController.js"
import { authorization } from "../middleware/authorization.js"
import { validateInputs } from "../middleware/validator.js"
import { userRules } from "../lib/validation/rules.js"
const router = express.Router()

router.post("/create-user", validateInputs(userRules), createUser)
router.post("/login", loginHandler)
router.delete("/:id", authorization, deleteUser);
router.get("/list", authorization, getAllUsers)
router.put("/change-password", authorization, passwordChangeHandler)

//user -> user logout handler
router.get("/logout", logoutHandler);


export default router
