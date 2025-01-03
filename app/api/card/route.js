import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectMongo } from "@/lib/mongoose";
import Board from "@/models/Board";

import User from "@/models/User";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.boardId) {
      return NextResponse.json(
        { error: "Board ID is required" },
        { status: 400 }
      );
    }

    if (!body.listId) {
      return NextResponse.json(
        { error: "List ID is required" },
        { status: 400 }
      );
    }

    if (!body.name) {
      return NextResponse.json(
        { error: "Card Name is required" },
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

    const list = board.lists.find(
      (list) => list._id.toString() === body.listId
    );

    if (!list) {
      return NextResponse.json({ error: "List not found" }, { status: 404 });
    }

    const newCard = {
      name: body.name,
      description: body.description || "",
    };

    list.cards.push(newCard);

    await board.save();

    return NextResponse.json({ message: "Card added successfully", board });
  } catch (error) {
    console.error("Error adding card:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const body = await req.json();

    if (!body.boardId) {
      return NextResponse.json(
        { error: "Board ID is required" },
        { status: 400 }
      );
    }

    if (!body.listId) {
      return NextResponse.json(
        { error: "List ID is required" },
        { status: 400 }
      );
    }

    if (!body.cardId) {
      return NextResponse.json(
        { error: "Card ID is required" },
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

    const list = board.lists.find(
      (list) => list._id.toString() === body.listId
    );

    if (!list) {
      return NextResponse.json({ error: "List not found" }, { status: 404 });
    }

    const cardIndex = list.cards.findIndex(
      (card) => card._id.toString() === body.cardId
    );

    if (cardIndex === -1) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }

    list.cards.splice(cardIndex, 1);

    await board.save();

    return NextResponse.json({ message: "Card deleted successfully", board });
  } catch (error) {
    console.error("Error deleting card:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
