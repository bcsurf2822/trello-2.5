import { auth } from "@/auth";
import { connectMongo } from "@/lib/mongoose";
import { redirect } from "next/navigation";
import Board from "@/models/Board";
import List from "@/components/boardsUI/List";
import AddList from "@/components/boardsUI/AddListButton";
import { fetchBoardData } from "@/utils/apiCalls";


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
  const { id: boardId } = params;
  if (!boardId) {
    redirect("/dashboard");
  }

  const board = await getBoard(boardId);

  return (
    <main className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold">{board?.name}</h1>
      <section className="flex gap-4 justify-between mx-2 ">
        {board?.lists.length > 0 &&
          board.lists.map((list) => <List key={list._id} list={list} />)}

        <div className="w-1/2">
          <AddList boardId={boardId} />
        </div>
      </section>
    </main>
  );
}
