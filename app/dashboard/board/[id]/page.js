import { auth } from "@/auth";
import { connectMongo } from "@/lib/mongoose";
import { redirect } from "next/navigation";
import Board from "@/models/Board";

const getBoard = async (boardId) => {
  const session = await auth();
  await connectMongo();

  const board = await Board.findOne({
    _id: boardId,
    userId: session?.user?.id,
  });
  if (!board) {
    redirect("/dashboard");
  }

  return board;
};

export default async function BoardPage({ params }) {
  const { id } = params;

  const board = await getBoard(id);

  return (
    <main>
      <h1>{board?.name}</h1>
    </main>
  );
}
