import mongoose from "mongoose";
const bookSchema =new mongoose.Schema({
    bookName:{type:String, required:true},
   bookAuthor:{type:String, required:true},
    bookPages:{type:String, required:true},
   bookPrice:{type:String, required:true}
})
export default mongoose.model ("book",bookSchema)