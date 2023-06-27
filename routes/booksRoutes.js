import express from "express"
import { addBook, getBooks, rentBook, returnBook, review } from "../controllers/booksController.js"
import { adminAuth, authorization } from "../middleware/authorization.js"
const router = express.Router()

//updated 06/23/2023 Marina
import bookController from "../controllers/booksController";


router.post("/add-book", adminAuth, addBook)
router.get("/all-books", authorization, getBooks)
router.put("/all-books/rent", authorization, rentBook)
router.put("/all-books/return", authorization, returnBook)
router.post("/review", authorization, review)

//updated 06/23/2023 Marina
// Browse books
router.get("/books/:filter/:value/:page", bookController.getBooks);

// Fetch books by search value
router.post("/books/:filter/:value/:page", bookController.findBooks);

// Fetch individual book details
router.get("/books/details/:book_id", bookController.getBookDetails);

export default router