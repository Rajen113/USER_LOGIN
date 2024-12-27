const userModel=require("../models/user.model")
const bcrypt=require('bcrypt')

const findUsers = async (req, res) => {
    try {
        const users = await userModel.find(); // Query the database
        console.log("Users found:", users);
        res.status(200).json(users); // Send the users as JSON
    } catch (error) {
        console.error("Something went wrong:", error);
        res.status(500).send("Internal Server Error"); // Send an error response
    }
};

const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Validate input
        if (!name || !email || !password) {
            return res.status(400).send({ message: "Please fill in all fields." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword,
        });

        console.log("User created successfully:", newUser);
        return res.render("login", { errorMessage: "Invalid email or password!" });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send({ message: "Something went wrong", error });
    }
};

const signUp=(req, res) => {
    res.render("signup", { errorMessage: null });
}


const logIn=async (req, res) => {
        const { email, password } = req.body;
    
        // Basic validation
        if (!email || !password) {
            return res.render("login", { errorMessage: "Email and password are required!" });
        }
    
        try {
            // Implement your authentication logic here
            // Example: Check if the email and password match the database records
            const user = await userModel.findOne({ email }); // Replace with your database logic
            if (!user) {
                return res.render("login", { errorMessage: "Invalid email or password!" });
            }
    
            // Compare passwords (if hashed, use bcrypt.compare)
            const isMatch = bcrypt.compare(password,user.password,(err,result)=>{
                console.log(result)
                if (!result) {
                    return res.render("login", { errorMessage: "Invalid email or password!" });
                }
                res.send("Login successful!"); // Replace with your desired response
            })
        } catch (error) {
            console.error("Login error:", error);
            res.render("login", { errorMessage: "Something went wrong, please try again." });
        }
    };

module.exports = [findUsers,createUser,signUp,logIn]
