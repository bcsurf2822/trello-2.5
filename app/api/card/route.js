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

    console.log("Card Added:", newCard);
    console.log("Updated Board:", board);

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

    const removedCard = list.cards.splice(cardIndex, 1);

    await board.save();

    console.log("Card Deleted:", removedCard);
    console.log("Updated Board:", board);

    return NextResponse.json({ message: "Card deleted successfully", board });
  } catch (error) {
    console.error("Error deleting card:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();

    if (!body.boardId || !body.cardOrder) {
      return NextResponse.json(
        { error: "Board ID and card order are required" },
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

    const { cardOrder } = body;

    board.lists.forEach((list) => {
      const listIdStr = list._id.toString();
      if (cardOrder[listIdStr]) {
        const cardMap = {};
        list.cards.forEach((card) => {
          cardMap[card._id.toString()] = card;
        });

        list.cards = cardOrder[listIdStr]
          .map((cardId) => cardMap[cardId])
          .filter((card) => card);
      }
    });

    await board.save();

    console.log("Card order updated successfully");

    return NextResponse.json({
      message: "Cards reordered successfully",
      board,
    });
  } catch (error) {
    console.error("Error saving card order:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
