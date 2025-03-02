// components/boardsUI/DragCard.js
import { motion } from "framer-motion";
import { useDeleteCard } from "@/hooks/useDeleteCard";
import { useSaveCardOrder } from "@/hooks/useSaveCardOrder";
import { FaTrash } from "react-icons/fa";

export default function DragCard({ card, boardId, listId }) {
  const deleteCardMutation = useDeleteCard(boardId, listId);
  const saveCardOrder = useSaveCardOrder(boardId);

  const handleDeleteCard = () => {
    deleteCardMutation.mutate(card._id);
  };

  const handleDragStart = () => {
    document.body.classList.add("dragging-card");
  };

  const handleDragEnd = (event, info) => {
    document.body.classList.remove("dragging-card");

    const dropTarget = document.elementFromPoint(info.point.x, info.point.y);

    const targetListEl = dropTarget?.closest("[data-list-id]");

    if (!targetListEl) {
      return;
    }

    const targetListId = targetListEl.getAttribute("data-list-id");

    const cardElements = targetListEl.querySelectorAll("li");
    const cardElementsArray = Array.from(cardElements);

    let closestCardIndex = -1;
    if (cardElementsArray.length > 0) {
      cardElementsArray.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;

        if (info.point.y < centerY && closestCardIndex === -1) {
          closestCardIndex = index;
        }
      });

      if (closestCardIndex === -1) {
        closestCardIndex = cardElementsArray.length;
      }
    }

    saveCardOrder.mutate({
      cardId: card._id,
      sourceListId: listId,
      destinationListId: targetListId,
      newIndex: closestCardIndex,
    });
  };

  return (
    <motion.li
      className="bg-white shadow-sm hover:shadow border border-slate-200 rounded-md overflow-hidden w-full text-slate-700 transition-all duration-200"
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      layoutId={card._id}
      whileHover={{ y: -2 }}
      whileDrag={{
        scale: 1.02,
        boxShadow:
          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
        borderColor: "#3B82F6",
      }}
    >
      <div className="flex justify-between items-start p-3 group">
        <span className="text-sm font-medium pr-2">{card.name}</span>

        <button
          onClick={handleDeleteCard}
          disabled={deleteCardMutation.isPending}
          className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-all duration-200"
          aria-label="Delete card"
        >
          <FaTrash size={12} />
        </button>
      </div>
    </motion.li>
  );
}
