import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useCreateBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (boardData) => axios.post("/api/boards", boardData),
    onSuccess: (data) => {
      console.log("Board created successfully:", data.data);

      queryClient.setQueryData(["boards"], (oldBoards = []) => [
        ...oldBoards,
        data.data,
      ]);
    },
    onError: (error) => {
      console.error(
        "Error creating board:",
        error.response?.data?.error || error.message
      );
    },
  });
};
