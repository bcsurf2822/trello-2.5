"use client";

import DeleteBoardButton from "@/components/dashboardUI/DeleteBoardButton";
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

  const handleBoardDelete = (boardId) => {
    setBoards((prevBoards) =>
      prevBoards.filter((board) => board._id !== boardId)
    );
  };

  const handleBoardCreate = (newBoard) => {
    setBoards((prevBoards) => [...prevBoards, newBoard]);
  };

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
            <div className="bg-gray-100 hover:bg-gray-200 rounded-lg h-28 flex items-center justify-between">
              <Link
                className="ml-4 text-lg font-bold hover:text-blue-500"
                href={`/dashboard/board/${board._id.toString()}`}
              >
                {board.name}
              </Link>

              <DeleteBoardButton
                onDelete={handleBoardDelete}
                boardId={board._id.toString()}
              />
            </div>
          </div>
        ))}

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <FormNewBoard
              onBoardCreate={handleBoardCreate}
              closeModal={closeModal}
            />
          </div>
        </dialog>
      </div>
    </div>
  );
}
