import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useGuest } from "@/context/guestContext";

export const useCreateBoard = () => {
  const queryClient = useQueryClient();
  const { guestId } = useGuest();
  
  return useMutation({
    mutationFn: async (boardData) => {
      if (!boardData.name || boardData.name.trim() === '') {
        throw new Error("Board name is required");
      }
      

      const headers = guestId ? { "Guest-ID": guestId } : {};
      

      console.log("Creating board with guest ID:", guestId);
      console.log("Board data:", boardData);
      
      try {
        const response = await axios.post("/api/boards", boardData, {
          headers,
          timeout: 8000 
        });
        
        console.log("Board created successfully:", response.data);
        return response.data;
      } catch (error) {

        console.error("Error creating board:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        });
        

        throw new Error(
          error.response?.data?.error || 
          "Failed to create board. Please try again."
        );
      }
    },
    
    onSuccess: (data) => {

      queryClient.invalidateQueries(["boards", guestId || "authenticated"]);

      queryClient.setQueryData(
        ["boards", guestId || "authenticated"], 
        (oldData = []) => [...oldData, data]
      );
      
      console.log("Board cache updated after creation");
    },
    
    onError: (error) => {
      console.error("Error creating board:", error.message);

    },
  });
};