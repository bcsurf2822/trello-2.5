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
    // Add these for debugging
    isRefetching,
    dataUpdatedAt,
    isFetched 
  } = useFetchBoards();
  
  const [showWelcome, setShowWelcome] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(Date.now());
  
  // Add logging to track board data changes
  useEffect(() => {
    console.log("Board data updated:", {
      boards: data?.length || 0,
      isLoading,
      isError,
      isRefetching,
      dataUpdatedAt: new Date(dataUpdatedAt).toISOString(),
      isFetched
    });
    
    // Update last refreshed time
    if (data && !isLoading && !isRefetching) {
      setLastRefreshed(Date.now());
    }
  }, [data, isLoading, isError, isRefetching, dataUpdatedAt, isFetched]);

  // Show welcome message for new guest users
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
    // Force immediate refetch with a slight delay
    setTimeout(() => {
      console.log("Manually triggering refetch after modal close");
      refetch();
    }, 500);
  };
  
  // Add a manual refresh function for debugging
  const handleManualRefresh = () => {
    console.log("Manual refresh triggered");
    refetch();
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
          
          {/* Add debug info */}
          <div className="text-xs text-slate-400 mt-1">
            {guestId ? (
              <p>Guest ID: {guestId.substring(0, 8)}...</p>
            ) : (
              <p>No user logged in</p>
            )}
            <p>
              Last refreshed: {new Date(lastRefreshed).toLocaleTimeString()}
            </p>
          </div>
        </div>

        {showWelcome && guestId && (
          <div className="bg-blue-50 border border-blue-100 text-blue-700 p-4 rounded-lg mb-6">
            <p className="font-medium">👋 Welcome to your dashboard!</p>
            <p className="text-sm mt-1">
              You're logged in as a guest. Create your first board to get
              started.
            </p>
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <p className="text-slate-600">
            {data?.length > 0
              ? `You have ${data.length} board${data.length === 1 ? "" : "s"}`
              : "Create your first board to get started"}
          </p>
          
          {/* Add debug refresh button */}
          <button 
            onClick={handleManualRefresh}
            disabled={isRefetching}
            className="text-xs bg-slate-100 hover:bg-slate-200 py-1 px-2 rounded text-slate-600"
          >
            {isRefetching ? "Refreshing..." : "Refresh"}
          </button>
        </div>
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

        {/* Loading state */}
        {(isLoading || isRefetching) && (
          <div className="col-span-full flex justify-center items-center h-36">
            <span className="loading loading-bars loading-md"></span>
          </div>
        )}

        {/* Error state */}
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
        
        {/* Empty state */}
        {!isLoading && !isRefetching && !isError && data?.length === 0 && (
          <div className="col-span-full text-center p-8 text-slate-500">
            <p>No boards found. Click "Add New Board" to create your first board.</p>
          </div>
        )}

        {/* Board cards */}
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