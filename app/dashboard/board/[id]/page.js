import { auth } from "@/auth";
import { connectMongo } from "@/lib/mongoose";
import { redirect } from "next/navigation";
import Board from "@/models/Board";
import { dummyBoardData } from "@/data/boardData";
import List from "@/components/boardsUI/List";

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
  const empyArray = {lists: []};
  console.log("Dummy", dummyBoardData);
  const board = await getBoard(id);

  return (
    <main className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold">{board?.name}</h1>
      <section className="flex gap-4 justify-between mx-2 ">
        {dummyBoardData.lists.length > 0 &&
          dummyBoardData.lists.map((list) => (
            <List key={list._id} list={list} />
          ))}

        <div className="bg-green-100 pb-2 rounded-lg ">
          <button className=" text-black w-full py-2 hover:bg-slate-400 flex items-center justify-center">
            Add List
          </button>
        </div>
      </section>
    </main>
  );
}
