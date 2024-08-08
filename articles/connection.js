// config/db.js
import { connect } from "mongoose";

// require("dotenv").config();

// configure the dotenv using import
import dotenv from "dotenv";
dotenv.config();


const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
