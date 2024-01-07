
// const mongoose = require('mongoose');
// const DBurl = 'mongodb://127.0.0.1:27017/'
// const DBname = "eCommerce"
// const DB_Connect = DBurl+DBname 

// console.log(DB_Connect)    

// // mongoose.connect(`${process.env.MONGODB_URL}${process.env.DB_NAME}`)
// // console.log("Database connected successfully");

// console.log("We are in dbconnect.js");
// exports.connectDB = async (req, res) => {
//   mongoose.connect(DB_Connect);
//   console.log("Database connected successfully");
// };


const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
exports.connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database not connected", error);
  }
};