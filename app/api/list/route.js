import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectMongo } from "@/lib/mongoose";
import Board from "@/models/Board";
import User from "@/models/User";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.boardId || !body.name) {
      return NextResponse.json(
        { error: "Board ID and List Name are required" },
        { status: 400 }
      );
    }

    await connectMongo();

    const guestId = req.headers.get("Guest-ID");
    const session = await auth();

    let user;

    if (session) {
      user = await User.findById(session.user.id);
    } else if (guestId) {
      user = await User.findOne({ isGuest: true, _id: guestId });
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const board = await Board.findOne({
      _id: body.boardId,
      userId: user.id,
    });

    if (!board) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }

    const newList = {
      name: body.name,
      cards: [],
    };

    board.lists.push(newList);
    await board.save();

    return NextResponse.json({ message: "List added successfully", board });
  } catch (error) {
    console.error("Error in POST Lists Route:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { boardId, listId } = await req.json();

    if (!boardId || !listId) {
      return NextResponse.json(
        { error: "Board ID and List ID are required" },
        { status: 400 }
      );
    }

    await connectMongo();

    const guestId = req.headers.get("Guest-ID");
    const session = await auth();

    let user;

    if (session) {
      user = await User.findById(session.user.id);
    } else if (guestId) {
      user = await User.findOne({ isGuest: true, _id: guestId });
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
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

    const listIndex = board.lists.findIndex(
      (list) => list._id.toString() === listId
    );

    if (listIndex === -1) {
      return NextResponse.json({ error: "List not found" }, { status: 404 });
    }

    board.lists.splice(listIndex, 1);
    await board.save();

    return NextResponse.json({ message: "List deleted successfully", board });
  } catch (error) {
    console.error("Error in DELETE List Route:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();

    if (!body.boardId || !body.lists) {
      return NextResponse.json(
        { error: "Board ID and lists are required" },
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
      _id: body.boardId,
      userId: user.id,
    });

    if (!board) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }

    board.lists = body.lists;

    await board.save();

    return NextResponse.json({
      message: "Lists reordered successfully",
      board,
    });
  } catch (error) {
    console.error("Error saving list order:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
