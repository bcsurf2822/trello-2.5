
import { motion } from "framer-motion";
import { useDeleteCard } from "@/hooks/useDeleteCard";
import { useSaveCardOrder } from "@/hooks/useSaveCardOrder";

export default function DragCard({ card, boardId, listId }) {
  const deleteCardMutation = useDeleteCard(boardId, listId);
  const saveCardOrder = useSaveCardOrder(boardId);

  const handleDeleteCard = () => {
    deleteCardMutation.mutate(card._id);
  };

  const handleDragStart = () => {
    // Add a class to indicate we're dragging
    document.body.classList.add("dragging-card");
  };

  const handleDragEnd = (event, info) => {
    // Remove the dragging class
    document.body.classList.remove("dragging-card");

    // Get the element at the drop position
    const dropTarget = document.elementFromPoint(info.point.x, info.point.y);
    
    // Find the closest list element
    const targetListEl = dropTarget?.closest("[data-list-id]");
    
    // If no list was found, card is outside valid drop areas
    if (!targetListEl) {
      // Return to original position by not doing anything
      return;
    }
    
    // Get the target list ID
    const targetListId = targetListEl.getAttribute("data-list-id");
    
    // If the list is the same one, we need to determine position within the list
    const cardElements = targetListEl.querySelectorAll("li");
    const cardElementsArray = Array.from(cardElements);
    
    // Find closest card to drop position
    let closestCardIndex = -1;
    if (cardElementsArray.length > 0) {
      // Calculate which card we're closest to
      cardElementsArray.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        
        // If we're above this card's center, this is where we should insert
        if (info.point.y < centerY && closestCardIndex === -1) {
          closestCardIndex = index;
        }
      });
      
      // If we're below all cards, place at the end
      if (closestCardIndex === -1) {
        closestCardIndex = cardElementsArray.length;
      }
    }

    // Save the new order
    saveCardOrder.mutate({
      cardId: card._id,
      sourceListId: listId,
      destinationListId: targetListId,
      newIndex: closestCardIndex,
    });
  };

  return (
    <motion.li
      className="bg-neutral-300 text-black w-full text-start py-2 hover:bg-slate-400 pl-2 flex justify-between items-center"
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      layoutId={card._id} // helps with animations when reordering
    >
      <span>{card.name}</span>
      <button
        onClick={handleDeleteCard}
        disabled={deleteCardMutation.isPending}
        className="mr-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 hover:text-red-500 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
    </motion.li>
  );
}