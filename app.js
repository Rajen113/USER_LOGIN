const express =require("express");
const app = express();
const path = require("path");
const dbConnect=require("./db/db")
const userModel=require("./models/user.model")
const users=require('./router/users')
const cookie=require("cookie-parser");
const { console } = require("inspector");
const jwt=require("jsonwebtoken")
var cors = require('cors')

dbConnect()
app.use(cors());

app.use(express.json())
app.use(cookie())
app.use(express.urlencoded({ extended: true }));
app.use("/api",users)

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/",(req,res)=>{
  const token = req.cookies.token;
  console.log(token)
    if (!token) return res.render("home",{user:'Guest'});
  
    try {
      const user = jwt.verify(token, "secret");
      const name = user.name;
      res.render("home",{user})
    } catch (err) {
      res.res.render("home",{name});
    }
})





app.listen(process.env.PORT||8000)