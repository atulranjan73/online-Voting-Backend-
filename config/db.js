const mongoose = require("mongoose");
require("dotenv").config();

const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "votingDB", // Specify your desired database name here
    });
    console.log("MongoDB is connected to votingDB");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};

module.exports = connectionDB;