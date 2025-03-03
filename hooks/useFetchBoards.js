import { useGuest } from "@/context/guestContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetchBoards = () => {
  const { guestId, loading } = useGuest();
  
  return useQuery({
    queryKey: ["boards", guestId || "authenticated"],
    queryFn: async () => {
      try {

        console.log("Fetching boards with guestId:", guestId);
        
        if (!guestId ) {
          console.log("No guest ID or authentication - returning empty array");
          return [];
        }
        

        const headers = {};
        
        if (guestId) {
          headers["Guest-ID"] = guestId;
        } else {
     
        }
        
        console.log("Using headers:", headers);
        

        const response = await axios.get("/api/boards", {
          headers,
          timeout: 8000
        });
        
        console.log("API response:", response.status, "Board count:", response.data?.length || 0);
        
        return response.data;
      } catch (error) {
        console.error("Error fetching boards:", error);
      
        if ((error.response && error.response.status === 404) || guestId) {
          console.log("No boards found or guest user, returning empty array");
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