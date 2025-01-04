"use client";
import AddList from "@/components/boardsUI/AddList";
import List from "@/components/boardsUI/List";
import { useBoard } from "@/hooks/useBoard";
import { useSaveOrder } from "@/hooks/useSaveListOrder";
import { Reorder } from "framer-motion";
import { use, useEffect, useState } from "react";

export default function BoardPage({ params }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const { data: board, isLoading, error } = useBoard(id);
  const [lists, setLists] = useState(board?.lists || []);
  const saveOrder = useSaveOrder(id);

  useEffect(() => {
    if (board?.lists) {
      setLists(board.lists);
    }
  }, [board]);

  const handleReorder = (newOrder) => {
    setLists(newOrder);

    saveOrder.mutate(newOrder);
  };

  if (isLoading) return <span className="loading loading-dots loading-lg"></span>;
  if (error) return <p>Error loading board: {error.message}</p>;

  return (
    <main className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold ml-2 my-2 underline">{board?.name}</h1>
      <br className="mx-2 mb-1" />
      <section className="flex gap-4 mx-2">
        <Reorder.Group
          axis="x"
          values={lists}
          onReorder={handleReorder}
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
        <div>
          <AddList boardId={id} />
        </div>
      </section>
    </main>
  );
}
