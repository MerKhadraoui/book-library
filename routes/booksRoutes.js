import express from "express"
import {addBook,getBooks,rentBook,returnBook,review}from "../controllers/booksController.js"
import { adminAuth, authorization } from "../middleware/authorization.js"
const router= express.Router()


router.post("/add-book",adminAuth,addBook)
router.get("/all-books",authorization,getBooks)
router.post("/all-books/rent",rentBook) //Eu->post
router.put("/all-books/return",authorization,returnBook)
router.post("/review",authorization,review)

router.post("/add-database",addBook)//Eugenia only -> for testing only, then delete


export default router