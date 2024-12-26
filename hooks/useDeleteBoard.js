import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (boardId) => axiosInstance.delete(`/board/${boardId}`),
    onSuccess: (data, variables) => {

      queryClient.setQueryData(["boards"], (oldBoards = []) =>
        oldBoards.filter((board) => board._id !== variables)
      );
    },
    onSettled: () => {

      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
    onError: (error) => {
      console.error(
        "Error deleting board:",
        error.response?.data || error.message
      );
    },
  });
};
