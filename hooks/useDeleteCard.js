import { useGuest } from "@/context/guestContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteCard = (boardId, listId) => {
  const queryClient = useQueryClient();
  const { guestId } = useGuest();

  return useMutation({
    mutationFn: async (cardId) => {
      const headers = guestId ? { "Guest-ID": guestId } : {};

      try {
        console.log("Deleting card with data:", { boardId, listId, cardId });
        const response = await axios.delete("/api/card", {
          headers,
          data: { boardId, listId, cardId },
        });
        console.log("Card deleted successfully:", response.data);
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
      console.log("Mutation onSuccess. Invalidating board query...");
      queryClient.invalidateQueries(["board", boardId]);
    },
    onError: (error) => {
      console.error(
        "Error deleting card in onError:",
        error.response?.data || error.message || error
      );
    },
  });
};
