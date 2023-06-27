import express from "express";
const router = express.Router();
import passport from "passport";

// Import index controller
import authController from "../controllers/authController";

// Import models
import User from "../models/userModel";

//landing page
router.get("/", authController.getLandingPage);

//admin login handler
router.get("/auth/admin-login", authController.getAdminLoginPage);

router.post(
    "/auth/admin-login",
    passport.authenticate("local", {
        successRedirect: "/admin",
        failureRedirect: "/auth/admin-login",
    }),
    (req, res) => { }
);

//admin logout handler
router.get("/auth/admin-logout", authController.getAdminLogout);

// admin sign up handler
router.get("/auth/admin-signup", authController.getAdminSignUp);

router.post("/auth/admin-signup", authController.postAdminSignUp);

//user login handler
router.get("/auth/user-login", authController.getUserLoginPage);

router.post(
    "/auth/user-login",
    passport.authenticate("local", {
        successRedirect: "/user/1",
        failureRedirect: "/auth/user-login",
    }),
    (req, res) => { }
);

//user -> user logout handler
router.get("/auth/user-logout", authController.getUserLogout);

//user sign up handler
router.get("/auth/user-signUp", authController.getUserSignUp);

router.post("/auth/user-signup", authController.postUserSignUp);

module.exports = router;