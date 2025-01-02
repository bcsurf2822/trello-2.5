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
    await connectMongo();

    const guestUser = await User.findOne({ isGuest: true });

    if (!guestUser) {
      return NextResponse.json(
        { error: "Guest user not found" },
        { status: 404 }
      );
    }

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
