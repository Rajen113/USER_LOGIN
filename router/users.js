const [findUsers,createuser,signup,login,logOut]=require("../controllers/users.js")
const jwt=require("jsonwebtoken")

const express=require("express")
const Router=express.Router();

Router.get("/",findUsers);

Router.get("/signup",signup);

Router.get("/login", (req, res) => {
    res.render("login", { errorMessage: null });
});
Router.get("/logout",logOut)


Router.post("/login",login )



Router.post("/createuser",createuser);

// Middleware example (optional)

module.exports = Router;