"use client";

import DeleteBoardButton from "@/components/dashboardUI/DeleteBoardButton";
import FormNewBoard from "@/components/dashboardUI/FormNewBoard";
import Link from "next/link";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import axiosInstance from "@/utils/axios";
import { fetchBoards } from "@/utils/apiCalls";

export default function DashBoard() {
  const queryClient = useQueryClient();

  // Fetch boards using useQuery
  const {
    data: boards = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["boards"],
    queryFn: fetchBoards,
  });

  // Mutation for deleting a board
  const deleteBoardMutation = useMutation({
    mutationFn: (boardId) => axiosInstance.delete(`/board/${boardId}`),
    onSuccess: () => {
      // Invalidate the query to refresh the data
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });

  const openModal = () => document.getElementById("my_modal_1").showModal();
  const closeModal = () => document.getElementById("my_modal_1").close();

  const handleBoardDelete = (boardId) => {
    deleteBoardMutation.mutate(boardId);
  };

  const handleBoardCreate = (newBoard) => {
    // Optimistically update the UI
    queryClient.setQueryData(["boards"], (oldBoards = []) => [
      ...oldBoards,
      newBoard,
    ]);
  };

  if (isLoading) return <p>Loading boards...</p>;
  if (isError) return <p>Error loading boards. Please try again.</p>;

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
                onDelete={() => handleBoardDelete(board._id)}
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
