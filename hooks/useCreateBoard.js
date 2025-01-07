import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useGuest } from "@/context/guestContext";

export const useCreateBoard = () => {
  const queryClient = useQueryClient();
  const { guestId } = useGuest(); // Get the guestId from the context

  return useMutation({
    mutationFn: async (boardData) => {
      console.log("Attempting to create board with data:", boardData);

      const headers = guestId ? { "Guest-ID": guestId } : {}; // Include Guest-ID if guestId is present

      try {
        const response = await axios.post("/api/boards", boardData, {
          headers,
        });
        console.log("Board successfully created. Response:", response.data);
        return response.data;
      } catch (error) {
        console.error(
          "Error in mutationFn:",
          error.response?.data || error.message || error
        );
        throw error; // Rethrow the error to ensure onError is called
      }
    },
    onSuccess: (data) => {
      console.log("Mutation onSuccess. Invalidating boards query...");
      queryClient.invalidateQueries(["boards", guestId || "authenticated"]); // Include guestId in query key
      console.log("Query invalidation triggered.");
    },
    onError: (error) => {
      console.error(
        "Error creating board in onError:",
        error.response?.data?.error || error.message || error
      );
    },
  });
};
