import { NextResponse } from "next/server";
import { auth } from "@/auth";

import User from "@/models/User";
import Board from "@/models/Board";
import { connectMongo } from "@/lib/mongoose";
import { getSessionInfo } from "@/utils/getSessionInfo";

export async function POST(req) {
  try {
    const session = await getSessionInfo(req);

    if (!session) {
      return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
    }

    const body = await req.json();
    if (!body.name) {
      return NextResponse.json(
        { error: "Board Name is Required" },
        { status: 400 }
      );
    }

    await connectMongo();

    let user;
    if (session.isGuest) {
      user = session.user;
    } else {
      user = await User.findById(session.user.id);
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
    }

    const board = await Board.create({
      userId: user.id,
      name: body.name,
    });

    if (!session.isGuest) {
      user.boards.push(board._id);
      await user.save();
    }

    return NextResponse.json(board);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getSessionInfo();

    if (!session) {
      return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
    }

    await connectMongo();

    if (session.isGuest) {
      return NextResponse.json([]);
    }

    const user = await User.findById(session.user.id).populate("boards");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user.boards);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function DELETE(req) {
  try {
    const session = await getSessionInfo(req);

    if (!session) {
      return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
    }

    const { boardId } = await req.json();

    if (!boardId) {
      return NextResponse.json(
        { error: "Board ID is required" },
        { status: 400 }
      );
    }

    await connectMongo();

    // Find and delete the board
    const board = await Board.findOne({
      _id: boardId,
      userId: session.user.id,
    });

    if (!board) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }

    await Board.deleteOne({ _id: boardId, userId: session.user.id });

    // Remove the board from the user's boards list
    const user = await User.findById(session.user.id);
    if (user) {
      user.boards = user.boards.filter((id) => id.toString() !== boardId);
      await user.save();
    }

    return NextResponse.json({ message: "Board deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}