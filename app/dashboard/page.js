"use client";

import DeleteBoardButton from "@/components/dashboardUI/DeleteBoardButton";
import FormNewBoard from "@/components/dashboardUI/FormNewBoard";
import Link from "next/link";

import { useFetchBoards } from "@/hooks/useFetchBoards";

export default function DashBoard() {
  const { data: boards = [], isLoading, isError } = useFetchBoards();
  const openModal = () => document.getElementById("my_modal_1").showModal();
  const closeModal = () => document.getElementById("my_modal_1").close();

  return (
    <div className="mt-16 mx-8">
      <div className="border-b-2 border-slate-300 mb-2">
        <h1 className="text-2xl font-bold mb-2">Name&apos;s Boards</h1>
      </div>
      <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-4">
        <div
          className="rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-700 h-28 flex items-center cursor-pointer"
          onClick={openModal}
        >
          <p className="ml-2 font-bold">Add Board</p>
        </div>

        {isLoading && <span className="loading loading-bars loading-md"></span>}
        {isError && <p>Error loading boards. Please try again.</p>}

        {!isLoading &&
          !isError &&
          boards.map((board) => (
            <div key={board._id} className="group">
              <div className="bg-gray-100 hover:bg-gray-200 rounded-lg h-28 flex items-center justify-between">
                <Link
                  className="ml-4 text-lg font-bold hover:text-blue-500"
                  href={`/dashboard/board/${board._id}`}
                >
                  {board.name}
                </Link>

                <DeleteBoardButton boardId={board._id} />
              </div>
            </div>
          ))}

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <FormNewBoard closeModal={closeModal} />
          </div>
        </dialog>
      </div>
    </div>
  );
}
