import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useCreateCard = (boardId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => {
      return axios.post("/api/card", formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["board", boardId]);
    },
    onError: (error) => {
      console.error(
        "Error adding card:",
        error.response?.data || error.message
      );
    },
  });
};
