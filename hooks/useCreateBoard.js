import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useGuest } from "@/context/guestContext";

export const useCreateBoard = () => {
  const queryClient = useQueryClient();
  const { guestId } = useGuest();
  
  return useMutation({
    mutationFn: async (boardData) => {
      const headers = guestId ? { "Guest-ID": guestId } : {};
      try {
        const response = await axios.post("/api/boards", boardData, {
          headers,
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
    
    // We've removed the onSuccess invalidation since we're handling 
    // cache updates manually in the FormNewBoard component
    
    onError: (error) => {
      console.error(
        "Error creating board in onError:",
        error.response?.data?.error || error.message || error
      );
    },
  });
};