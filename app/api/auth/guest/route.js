import { connectMongo } from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await connectMongo();

    const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const guestName = `guest-${uniqueId}`;
    const guestEmail = `${guestName}@guest.com`;

    const guestUser = await User.create({
      name: guestName,
      isGuest: true,
      email: guestEmail,
    });

    const response = NextResponse.json({
      message: "Guest user created successfully",
      guest: {
        id: guestUser._id,
        name: guestUser.name,
        isGuest: true,
      },
    });

    response.cookies.set("guestId", guestUser._id.toString(), {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
    });

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

    const body = await req.json();

    const { guestId } = body;
    if (!guestId) {
      return NextResponse.json(
        { error: "Guest ID is required" },
        { status: 400 }
      );
    }

    const guestUser = await User.findById(guestId);

    if (!guestUser || !guestUser.isGuest) {
      return NextResponse.json(
        { error: "Guest user not found or invalid" },
        { status: 404 }
      );
    }

    await User.deleteOne({ _id: guestId });

    const response = NextResponse.json({
      message: "Guest user deleted successfully",
      guest: {
        id: guestUser._id,
        name: guestUser.name,
      },
    });

    response.cookies.set("guestId", "", {
      maxAge: 0,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    response.headers.set("Cache-Control", "no-store");

    return response;
  } catch (error) {
    console.error("Error deleting guest user:", error);
    return NextResponse.json(
      { error: "Unable to delete guest user" },
      { status: 500 }
    );
  }
}
