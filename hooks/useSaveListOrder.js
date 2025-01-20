import { useGuest } from "@/context/guestContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useSaveOrder = (boardId) => {
  const queryClient = useQueryClient();
  const { guestId } = useGuest();

  return useMutation({
    mutationFn: async (newOrder) => {
      const headers = guestId ? { "Guest-ID": guestId } : {};
      try {
        console.log("Saving list order with data:", { boardId, newOrder });
        const response = await axios.put(
          `/api/list`,
          {
            boardId,
            lists: newOrder,
          },
          { headers }
        );
        console.log("List order saved successfully:", response.data);
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
        "Error saving list order in onError:",
        error.response?.data || error.message || error
      );
    },
  });
};
