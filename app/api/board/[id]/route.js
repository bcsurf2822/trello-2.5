import { NextResponse } from "next/server";

import Board from "@/models/Board";
import { connectMongo } from "@/lib/mongoose";

export async function GET( { params }) {
  try {
    await connectMongo();

    const board = await Board.findById(params.id).populate("lists");

    if (!board) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }

    return NextResponse.json(board);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
