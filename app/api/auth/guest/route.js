import { connectMongo } from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await connectMongo();

    const guestCount = await User.countDocuments({ isGuest: true });

    const guestName = `guest${guestCount + 1}`;

    const guestUser = await User.create({
      name: guestName,
      isGuest: true,
      email: `${guestName}@guest.com`,
    });

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
