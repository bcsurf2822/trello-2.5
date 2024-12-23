import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectMongo } from "@/lib/mongoose";
import Board from "@/models/Board";

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

    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
    }

    await connectMongo();

    const board = await Board.findOne({
      _id: body.boardId,
      userId: session.user.id,
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
