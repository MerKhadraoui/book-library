import mongoose from "mongoose"

//updated 06/23/2023 Marina
import passportLocalMongoose from passport - local - mongoose;


const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  //updated 06/23/2023 Marina
  username: { type: String, required: true },

  email: { type: String, required: true },
  //updated 06/23/2023 Marina
  //password: { type: String, required: true },

  userType: { type: String, default: "user" },

  //updated 06/23/2023 Marina
  password: String,
  joined: { type: Date, default: Date.now() },
  bookIssueInfo: [
    {
      book_info: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Issue",
        },
      },
    },
  ],
  gender: String,
  address: String,
  image: {
    type: String,
    default: "",
  },
  violationFlag: { type: Boolean, default: false },
  fines: { type: Number, default: 0 },
  isAdmin: { type: Boolean, default: false },
});

userSchema.plugin(passportLocalMongoose);

export default mongoose.model("user", userSchema);
