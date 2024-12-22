import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectMongo } from "@/lib/mongoose";
import Board from "@/models/Board";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.boardId || !body.name) {
      return NextResponse.json(
        { error: "Board ID and List Name are required" },
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

    const newList = {
      name: body.name,
      cards: [],
    };

    board.lists.push(newList);
    await board.save();

    return NextResponse.json({ message: "List added successfully", board });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}