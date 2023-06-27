import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    bookName: { type: String, required: true },

    //updated 06/23/2023 Marina
    ISBN: { type: String, required: true },
    stock: { type: Number, required: true },

    bookAuthor: { type: String, required: true },
    bookPages: { type: String, required: true },
    bookPrice: { type: String, required: true },

    //updated 06/23/2023 Marina
    description: { type: String, required: true },
    category: { type: String, required: true },

    available: { type: Boolean, default: true },
    rentedBy: { type: String, default: "non" },
    reviews: [{
        type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        },
    },]

},)

export default mongoose.model("Book", bookSchema)