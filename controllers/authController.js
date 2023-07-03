import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const checkUser = await User.findOne({ email });
    
    if (checkUser == null) {
      const err = new Error("Invalid Credentials!");
      err.statusCode = 400;
      throw err;
    }

    const hashedPass = checkUser.password;
    const validation = await bcrypt.compare(password, hashedPass);

    if (validation) {
      const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
      const payload = {
        email: email,
        firstName: checkUser.firstName,
        userId: checkUser._id,
        userType: checkUser.userType,
      };
      
      const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 3600 });
      res
        .status(201)
        .json({
          message: "logged in successfully",
          token,
          firstName: checkUser.firstName,
          userId: checkUser.userId_id,
          userType: checkUser.userType,
        });
    }
  } catch (err) {
    next(err);
  }
};
