"use client";
import DeleteBoardButton from "@/components/dashboardUI/DeleteBoardButton";
import FormNewBoard from "@/components/dashboardUI/FormNewBoard";
import Link from "next/link";
import { useFetchBoards } from "@/hooks/useFetchBoards";
import { useGuest } from "@/context/guestContext";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function DashBoard() {
  const { loading, guestId } = useGuest();
  const {
    data,
    isLoading,
    isError,
    refetch,
    isRefetching,
    dataUpdatedAt,
    isFetched,
  } = useFetchBoards();

  const [showWelcome, setShowWelcome] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(Date.now());

  useEffect(() => {
    if (data && !isLoading && !isRefetching) {
      setLastRefreshed(Date.now());
    }
  }, [data, isLoading, isError, isRefetching, dataUpdatedAt, isFetched]);

  useEffect(() => {
    if (guestId && !loading && data?.length === 0) {
      setShowWelcome(true);

      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [guestId, loading, data]);

  const openModal = () => document.getElementById("my_modal_1").showModal();

  const closeModal = () => {
    document.getElementById("my_modal_1").close();
    setTimeout(() => {
      refetch();
    }, 500);
  };

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

        {showWelcome && guestId && (
          <div className="bg-blue-50 border border-blue-100 text-blue-700 p-4 rounded-lg mb-6">
            <p className="font-medium">👋 Welcome to your dashboard!</p>
            <p className="text-sm mt-1">
              Logged in as a guest. Create your first board to get started.
            </p>
          </div>
        )}
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

        {(isLoading || isRefetching) && (
          <div className="col-span-full flex justify-center items-center h-36">
            <span className="loading loading-bars loading-md"></span>
          </div>
        )}

        {isError && !isLoading && (
          <div className="col-span-full bg-red-50 text-red-600 p-4 rounded-lg border border-red-100">
            <p>Error loading boards. Please try again later.</p>
            <button
              onClick={() => refetch()}
              className="mt-2 text-sm underline hover:text-red-700"
            >
              Retry
            </button>
          </div>
        )}

        {!isLoading && !isRefetching && !isError && data?.length === 0 && (
          <div className="col-span-full text-center p-8 text-slate-500">
            <p>No boards found. </p>
          </div>
        )}

        {!isLoading &&
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
