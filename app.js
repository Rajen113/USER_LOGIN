const express =require("express");
const app = express();
const path = require("path");
const dbConnect=require("./db/db")
const userModel=require("./models/user.model")
const users=require('./router/users')

dbConnect()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/api",users)

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/",(req,res)=>{
  console.log("done")
  res.render("home")
})



app.listen(process.env.PORT||8000)