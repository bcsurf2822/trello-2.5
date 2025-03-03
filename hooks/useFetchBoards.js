import { useGuest } from "@/context/guestContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetchBoards = () => {
  const { guestId, loading } = useGuest();
  
  return useQuery({
    // Use a consistent key pattern
    queryKey: ["boards", guestId || "no-user"],
    queryFn: async () => {
      try {
        // If no guestId, return empty array early
        if (!guestId) {
          console.log("No user ID available, returning empty boards array");
          return [];
        }
        
        // Set headers for guest users
        const headers = { "Guest-ID": guestId };
        
        console.log("Fetching boards with headers:", headers);
        
        // Make API call
        const response = await axios.get("/api/boards", {
          headers,
          timeout: 8000,
        });
        
        console.log(
          "Boards fetched successfully:",
          response.status,
          "Count:",
          response.data?.length || 0
        );
        
        return response.data;
      } catch (error) {
        console.error("Error fetching boards:", error);
        
        // Return empty array for 404s or guest users
        if ((error.response && error.response.status === 404) || guestId) {
          return [];
        }
        
        throw error;
      }
    },
    enabled: !loading,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    placeholderData: [],
  });
};