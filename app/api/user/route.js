import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // For accessing cookies
import { connectMongo } from "@/lib/mongoose";
import User from "@/models/User";

export async function GET() {
  try {
    console.log("Fetching guest user...");
    
    // Connect to MongoDB
    await connectMongo();
    console.log("MongoDB connection successful.");

    // Access cookies to get guestId
    const cookieStore = cookies();
    const guestId = cookieStore.get("guestId")?.value;

    if (!guestId) {
      console.log("No guest ID found in cookies.");
      return NextResponse.json(
        { error: "No guest session found" },
        { status: 401 } // Unauthorized
      );
    }

    console.log("Guest ID found in cookies:", guestId);

    // Find the guest user by ID
    const user = await User.findById(guestId);

    if (!user || !user.isGuest) {
      console.log("No valid guest user found for the given guest ID.");
      return NextResponse.json(
        { error: "Guest user not found" },
        { status: 404 } // Not Found
      );
    }

    console.log("Returning guest user:", user);

    // Return the found guest user
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error fetching guest user:", error.message);
    return NextResponse.json(
      { error: "Unable to fetch guest user" },
      { status: 500 } // Internal Server Error
    );
  }
}
