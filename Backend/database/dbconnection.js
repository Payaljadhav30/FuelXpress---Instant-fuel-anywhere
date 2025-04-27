import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load variables from .env

const mongoURI = process.env.MONGO_URI;

export const dbconnect = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};





