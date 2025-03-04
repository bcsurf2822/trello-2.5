import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useGuest } from "@/context/guestContext";

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();
  const { guestId } = useGuest();
  
  return useMutation({
    mutationFn: async ({ boardId }) => {
      const headers = guestId ? { "Guest-ID": guestId } : {};
      try {
        const response = await axios.delete(`/api/boards/${boardId}`, {
          headers,
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
    
    // We've removed the onSuccess invalidation since we're handling 
    // cache updates manually in the DeleteBoardButton component
    
    onError: (error) => {
      console.error(
        "Error deleting board in onError:",
        error.response?.data?.error || error.message || error
      );
    },
  });
};