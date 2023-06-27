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


//updated 06/23/2023 Marina
const PER_PAGE = 16;

exports.getBooks = async (req, res, next) => {
    var page = req.params.page || 1;
    const filter = req.params.filter;
    const value = req.params.value;
    let searchObj = {};

    // constructing search object
    if (filter != "all" && value != "all") {
        // fetch books by search value and filter
        searchObj[filter] = value;
    }

    try {
        // Fetch books from database
        const books = await Book.find(searchObj)
            .skip(PER_PAGE * page - PER_PAGE)
            .limit(PER_PAGE);

        // Get the count of total available book of given filter
        const count = await Book.find(searchObj).countDocuments();

        res.render("books", {
            books: books,
            current: page,
            pages: Math.ceil(count / PER_PAGE),
            filter: filter,
            value: value,
            user: req.user,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.findBooks = async (req, res, next) => {
    var page = req.params.page || 1;
    const filter = req.body.filter.toLowerCase();
    const value = req.body.searchName;

    // show flash message if empty search field is sent to backend
    if (value == "") {
        req.flash(
            "error",
            "Search field is empty. Please fill the search field in order to get a result"
        );
        return res.redirect("back");
    }

    const searchObj = {};
    searchObj[filter] = value;

    try {
        // Fetch books from database
        const books = await Book.find(searchObj)
            .skip(PER_PAGE * page - PER_PAGE)
            .limit(PER_PAGE);

        // Get the count of total available book of given filter
        const count = await Book.find(searchObj).countDocuments();

        res.render("books", {
            books: books,
            current: page,
            pages: Math.ceil(count / PER_PAGE),
            filter: filter,
            value: value,
            user: req.user,
        });
    } catch (err) {
        console.log(err);
    }
};

// find book details working procedure
/*
   1. fetch book from db by id
   2. populate book with associated reviews
   3. render user/bookDetails template and send the fetched book
*/

exports.getBookDetails = async (req, res, next) => {
    try {
        const book_id = req.params.book_id;
        const book = await Book.findById(book_id).populate("reviews");
        res.render("user/bookDetails", { book: book });
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};