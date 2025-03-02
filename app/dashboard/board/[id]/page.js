"use client";
import AddList from "@/components/boardsUI/AddList";
import DragList from "@/components/boardsUI/DragList";
import { useBoard } from "@/hooks/useBoard";
import { useSaveOrder } from "@/hooks/useSaveListOrder";
import { Reorder } from "framer-motion";
import { use, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="bg-red-50 text-red-600 p-6 rounded-lg border border-red-100 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Error Loading Board</h2>
          <p>{error.message}</p>
          <Link
            href="/dashboard"
            className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <FaArrowLeft className="mr-2" /> Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-6 max-w-full">
      <div className="flex items-center mb-6">
        <Link
          href="/dashboard"
          className="mr-4 p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-full transition-colors"
          aria-label="Back to dashboard"
        >
          <FaArrowLeft />
        </Link>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            {board?.name}
          </h1>
          <p className="text-slate-500 text-sm mt-1">Drag to reorder</p>
        </div>
      </div>

      <div className="pb-6 w-full">
        <section className="overflow-x-auto scrollbar-hide min-h-[calc(100vh-200px)]">
          <div className="flex pt-2 pb-4 px-1">
            <Reorder.Group
              axis="x"
              values={lists}
              onReorder={handleReorder}
              className="flex gap-4"
            >
              {lists.map((list) => (
                <DragList key={list._id} list={list} boardId={id} />
              ))}
            </Reorder.Group>

            <div className="ml-7 flex-shrink-0">
              <AddList boardId={id} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
