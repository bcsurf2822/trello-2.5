"use client";
import Link from "next/link";
import React, { useState } from "react";

export default function DashBoard() {
  const [newBoard, setNewBoard] = useState("");
  const boards = [];

  const openModal = () => document.getElementById("my_modal_1").showModal();
  const closeModal = () => document.getElementById("my_modal_1").close();

  return (
    <div className="mt-16 mx-8">
      <div className="border-b-2 border-slate-300">
        <h1 className="text-2xl font-bold mb-2">Organization</h1>
      </div>
      <p className="mt-10 text-xl mb-4">Boards</p>
      <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-4">
        <div
          className="rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-700 h-28 flex items-center cursor-pointer"
          onClick={openModal}
        >
          <p className="ml-2 font-bold">Add Board</p>
        </div>
        {boards.map((board) => (
          <div key={board._id} className="group">
            <Link href={`/board/${board._id}`} key={board._id}>
              <div className="bg-gray-100 hover:bg-gray-200 rounded-lg h-28 flex items-center cursor-pointer justify-between">
                <p className="ml-4">{board.title}</p>
                <div className="opacity-0 group-hover:opacity-100">Delete</div>
              </div>
            </Link>
          </div>
        ))}

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <div className="flex justify-between">
              <h3 className="font-bold text-lg">Create Board</h3>
              <button
                onClick={closeModal}
                className="text-black hover:bg-gray-200 p-1 rounded"
              >
                ✕
              </button>
            </div>
            <p className="py-4">Press ESC key or click the button below to close</p>
            <label className="block mt-4">
              <span className="text-sm">Board Title</span>
              <input
                className="border-black border rounded mt-1 w-full"
                value={newBoard}
                onChange={(e) => setNewBoard(e.target.value)}
              />
            </label>
            <div className="modal-action">
              <button
                onClick={closeModal}
                className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 mr-2 cursor-pointer font-semibold mt-6 mb-4"
              >
                Submit
              </button>
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}
