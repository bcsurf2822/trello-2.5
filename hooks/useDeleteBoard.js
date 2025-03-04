import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useGuest } from "@/context/guestContext";

export const useDeleteBoard = () => {
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
          "Error in delete mutationFn:",
          error.response?.data || error.message || error
        );
        throw error;
      }
    },

    onError: (error) => {
      console.error(
        "Error deleting board in onError:",
        error.response?.data?.error || error.message || error
      );
    },
  });
};
