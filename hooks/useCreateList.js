import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useCreateList = (boardId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => {
      return axios.post("/api/list", formData);
    },
    onSuccess: (data) => {
      console.log("List added:", data.data);

      queryClient.invalidateQueries(["board", boardId]);
    },
    onError: (error) => {
      console.error(
        "Error adding list:",
        error.response?.data || error.message
      );
    },
  });
};