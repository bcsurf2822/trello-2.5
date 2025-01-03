import { connectMongo } from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    console.log("Starting POST request for guest login...");

    await connectMongo();
    console.log("MongoDB connection successful.");

    // Create a new guest user
    const guestCount = await User.countDocuments({ isGuest: true });
    const guestName = `guest${guestCount + 1}`;

    const guestUser = await User.create({
      name: guestName,
      isGuest: true,
      email: `${guestName}@guest.com`,
    });

    console.log("New guest user created:", guestUser);

    // Set guestId in the response cookie
    const response = NextResponse.json({
      message: "Guest user created successfully",
      guest: {
        id: guestUser._id,
        name: guestUser.name,
        isGuest: true,
      },
    });

    response.cookies.set("guestId", guestUser._id.toString(), {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
    });

    console.log("Guest ID set in cookies:", guestUser._id.toString());

    return response;
  } catch (error) {
    console.error("Error creating guest user:", error.message);
    return NextResponse.json(
      { error: "Unable to create guest user" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    console.log("Connecting to MongoDB...");
    await connectMongo();
    console.log("MongoDB connected successfully.");

    console.log("Parsing request body...");
    const body = await req.json();
    console.log("Request body:", body);

    const { guestId } = body;
    if (!guestId) {
      console.log("No guestId provided in the request.");
      return NextResponse.json(
        { error: "Guest ID is required" },
        { status: 400 } // Bad Request
      );
    }

    console.log("Searching for guest user with ID:", guestId);
    const guestUser = await User.findById(guestId);

    if (!guestUser || !guestUser.isGuest) {
      console.log("Guest user not found or invalid:", guestUser);
      return NextResponse.json(
        { error: "Guest user not found or invalid" },
        { status: 404 } // Not Found
      );
    }

    console.log("Guest user found:", guestUser);

    console.log("Deleting guest user...");
    await User.deleteOne({ _id: guestId });
    console.log("Guest user deleted successfully.");

    // Create a response to clear the guestId cookie
    const response = NextResponse.json({
      message: "Guest user deleted successfully",
      guest: {
        id: guestUser._id,
        name: guestUser.name,
      },
    });

    console.log("Clearing guestId cookie...");
    response.cookies.set("guestId", "", {
      maxAge: 0, // Immediately expire the cookie
      path: "/", // Apply to the entire app
      secure: process.env.NODE_ENV === "production", // Only set secure cookies in production
      sameSite: "Strict", // Prevent cross-site requests from accessing the cookie
    });

    console.log("Setting Cache-Control headers...");
    response.headers.set("Cache-Control", "no-store");

    console.log("Returning successful response.");
    return response;
  } catch (error) {
    console.error("Error deleting guest user:", error);
    return NextResponse.json(
      { error: "Unable to delete guest user" },
      { status: 500 } // Internal Server Error
    );
  }
}