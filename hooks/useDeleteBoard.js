import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ boardId }) => {
      try {
        const response = await axios.delete("/api/boards", {
          data: { boardId },
        });
        return response.data;
      } catch (error) {
        console.error("Error in API call:", error.response || error.message);
        throw error;
      }
    },
    onSuccess: () => {
      console.log("Board deleted successfully");
      queryClient.invalidateQueries(["boards"]);
    },
    onError: (error) => {
      console.error(
        "Error deleting board:",
        error.response?.data || error.message || error
      );
    },
  });
};
