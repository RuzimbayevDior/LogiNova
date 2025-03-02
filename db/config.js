const mongoose = require("mongoose");
const dotenv = require("dotenv");

module.exports.connectDB = function () {
  try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("Successfully connected to Mongo");
  } catch (error) {
    console.log(error);
  }
};
