import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongoose";

export async function GET() {
  try {

    await connectMongo();
    console.log("MongoDB connection successful");

    return NextResponse.json({ message: "MongoDB connection successful" }, { status: 200 });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
