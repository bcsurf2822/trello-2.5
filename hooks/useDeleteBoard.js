import { useGuest } from "@/context/guestContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();
  const { guestId } = useGuest();

  return useMutation({
    mutationFn: async ({ boardId }) => {
      const headers = guestId ? { "Guest-ID": guestId } : {};

      try {
        const response = await axios.delete("/api/boards", {
          headers,
          data: { boardId },
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
      queryClient.invalidateQueries(["boards", guestId || "authenticated"]);
    },
    onError: (error) => {
      console.error(
        "Error deleting board in onError:",
        error.response?.data || error.message || error
      );
    },
  });
};
