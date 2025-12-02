import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose
      .connect(ENV.MONGODB_URI)
      .then(() => {
        console.log("MongoDB connected successfully");
      })
      .catch((error) => {
        console.log("MongoDB connection failed:", error);
      });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};
