import { connectMongo } from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    let connectionAttempts = 0;
    const maxAttempts = 0.3;
    let connected = false;

    while (!connected && connectionAttempts < maxAttempts) {
      try {
        await connectMongo();
        connected = true;
      } catch (connError) {
        connectionAttempts++;
        console.error(
          `MongoDB connection attempt ${connectionAttempts} failed:`,
          connError
        );
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }

    if (!connected) {
      console.error("Failed to connect to MongoDB after multiple attempts");
      return NextResponse.json(
        { error: "Database connection failed, please try again" },
        { status: 503 }
      );
    }

    const timestamp = Date.now();
    const randomPart = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    const uniqueId = `${timestamp}-${randomPart}`;

    const guestName = `guest${uniqueId.slice(-4)}`;
    const guestEmail = `${guestName}@trello2.5.com`;

    if (!guestName || !guestEmail) {
      return NextResponse.json(
        { error: "Failed to generate guest credentials" },
        { status: 400 }
      );
    }

    const guestUser = await User.create({
      name: guestName,
      isGuest: true,
      email: guestEmail,
    }).catch((createError) => {
      if (createError.code === 11000) {
        console.error("Duplicate guest user detected:", createError);
        throw new Error("Guest user with this identity already exists");
      }
      throw createError;
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
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error creating guest user:", {
      message: error.message,
      stack: error.stack,
      code: error.code,
    });

    return NextResponse.json(
      {
        error: "Unable to create guest user",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
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
      sameSite: "strict",
      httpOnly: true,
    });

    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    console.error("Error deleting guest user:", {
      message: error.message,
      stack: error.stack,
      code: error.code,
    });

    return NextResponse.json(
      {
        error: "Unable to delete guest user",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
