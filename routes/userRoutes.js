import express from "express"
import { createUser, updateUser, getGallery, uploadImages } from "../controllers/userController.js"
import { loginHandler } from "../controllers/authController.js"
import { authorization, adminAuth } from "../middleware/authorization"


const router = express.Router()

//updated 06/23/2023 Marina
import middleware from "../middleware"
// importing controller
import userController from "../controllers/userController";


router.post("/create-user", createUser)
router.post("/login", loginHandler)

//updated 06/23/2023 Marina
// user -> dashboard
router.get(
    "/user/:page",
    middleware.isLoggedIn,
    userController.getUserDashboard
);

// user -> profile
router.get(
    "/user/:page/profile",
    middleware.isLoggedIn,
    userController.getUserProfile
);

//user -> upload image
router.post(
    "/user/1/image",
    middleware.isLoggedIn,
    userController.postUploadUserImage
);

//user -> update password
router.put(
    "/user/1/update-password",
    middleware.isLoggedIn,
    userController.putUpdatePassword
);

//user -> update profile
router.put(
    "/user/1/update-profile",
    middleware.isLoggedIn,
    userController.putUpdateUserProfile
);

//user -> notification
router.get(
    "/user/1/notification",
    middleware.isLoggedIn,
    userController.getNotification
);

//user -> issue a book
router.post(
    "/books/:book_id/issue/:user_id",
    middleware.isLoggedIn,
    userController.postIssueBook
);

//user -> show return-renew page
router.get(
    "/books/return-renew",
    middleware.isLoggedIn,
    userController.getShowRenewReturn
);

//user -> renew book
router.post(
    "/books/:book_id/renew",
    middleware.isLoggedIn,
    middleware.isLoggedIn,
    userController.postRenewBook
);

// user -> return book

router.post(
    "/books/:book_id/return",
    middleware.isLoggedIn,
    userController.postReturnBook
);

//user -> create new review
router.post(
    "/books/details/:book_id/review",
    middleware.isLoggedIn,
    userController.postNewReview
);

//user -> update existing review
router.post(
    "/books/details/:book_id/:review_id",
    middleware.isLoggedIn,
    userController.postUpdateReview
);

//user -> delete existing review
router.delete(
    "/books/details/:book_id/:review_id",
    middleware.isLoggedIn,
    userController.deleteReview
);

// user -> delete user account
router.delete(
    "/user/1/delete-profile",
    middleware.isLoggedIn,
    userController.deleteUserAccount
);

export default router