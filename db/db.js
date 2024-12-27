const mongoose =require("mongoose");
require("dotenv").config

 const dbConnect=async()=>{
    try {
        mongoose.connect("mongodb://localhost:27017/users")
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("something is wrong",error)
    }
 }

 module.exports=dbConnect;