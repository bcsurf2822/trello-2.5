import Board from "@/models/Board";
import User from "@/models/User";
import mongoose from "mongoose";

export const connectMongo = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
  } catch (e) {
    console.error("Mongoose Error: " + e.message);
  }
};
