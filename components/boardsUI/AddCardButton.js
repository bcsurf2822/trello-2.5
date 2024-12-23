"use client";
import { useState } from "react";

export default function AddCardButton(boardId, listId) {
  const [isAdding, setIsAdding] = useState(false);
  const [cardName, setCardName] = useState("");

  const handleAddCardClick = () => {
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setCardName("");
  };

  return (
    <div>
      {isAdding ? (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Enter card name"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            className="input input-bordered input-sm w-full"
          />
          <div className="flex gap-2">
            <button className="btn btn-primary btn-sm">Save</button>
            <button onClick={handleCancel} className="btn btn-secondary btn-sm">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={handleAddCardClick}
          className="bg-neutral-300 text-black w-full py-2 hover:bg-slate-400 pr-2 flex justify-end items-center gap-2"
        >
          Add Card{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
