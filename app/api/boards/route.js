import { NextResponse } from "next/server";
import { auth } from "@/auth";
import User from "@/models/User";
import Board from "@/models/Board";
import { connectMongo } from "@/lib/mongoose";

export async function GET(request) {
  try {
    await connectMongo();

    const guestId = request.headers.get("Guest-ID");

    let query = {};

    if (guestId) {
      query = { createdBy: guestId };
      console.log(`Fetching boards for guest ID: ${guestId}`);
    } else {
      const session = await auth();
      if (session?.user?.id) {
        query = { createdBy: session.user.id };
        console.log(
          `Fetching boards for authenticated user ID: ${session.user.id}`
        );
      } else {
        console.log("No authenticated user or guest ID found");
        return NextResponse.json([], { status: 200 });
      }
    }

    const boards = await Board.find(query).catch((err) => {
      console.error("Error finding boards:", err);

      if (guestId) {
        return [];
      }

      throw err;
    });

    return NextResponse.json(boards || []);
  } catch (error) {
    console.error("Error in boards API:", error);

    if (request.headers.get("Guest-ID")) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(
      { error: "Failed to fetch boards" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectMongo();

    const body = await request.json();
    const { name, description } = body;

    const guestId =
      request.headers.get("Guest-ID") ||
      request.headers.get("guestId") ||
      request.headers.get("guest-id") ||
      request.cookies.get("guestId")?.value;

    if (!name) {
      return NextResponse.json(
        { error: "Board name is required" },
        { status: 400 }
      );
    }

    let creatorId;

    if (guestId) {
      creatorId = guestId;

      const guestUser = await User.findById(guestId).catch((e) => {
        return null;
      });

      if (!guestUser) {
        console.log("Guest user not found in database");
      } else {
        console.log("Guest user found:", guestUser.name);
      }
    } else {
      const session = await auth();

      if (session?.user?.id) {
        creatorId = session.user.id;
      } else {
        return NextResponse.json(
          {
            error: "Authentication required",
            details: "No valid guest ID or authentication found",
          },
          { status: 401 }
        );
      }
    }

    const newBoard = {
      name,
      description: description || "",
      createdBy: creatorId,
    };

    const board = await Board.create(newBoard);

    return NextResponse.json(board, { status: 201 });
  } catch (error) {
    console.error("Error creating board:", error);
    console.error("Error stack:", error.stack);

    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      console.error("Validation errors:", validationErrors);

      return NextResponse.json(
        { error: "Board validation failed", details: validationErrors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create board", details: error.message },
      { status: 500 }
    );
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

    const guestId = req.headers.get("Guest-ID");

    let query = { _id: boardId };

    if (guestId) {
      query.createdBy = guestId;
      console.log(`Deleting board for guest ID: ${guestId}`);
    } else {
      const session = await auth();
      if (session?.user?.id) {
        query.createdBy = session.user.id;
        console.log(
          `Deleting board for authenticated user ID: ${session.user.id}`
        );
      } else {
        console.log("No authenticated user or guest ID found");
        return NextResponse.json(
          { error: "Authentication required" },
          { status: 401 }
        );
      }
    }

    console.log("Delete query:", query);

    const result = await Board.deleteOne(query);

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Board not found or you don't have permission to delete it" },
        { status: 404 }
      );
    }

    if (!guestId) {
      const session = await auth();
      if (session?.user?.id) {
        await User.findByIdAndUpdate(session.user.id, {
          $pull: { boards: boardId },
        });
      }
    }

    return NextResponse.json({ message: "Board deleted successfully" });
  } catch (error) {
    console.error("Error in DELETE Boards Route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
