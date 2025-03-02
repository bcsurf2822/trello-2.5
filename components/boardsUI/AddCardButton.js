"use client";
import { useCreateCard } from "@/hooks/useCreateCard";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function AddCardButton({ boardId, listId }) {
  const [isAdding, setIsAdding] = useState(false);
  const [cardName, setCardName] = useState("");
  const createCardMutation = useCreateCard(boardId);

  const handleAddCardClick = () => {
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setCardName("");
  };

  const handleSaveCard = () => {
    if (!cardName.trim() || createCardMutation.isLoading) return;

    createCardMutation.mutate(
      {
        boardId,
        listId,
        name: cardName,
      },
      {
        onSuccess: () => {
          setIsAdding(false);
          setCardName("");
          console.log("Card added successfully!");
        },
        onError: (error) => {
          console.error("Error adding card:", error);
        },
      }
    );
  };

  return (
    <div className="w-full">
      {isAdding ? (
        <div className="p-1">
          <input
            type="text"
            placeholder="Enter card name"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSaveCard();
            }}
            className="w-full p-2 border border-slate-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none text-sm shadow-sm mb-2"
            autoFocus
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={handleSaveCard}
              disabled={createCardMutation.isLoading}
              className={`py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors ${
                !cardName.trim() || createCardMutation.isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {createCardMutation.isLoading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleCancel}
              className="py-1.5 px-3 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={handleAddCardClick}
          className="w-full flex items-center justify-between py-1.5 px-3 text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
        >
          <span className="text-sm">Add Card</span>
          <FaPlus size={12} />
        </button>
      )}
    </div>
  );
}
