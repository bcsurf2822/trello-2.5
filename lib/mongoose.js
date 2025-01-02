import mongoose from "mongoose";

export const connectMongo = async () => {
  try {

    if (!process.env.MONGODB_URI) {
      console.error("Error: MONGODB_URI environment variable is missing.");
      throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
    }


    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongoose connection successful.");
  } catch (e) {
    console.error("Mongoose Error:", e.message);
  }
};
