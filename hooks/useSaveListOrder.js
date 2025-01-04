import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useSaveOrder = (boardId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newOrder) => {
      return axios.put(`/api/list`, {
        boardId,
        lists: newOrder,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["board", boardId]);
    },
    onError: (error) => {
      console.error(
        "Error saving list order:",
        error.response?.data || error.message
      );
    },
  });
};