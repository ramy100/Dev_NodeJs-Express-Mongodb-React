const mongoose = require("mongoose");
require("dotenv").config();
const db = process.env.DB_CONNECTION;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Connected to Db");
  } catch (err) {
    console.log("Failed Connecting to Db");
    console.log(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
