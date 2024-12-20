
import Board from "@/models/Board";
import User from "@/models/User";
import mongoose from "mongoose";



Board
// creates connection with the database
// we will keep mongo.js because auth.js needs
export const connectMongo = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI)
  } catch (e) {
    console.error("Mongoose Error: " + e.message)
  }
}