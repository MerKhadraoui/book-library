import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    bookId: { type: String, required: true },
    text: { type: String, required: true },

    //updated 06/23/2023 Marina
    bookAuthor: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        username: String,
    },
    book: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
        },
        bookName: String,
    },
    date: { type: Date, default: Date.now() },



    starsEvaluation: {
        type: Number, min: [1, 'please select from 1 to 5'],
        max: [5, 'please select from 1 to 5']
    }
})


export default mongoose.model("review", reviewSchema)