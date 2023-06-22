import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: String,
  password: { type: String },
  email: String,
  books:
{
    type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "book"
    }]
}, 

 
});
export default  mongoose.model("user", userSchema);
