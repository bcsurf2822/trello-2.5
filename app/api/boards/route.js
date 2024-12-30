import { NextResponse } from "next/server";
import { auth } from "@/auth";

import User from "@/models/User";
import Board from "@/models/Board";
import { connectMongo } from "@/lib/mongoose";
// import { getSessionInfo } from "@/utils/getSessionInfo";

export async function POST(req) {
  try {
    const body = await req.json();


    if (!body.name) {
      return NextResponse.json(
        { error: "Board Name is Required" },
        { status: 400 }
      );
    }

    await connectMongo();


    const session = await auth();

    let user;

    if (session) {
      // Fetch the authenticated user
      user = await User.findById(session.user.id);
    } else {

      user = await User.findOne({ isGuest: true });
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const board = await Board.create({
      userId: user.id,
      name: body.name,
    });

    // Add board ID to the user's boards array only if they are not a guest
    if (!user.isGuest) {
      user.boards.push(board._id);
      await user.save();
    }


    return NextResponse.json(board, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function GET(req) {
  try {
    await connectMongo();

    // Attempt to retrieve session for authenticated users
    const session = await auth();

    let user;

    if (session) {
      // Fetch the authenticated user
      user = await User.findById(session.user.id).populate("boards");
    } else {
      // Handle guest user (this assumes you can identify the guest somehow)
      user = await User.findOne({ isGuest: true }); // Add additional criteria if needed
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // If the user is a guest, return an empty array
    if (user.isGuest) {
      return NextResponse.json([]);
    }

    // For authenticated users, return their boards
    return NextResponse.json(user.boards);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function DELETE(req) {
  try {
    const { boardId } = await req.json();

    if (!boardId) {
      return NextResponse.json(
        { error: "Board ID is required" },
        { status: 400 }
      );
    }

    await connectMongo();


    const session = await auth();

    let user;

    if (session) {
      user = await User.findById(session.user.id);
    } else {

      user = await User.findOne({ isGuest: true });
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }


    const board = await Board.findOne({
      _id: boardId,
      userId: user.id,
    });

    if (!board) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }


    await Board.deleteOne({ _id: boardId, userId: user.id });


    if (!user.isGuest) {
      user.boards = user.boards.filter((id) => id.toString() !== boardId);
      await user.save();
    }

    return NextResponse.json({ message: "Board deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
