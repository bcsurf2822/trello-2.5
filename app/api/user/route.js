import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongoose";
import User from "@/models/User";

export async function GET() {
  try {
    await connectMongo();

    const user = await User.findOne({ isGuest: true });



    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user info:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
