const mongoose = require('mongoose');

const dbConnect = async () => {
  const dbURI =process.env.MONGO_URI || "mongodb+srv://rajen113:95163315@myinfo.scd4s.mongodb.net/users?retryWrites=true&w=majority&appName=myInfo";
  console.log(dbURI)
  try {
    await mongoose.connect(dbURI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Database connection failed:', error.message);
  }
};

module.exports = dbConnect;
