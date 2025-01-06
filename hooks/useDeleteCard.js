import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteCard = (boardId, listId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cardId) => {
      return axios.delete("/api/card", {
        data: { boardId, listId, cardId },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["board", boardId]);
    },
    onError: (error) => {
      console.error(
        "Error deleting card:",
        error.response?.data || error.message
      );
    },
  });
};
