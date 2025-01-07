import { useGuest } from "@/context/guestContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useCreateList = (boardId) => {
  const queryClient = useQueryClient();
  const { guestId } = useGuest();

  return useMutation({
    mutationFn: async (formData) => {
      const headers = guestId ? { "Guest-ID": guestId } : {};
      try {
        const response = await axios.post("/api/list", formData, { headers });
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
        "Error adding list in onError:",
        error.response?.data || error.message || error
      );
    },
  });
};
