
import { connectMongo } from "@/lib/mongoose";
import User from "@/models/User";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongo();

    // Generate a unique guest name
    const guestCount = await User.countDocuments({ isGuest: true });
    const guestName = `guest${guestCount + 1}`;

    // Create a new guest user in the database
    const guestUser = await User.create({
      name: guestName,
      isGuest: true,
      email: `${guestName}@guest.com`,
    });

    // Create a guest session object
    const guestSession = {
      id: guestUser._id,
      name: guestUser.name,
      isGuest: true,
    };

    // Set the session in an HTTP-only cookie
    const response = NextResponse.json({
      message: "Guest session created successfully",
      guest: guestSession,
    });

    response.cookies.set("guestSession", JSON.stringify(guestSession), {
      httpOnly: true, // Accessible only by the server
      secure: process.env.NODE_ENV === "production", // Secure in production
      path: "/", // Accessible across the app
      maxAge: 60 * 60 * 24, // Expires in 1 day
    });

    return response;
  } catch (error) {
    console.error("Error creating guest user:", error);
    return NextResponse.json(
      { error: "Unable to create guest user" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const cookieStore = cookies();
  const guestSessionCookie = cookieStore.get("guestSession");

  if (guestSessionCookie) {
    try {
      const guestSession = JSON.parse(guestSessionCookie.value);
      return NextResponse.json({ guestSession });
    } catch (error) {
      console.error("Invalid guest session cookie:", error);
      return NextResponse.json({ error: "Invalid guest session" }, { status: 400 });
    }
  }

  return NextResponse.json({ error: "No guest session found" }, { status: 401 });
}