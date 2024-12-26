
import { nanoid } from "nanoid";
import { connectMongo } from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongo();

    // Count existing guest users to assign unique names
    const guestCount = await User.countDocuments({ isGuest: true });
    const guestName = `guest${guestCount + 1}`;

    // Create a guest user in the database
    const guestUser = await User.create({
      name: guestName,
      isGuest: true,
      email: `guest${nanoid()}@guest.com`,
    });


    const guestSession = {
      id: guestUser._id,
      name: guestUser.name,
      isGuest: true,
    };

    return NextResponse.json(guestSession);
  } catch (error) {
    console.error("Error creating guest user:", error);
    return NextResponse.json({ error: "Unable to create guest user" }, { status: 500 });
  }
}
