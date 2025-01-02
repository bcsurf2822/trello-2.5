import { connectMongo } from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    console.log("Starting POST request to create guest user...");

    // Attempt MongoDB connection
    console.log("Connecting to MongoDB...");
    await connectMongo();
    console.log("MongoDB connection successful.");

    // Count existing guest users
    console.log("Counting existing guest users...");
    const guestCount = await User.countDocuments({ isGuest: true });
    console.log(`Guest user count: ${guestCount}`);

    // Generate guest name
    const guestName = `guest${guestCount + 1}`;
    console.log(`Generated guest name: ${guestName}`);

    // Create new guest user
    console.log("Creating new guest user...");
    const guestUser = await User.create({
      name: guestName,
      isGuest: true,
      email: `${guestName}@guest.com`,
    });
    console.log("Guest user created successfully:", guestUser);

    // Return success response
    console.log("Returning success response...");
    return NextResponse.json({
      message: "Guest user created successfully",
      guest: {
        id: guestUser._id,
        name: guestUser.name,
        isGuest: true,
      },
    });
  } catch (error) {
    console.error("Error creating guest user:", error.message);
    console.error("Stack Trace:", error.stack);
    return NextResponse.json(
      { error: "Unable to create guest user" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    await connectMongo();

    // Fetch the guest user to delete
    const guestUser = await User.findOne({ isGuest: true });

    if (!guestUser) {
      return NextResponse.json(
        { error: "Guest user not found" },
        { status: 404 }
      );
    }

    // Delete the guest user
    await User.deleteOne({ _id: guestUser._id });

    return NextResponse.json({
      message: "Guest user deleted successfully",
      guest: {
        id: guestUser._id,
        name: guestUser.name,
      },
    });
  } catch (error) {
    console.error("Error deleting guest user:", error);
    return NextResponse.json(
      { error: "Unable to delete guest user" },
      { status: 500 }
    );
  }
}
