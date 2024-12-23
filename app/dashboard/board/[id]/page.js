"use client";
import AddList from "@/components/boardsUI/AddListButton";
import List from "@/components/boardsUI/List";
import { useBoard } from "@/hooks/useBoard";
import { use } from "react";

export default function BoardPage({ params }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;

  const { data: board, isLoading, error } = useBoard(id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading board: {error.message}</p>;

  return (
    <main className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold">{board?.name}</h1>
      <section className="flex gap-4 justify-start mx-2">
        {board?.lists?.map((list) => (
          <List key={list._id} list={list} boardId={id} />
        ))}
        <AddList boardId={id} />
      </section>
    </main>
  );
}
