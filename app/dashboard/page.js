"use client";
import DeleteBoardButton from "@/components/dashboardUI/DeleteBoardButton";
import FormNewBoard from "@/components/dashboardUI/FormNewBoard";
import Link from "next/link";
import { useFetchBoards } from "@/hooks/useFetchBoards";
import { useGuest } from "@/context/guestContext";
import { FaPlus } from "react-icons/fa";

export default function DashBoard() {
  const { loading } = useGuest();
  const { data, isLoading, isError } = useFetchBoards();

  const openModal = () => document.getElementById("my_modal_1").showModal();
  const closeModal = () => document.getElementById("my_modal_1").close();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-bars loading-md"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <header className="mb-8">
        <div className="border-b border-slate-200 pb-4 mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Boards
          </h1>
        </div>

        <p className="text-slate-600 mb-4">
          {data?.length
            ? `You have ${data.length} board${data.length === 1 ? "" : "s"}`
            : "Create your first board to get started"}
        </p>
      </header>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        <div
          onClick={openModal}
          className="border-2 border-dashed border-slate-200 hover:border-blue-500 bg-slate-50 hover:bg-slate-100 rounded-xl p-4 h-36 transition-all duration-200 flex flex-col items-center justify-center cursor-pointer shadow-sm hover:shadow group"
        >
          <div className="p-2 rounded-full bg-blue-50 group-hover:bg-blue-100 mb-2">
            <FaPlus className="text-blue-500 group-hover:text-blue-600 w-5 h-5" />
          </div>
          <p className="font-medium text-slate-600 group-hover:text-blue-700">
            Add New Board
          </p>
        </div>

        {isLoading && (
          <div className="col-span-full flex justify-center items-center h-36">
            <span className="loading loading-bars loading-md"></span>
          </div>
        )}

        {isError && (
          <div className="col-span-full bg-red-50 text-red-600 p-4 rounded-lg border border-red-100">
            <p>Error loading boards. Please try again later.</p>
          </div>
        )}

        {!loading &&
          !isLoading &&
          !isError &&
          data?.map((board) => (
            <div key={board._id} className="group">
              <div className="bg-white hover:bg-slate-50 border border-slate-200 rounded-xl h-36 transition-all duration-200 shadow-sm hover:shadow flex flex-col overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-700"></div>
                <div className="p-4 flex flex-col justify-between h-full">
                  <Link
                    className="text-lg font-semibold text-slate-800 hover:text-blue-600 transition-colors"
                    href={`/dashboard/board/${board._id}`}
                  >
                    {board.name}
                  </Link>

                  <div className="flex justify-between items-center mt-4">
                    <div className="text-xs text-slate-500">
                      {board.lists?.length || 0} lists
                    </div>
                    <DeleteBoardButton boardId={board._id} />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-white p-0 rounded-lg overflow-hidden shadow-lg max-w-md">
          <FormNewBoard closeModal={closeModal} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
