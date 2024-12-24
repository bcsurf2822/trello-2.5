import { auth } from "@/auth";
import User from "@/models/User";
import { connectMongo } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongo();

    // Count current guest users to generate a unique guest name
    const guestCount = await User.countDocuments({ isGuest: true });
    const guestName = `guest${guestCount + 1}`;

    // Create a new guest user
    let guestUser = await User.findOne({ name: guestName });
    if (!guestUser) {
      guestUser = await User.create({
        name: guestName,
        isGuest: true,
      });
    }

    await auth.signIn("guest", { id: guestUser._id });

    return NextResponse.json({ message: "Guest login successful" });
  } catch (error) {
    console.error("Error during guest login:", error);
    return NextResponse.json({ error: "Unable to login as guest" }, { status: 500 });
  }
}
