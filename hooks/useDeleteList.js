import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteList = (boardId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ listId }) => {
      return axios.delete("/api/list", { data: { boardId, listId } });
    },
    onSuccess: () => {
  


      queryClient.invalidateQueries(["board", boardId]);
    },
    onError: (error) => {
      console.error(
        "Error deleting list:",
        error.response?.data || error.message
      );
    },
  });
};
