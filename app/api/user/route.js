import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongoose";
import User from "@/models/User";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const guestId = searchParams.get("guestId");

    if (!guestId) {
      console.log("No guest ID found in query.");
      return NextResponse.json(
        { error: "No guest session found" },
        { status: 401 }
      );
    }

    await connectMongo();

    const user = await User.findById(guestId);

    if (!user || !user.isGuest) {
      console.log("No valid guest user found for the given guest ID.");
      return NextResponse.json(
        { error: "Guest user not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error fetching guest user:", error.message);
    return NextResponse.json(
      { error: "Unable to fetch guest user" },
      { status: 500 }
    );
  }
}
