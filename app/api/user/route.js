import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongoose";
import User from "@/models/User";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const guestId = searchParams.get("guestId");

    if (!guestId) {
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


export async function DELETE(req) {
  try {
    await connectMongo();

    // Find all users with isGuest: true
    const guestUsers = await User.find({ isGuest: true });

    if (!guestUsers.length) {
      return NextResponse.json(
        { message: "No guest users found" },
        { status: 404 }
      );
    }

    // Delete all users with isGuest: true
    await User.deleteMany({ isGuest: true });

    const response = NextResponse.json({
      message: "All guest users deleted successfully",
      deletedCount: guestUsers.length,
    });

    response.headers.set("Cache-Control", "no-store");

    return response;
  } catch (error) {
    console.error("Error deleting all guest users:", error);
    return NextResponse.json(
      { error: "Unable to delete all guest users" },
      { status: 500 }
    );
  }
}