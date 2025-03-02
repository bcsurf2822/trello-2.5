// components/boardsUI/List.js
import AddCardButton from "./AddCardButton";
import DragCard from "./DragCard";
import { useDeleteList } from "@/hooks/useDeleteList";
import { AnimatePresence } from "framer-motion";
import { FaGripLines, FaTrash } from "react-icons/fa";

export default function List({ list, boardId, dragControls }) {
  const listId = list._id;
  const deleteList = useDeleteList(boardId);

  const handleDeleteList = () => {
    deleteList.mutate({ listId });
  };

  return (
    <div className="bg-white w-[280px] rounded-lg shadow border border-slate-200 flex flex-col flex-shrink-0 max-h-[calc(100vh-180px)]">
      {/* List Header with Gradient Strip */}
      <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-t-lg"></div>

      {/* List Title */}
      <div className="flex justify-between items-center py-3 px-3 border-b border-slate-100">
        <div
          className="flex items-center cursor-grab group"
          onPointerDown={(e) => dragControls.start(e)}
        >
          <FaGripLines
            className="mr-2 text-slate-400 group-hover:text-blue-500"
            size={12}
          />
          <h2 className="font-medium text-slate-800 group-hover:text-blue-700 transition-colors">
            {list.name}
          </h2>
        </div>

        <button
          onClick={handleDeleteList}
          disabled={deleteList.isPending}
          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
          aria-label="Delete list"
        >
          <FaTrash size={12} />
        </button>
      </div>

      {/* Cards Container with Scrolling */}
      <ul
        data-list-id={list._id}
        className="flex flex-col gap-2 p-2 overflow-y-auto flex-grow"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#CBD5E1 transparent",
        }}
      >
        <AnimatePresence>
          {list.cards.map((card) => (
            <DragCard
              key={card._id}
              card={card}
              boardId={boardId}
              listId={list._id}
            />
          ))}
        </AnimatePresence>
      </ul>

      {/* Add Card Button Area */}
      <div className="p-2 mt-auto border-t border-slate-100">
        <AddCardButton boardId={boardId} listId={listId} />
      </div>
    </div>
  );
}
