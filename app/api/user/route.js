import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongoose";
import User from "@/models/User";
import { auth } from "@/auth";

export async function GET() {
  try {
    await connectMongo();

    const session = await auth();

    let user;

    if (session) {
      user = await User.findById(session.user.id);
    } else {
      user = await User.findOne({ isGuest: true }).sort({ createdAt: -1 });
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user info:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
