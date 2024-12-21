"use client";

import FormNewBoard from "@/components/dashboardUI/FormNewBoard";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashBoard() {
  const [boards, setBoards] = useState([]);

  const openModal = () => document.getElementById("my_modal_1").showModal();
  const closeModal = () => document.getElementById("my_modal_1").close();

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await axios.get("/api/board");
        console.log(response);
        setBoards(response.data);
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };

    fetchBoards();
  }, []);

  return (
    <div className="mt-16 mx-8">
      <div className="border-b-2 border-slate-300">
        <h1 className="text-2xl font-bold mb-2">Projects</h1>
      </div>
      <p className="mt-10 text-xl mb-4">Boards</p>
      <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-4">
        <div
          className="rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-700 h-28 flex items-center cursor-pointer"
          onClick={openModal}
        >
          <p className="ml-2 font-bold">Add Board</p>
        </div>
        {/* <Boards /> */}

        {boards.map((board) => (
          <div key={board._id} className="group">
            <Link href={`/board/${board._id}`} key={board._id}>
              <div className="bg-gray-100 hover:bg-gray-200 rounded-lg h-28 flex items-center cursor-pointer justify-between">
                <p className="ml-4 text-xl">{board.name}</p>
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
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </div>
            </Link>
          </div>
        ))}

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <FormNewBoard closeModal={closeModal} />
            {/* <div className="flex justify-between">
              <h3 className="font-bold text-lg">Create Board</h3>
              <button
                onClick={closeModal}
                className="text-gray-200 hover:bg-gray-200 hover:text-black p-1 rounded"
              >
                ✕
              </button>
            </div>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
            <label className="block mt-4">
              <span className="text-md font-bold">Board Title</span>
              <input
                className="border-black border rounded mt-1 w-full"
                value={newBoard}
                onChange={(e) => setNewBoard(e.target.value)}
              />
            </label>
            <div className="flex items-center justify-end gap-3 mt-2">
              <button onClick={closeModal} className="btn btn-accent">
                Submit
              </button>
            </div> */}
          </div>
        </dialog>
      </div>
    </div>
  );
}
