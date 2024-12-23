"use client";
import List from "@/components/boardsUI/List";
import { useBoard } from "@/hooks/useBoard";
import { use } from "react";

export default function BoardPage({ params }) {
  const unwrappedParams = use(params)
  console.log(unwrappedParams)
  const { id } = unwrappedParams;
  console.log("ID", id)

  const { data: board, isLoading, error } = useBoard(id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading board: {error.message}</p>;

  return (
    <main className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold">{board?.name}</h1>
      <section className="flex gap-4 justify-between mx-2">
        {board?.lists?.length > 0
          ? board.lists.map((list) => <List key={list._id} list={list} />)
          : <p>No lists yet</p>}
      </section>
    </main>
  );
}
