"use client";
import { useCreateBoard } from "@/hooks/useCreateBoard";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";

const FormNewBoard = ({ closeModal }) => {
  const [name, setName] = useState("");
  const createBoard = useCreateBoard();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (createBoard.isPending) return;
    const boardData = { name };
    createBoard.mutate(boardData, {
      onSuccess: () => {
        setName("");
        closeModal();
      },
      onError: (error) => {
        console.error("Error creating board:", error);
        toast.error("Failed to create board. Please try again.");
      },
    });
  };

  const handleClose = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow-md border border-slate-200 space-y-6"
    >
      {/* TITLE */}
      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
        <p className="font-bold text-lg text-blue-700">Create Board</p>
        <button
          onClick={handleClose}
          type="button"
          className="text-slate-400 hover:text-red-500 hover:bg-slate-100 font-bold p-1.5 rounded-full transition-colors"
        >
          <IoClose size={18} />
        </button>
      </div>

      {/* FORM */}
      <label className="form-control block">
        <div className="label flex flex-col items-start">
          <span className="text-md font-medium text-slate-700">Title</span>
        </div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter board name"
          className="w-full py-2 px-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          required
        />
      </label>

      {/* BUTTON */}
      <button
        type="submit"
        className={`w-full py-2 rounded-lg font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-colors shadow-sm ${
          createBoard.isPending ? "opacity-70 cursor-not-allowed" : ""
        }`}
        disabled={createBoard.isPending}
      >
        {createBoard.isPending ? (
          <span className="loading loading-spinner loading-xs"></span>
        ) : (
          "Create Board"
        )}
      </button>
    </form>
  );
};

export default FormNewBoard;
