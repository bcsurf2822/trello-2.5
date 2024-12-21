//Next Response : helper to help us format our response

import { NextResponse } from "next/server";
import { auth } from "@/auth";

import User from "@/models/User";
import Board from "@/models/Board";
import { connectMongo } from "@/lib/mongoose";



export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.name) {

      return NextResponse.json(
        { error: "Board Name is Required" },
        { status: 400 }
      );
    }

    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
    }

    await connectMongo();


    const user = await User.findById(session.user.id);

    const board = await Board.create({
      userId: user._id,
      name: body.name,
    });

    user.boards.push(board._id);

    await user.save();


    return NextResponse.json(board);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
    }

    await connectMongo();

    // Find the user and populate the boards
    const user = await User.findById(session.user.id).populate("boards");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return the boards
    return NextResponse.json(user.boards);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = req.nextUrl;
    const boardId = searchParams.get("boardId");

    if (!boardId) {
      return NextResponse.json(
        { error: "boardId is required" },
        { status: 400 }
      );
    }

    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
    }

    const user = await User.findById(session?.user?.id);

    if (!user.hasAccess) {
      return NextResponse.json(
        { error: "Please subscribe first!" },
        { status: 403 }
      );
    }

    await Board.deleteOne({
      _id: boardId,
      userId: session?.user?.id,
    });

    user.boards = user.boards.filter((id) => id.toString() !== boardId);
    
    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json({ error: error.messsage }, { status: 500 });
  }
}