import { useGuest } from "@/context/guestContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useCreateCard = (boardId) => {
  const queryClient = useQueryClient();
  const { guestId } = useGuest();

  return useMutation({
    mutationFn: async (formData) => {
      const headers = guestId ? { "Guest-ID": guestId } : {};
      try {
        console.log("Creating card with data:", formData, "Headers:", headers);
        const response = await axios.post("/api/card", formData, { headers });
        console.log("Card created successfully:", response.data);
        return response.data;
      } catch (error) {
        console.error(
          "Error in mutationFn:",
          error.response?.data || error.message || error
        );
        throw error; // Rethrow to trigger onError
      }
    },
    onSuccess: () => {
      console.log("Mutation successful. Invalidating board query...");
      queryClient.invalidateQueries(["board", boardId]); // Refresh the board data
    },
    onError: (error) => {
      console.error(
        "Error adding card in onError:",
        error.response?.data || error.message || error
      );
    },
  });
};
