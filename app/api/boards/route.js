import { NextResponse } from "next/server";
import { auth } from "@/auth";
import User from "@/models/User";
import Board from "@/models/Board";
import { connectMongo } from "@/lib/mongoose";

export async function GET(request) {
  try {
    await connectMongo();

    const guestId = request.headers.get("Guest-ID");
    const session = await auth();

    let user;

    if (session) {
      user = await User.findById(session.user.id).populate("boards");
    } else if (guestId) {
      user = await User.findOne({ isGuest: true, _id: guestId }).populate(
        "boards"
      );
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const boards = user.boards || [];
    console.log("USER SERVER=========>", user)
    console.log("Boards Server------->", boards)

    return NextResponse.json(boards);
  } catch (error) {
    console.error("Error in GET Boards Route:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

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

    user.boards.push(board._id);
    await user.save();

    return NextResponse.json(board, { status: 201 });
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
