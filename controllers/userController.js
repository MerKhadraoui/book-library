import User from "../models/userModel.js"
import bcrypt from "bcrypt"

export const createUser =async(req,res,next) => {
    try{
        const { firstName, lastName,email,password}=req.body
        const checkUser= await User.findOne({email})
    if (checkUser){
        const err = new Error("user already existing..! please try to login")
        err.statusCode=400
        throw err
    }
        const saltRounds = 11
        const salt = await bcrypt.genSalt(saltRounds)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new User({
            firstName,
            lastName,
            email,
            password:hashedPassword,
        })

        const newUser = await user.save()
        res.status(200).send("user successfully added ..!")
    }
    catch(err){
    next(err)
    }

}

export const deleteUser = async(req, res) => {
    try {
        const result = await User.findByIdAndDelete(req.params._id)
        res.status(201).json("This User Sucessfully deleted", result)
    }
    catch (error){
        res.status(400).json({msg:error})
    }
}
// update user , delete  user, get allUsers


