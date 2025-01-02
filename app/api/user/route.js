import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectMongo } from "@/lib/mongoose";
import User from "@/models/User";

export async function GET(request) {
  try {
    console.log("Fetching guest user...");

    // Log the incoming request headers
    console.log("Request Headers:", request.headers);

    await connectMongo();
    console.log("MongoDB connection successful.");

    const cookieStore = await cookies();
    console.log("CookieStore-----------------------------------", cookieStore);

    const guestId = cookieStore.get("guestId")?.value;
    console.log("Extracted guestId:", guestId);

    if (!guestId) {
      console.log("No guest ID found in cookies.");
      return NextResponse.json(
        { error: "No guest session found" },
        { status: 401 } // Unauthorized
      );
    }

    console.log("Guest ID found in cookies:", guestId);

    const user = await User.findById(guestId);

    if (!user || !user.isGuest) {
      console.log("No valid guest user found for the given guest ID.");
      return NextResponse.json(
        { error: "Guest user not found" },
        { status: 404 } // Not Found
      );
    }

    console.log("Returning guest user:", user);
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error fetching guest user:", error.message);
    return NextResponse.json(
      { error: "Unable to fetch guest user" },
      { status: 500 } // Internal Server Error
    );
  }
}
