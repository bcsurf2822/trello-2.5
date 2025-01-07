import { useGuest } from "@/context/guestContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteList = (boardId) => {
  const queryClient = useQueryClient();
  const { guestId } = useGuest();

  return useMutation({
    mutationFn: async ({ listId }) => {
      const headers = guestId ? { "Guest-ID": guestId } : {};

      try {
        const response = await axios.delete("/api/list", {
          headers,
          data: { boardId, listId },
        });
        return response.data;
      } catch (error) {
        console.error(
          "Error in mutationFn:",
          error.response?.data || error.message || error
        );
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["board", boardId]);
    },
    onError: (error) => {
      console.error(
        "Error deleting list in onError:",
        error.response?.data || error.message || error
      );
    },
  });
};
