import Book from "../models/bookModel.js"
import User from "../models/userModel.js"
import Review from "../models/reviewModel.js"
export const addBook = async (req, res) => {
    try {

        const allBooks = await Book.create(req.body)
        res.status(200).send("New Book has ben added ...!")
    }
    catch (err) {
        res.status(400).send("Something went wrong")
    }
}
export const getBooks = async (req, res) => {
    try {
        const books = await Book.find()
        res.status(200).json(books)
    }
    catch (err) {
        res.status(400).send("Something went wrong")

    }
}
export const rentBook = async (req, res, next) => {
    try {
        console.log(req.body);

        const { userId, bookId } = req.body
        const userData = await User.findOne({ _id: userId })
        const bookData = await Book.findOne({ _id: bookId })
        console.log(userData, bookData);
        if (bookData.available) {
            await Book.findByIdAndUpdate({ _id: bookId }, { available: false, rentedBy: userId }, { new: true })
            res.status(201).send("Happy booking time..!")
        }
        else {
            const err = new Error("Sorry This book is not available")
            err.statusCode = 401
            throw err
        }
    }
    catch (err) {
        next(err)

    }

}
export const returnBook = async (req, res, next) => {

    try {

        const { userId, bookId } = req.body
        const userData = await User.findOne({ _id: userId })
        const bookData = await Book.findOne({ _id: bookId })
        console.log(userData, bookData);
        if (!bookData.available) {
            await Book.findByIdAndUpdate({ _id: bookId }, { available: true, rentedBy: "non" }, { new: true })
            res.status(201).send("Book returned...!Thank you for visit us")
        }
        else {
            const err = new Error("please check user data..!")
            err.statusCode = 401
            throw err
        }
    }
    catch (err) {

        next()

    }
}

export const review = async (req, res, next) => {
    try {
        const { userId, review, bookId, starsEvaluation } = req.body
        const userName = await User.findById(userId)
        const text = `${userName.firstName}: ${review}`
        const newReview = new Review({
            userId, bookId, text, starsEvaluation
        })
        await newReview.save()
        //    const   allReviews=await Book.find().populate("review")
        //console.log(allReviews);
        res.status(200).send("hhhhh")
    }
    catch (err) {
        res.status(400).send("something went wrong")
    }

}