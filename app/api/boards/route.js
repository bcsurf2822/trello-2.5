import { NextResponse } from "next/server";
import { auth } from "@/auth";
import User from "@/models/User";
import Board from "@/models/Board";
import { connectMongo } from "@/lib/mongoose";

export async function GET(request) {
  try {
    await connectMongo();
    
    // Get the guest ID from headers if present
    const guestId = request.headers.get("Guest-ID");
    
    // Build the query based on whether we have a guest ID
    let query = {};
    
    if (guestId) {
      // For guest users, strictly filter by their ID
      query = { createdBy: guestId };
      console.log(`Fetching boards for guest ID: ${guestId}`);
    } else {
      // For authenticated users (non-guests)
      const session = await auth();
      if (session?.user?.id) {
        query = { createdBy: session.user.id };
        console.log(`Fetching boards for authenticated user ID: ${session.user.id}`);
      } else {
        console.log("No authenticated user or guest ID found");
        return NextResponse.json([], { status: 200 });
      }
    }
    
    console.log("Query for boards:", query);
    
    // Find boards with error handling
    const boards = await Board.find(query).catch(err => {
      console.error("Error finding boards:", err);
      
      // If there's an error with the query and it's a guest,
      // return empty array instead of throwing
      if (guestId) {
        return [];
      }
      
      throw err;
    });
    
    console.log(`Found ${boards?.length || 0} boards`);
    
    // Always return a 200 status with either the boards or an empty array
    return NextResponse.json(boards || []);
    
  } catch (error) {
    console.error("Error in boards API:", error);
    
    // If it's a guest request, return empty array even on error
    if (request.headers.get("Guest-ID")) {
      return NextResponse.json([], { status: 200 });
    }
    
    // Otherwise return the error
    return NextResponse.json(
      { error: "Failed to fetch boards" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectMongo();
    
    // Parse the request body
    const body = await request.json();
    const { name, description } = body;
    
    // Get the guest ID from headers if present
    const guestId = request.headers.get("Guest-ID");
    
    // Make sure we have a name for the board
    if (!name) {
      return NextResponse.json(
        { error: "Board name is required" },
        { status: 400 }
      );
    }
    
    let createdById;
    
    if (guestId) {
      createdById = guestId;
      console.log(`Creating board for guest ID: ${guestId}`);
    } else {
      // Get authenticated user
      const session = await auth();
      if (session?.user?.id) {
        createdById = session.user.id;
        console.log(`Creating board for authenticated user ID: ${session.user.id}`);
      } else {
        console.log("No authenticated user or guest ID found");
        return NextResponse.json(
          { error: "Authentication required" },
          { status: 401 }
        );
      }
    }
    
    // Create a new board with only the fields your schema expects
    const newBoard = {
      name,
      description: description || "",
      createdBy: createdById,
      lists: []
      // Let MongoDB handle the timestamps if they're in your schema
    };
    
    console.log("Creating board with data:", newBoard);
    
    // Save the board to the database
    const board = await Board.create(newBoard);
    
    console.log("Board created successfully:", board);
    
    // If this is an authenticated (non-guest) user, update their boards array
    if (!guestId) {
      const session = await auth();
      if (session?.user?.id) {
        await User.findByIdAndUpdate(
          session.user.id,
          { $push: { boards: board._id } }
        );
      }
    }
    
    return NextResponse.json(board, { status: 201 });
  } catch (error) {
    console.error("Error creating board:", error);
    
    // Check for validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      console.error("Validation errors:", validationErrors);
      
      return NextResponse.json(
        { error: "Board validation failed", details: validationErrors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to create board" },
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

    // Get the guest ID from headers if present
    const guestId = req.headers.get("Guest-ID");
    
    let query = { _id: boardId };
    
    if (guestId) {
      // For guest users
      query.createdBy = guestId;
      console.log(`Deleting board for guest ID: ${guestId}`);
    } else {
      // For authenticated users
      const session = await auth();
      if (session?.user?.id) {
        query.createdBy = session.user.id;
        console.log(`Deleting board for authenticated user ID: ${session.user.id}`);
      } else {
        console.log("No authenticated user or guest ID found");
        return NextResponse.json(
          { error: "Authentication required" },
          { status: 401 }
        );
      }
    }
    
    console.log("Delete query:", query);

    // Delete the board with the correct query
    const result = await Board.deleteOne(query);
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Board not found or you don't have permission to delete it" },
        { status: 404 }
      );
    }

    // If this is a non-guest user, update their boards array
    if (!guestId) {
      const session = await auth();
      if (session?.user?.id) {
        await User.findByIdAndUpdate(
          session.user.id,
          { $pull: { boards: boardId } }
        );
      }
    }

    console.log("Board deleted successfully");

    return NextResponse.json({ message: "Board deleted successfully" });
  } catch (error) {
    console.error("Error in DELETE Boards Route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}