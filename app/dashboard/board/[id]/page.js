"use client";
import AddList from "@/components/boardsUI/AddList";
import List from "@/components/boardsUI/List";
import { useBoard } from "@/hooks/useBoard";
import axios from "axios";
import { Reorder } from "framer-motion";
import { use, useEffect, useState } from "react";

export default function BoardPage({ params }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const { data: board, isLoading, error } = useBoard(id);
  const [lists, setLists] = useState(board?.lists || []);

  useEffect(() => {
    if (board?.lists) {
      setLists(board.lists);
    }
  }, [board]);

  const saveOrder = async (newOrder) => {
    setLists(newOrder);
    try {
      await axios.put(`/api//list`, {
        boardId: id,
        lists: newOrder,
      });
    } catch (error) {
      console.error("Error saving list order:", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading board: {error.message}</p>;

  return (
    <main className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold ml-2 my-2 underline">{board?.name}</h1>
      <br className="mx-2 mb-1" />
      <section className="flex gap-4 mx-2">
        {/* Drag-and-Drop List Reordering */}
        <Reorder.Group
          axis="x"
          values={lists}
          onReorder={saveOrder}
          className="flex gap-2"
        >
          {lists.map((list) => (
            <Reorder.Item
              key={list._id}
              value={list}
              className="flex-shrink-0 w-[20vw]"
            >
              <List list={list} boardId={id} />
            </Reorder.Item>
          ))}
        </Reorder.Group>
        <AddList boardId={id} />
      </section>
    </main>
  );
}
