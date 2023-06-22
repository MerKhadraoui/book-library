import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {userRoute} from "./routes/userRoute.js"
dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(cors())
const app = express();

const MONGO_URI = process.env.CONNECTION_URL
    await mongoose.connect(MONGO_URI).then(()=> console.log("DB connected")).catch(err=> console.log(err.message))

app.use((error, req, res, next)=>{
    error.statusCode = error.statusCode || 500
    error.message = error.message || "Something went wrong"
    res.status(error.statusCode).send(error.message)
})
app.listen(PORT, ()=>{
    console.log(`server running at port ${PORT}`)
})
app.use("/user",userRoute)
app.get("/",(eq,res)=>{
res.send("Welcome User ")
})