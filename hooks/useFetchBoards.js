import { useGuest } from "@/context/guestContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetchBoards = () => {
    const {guestId} = useGuest()
    console.log("Guest ID in Hook", guestId)

  return useQuery({
    queryKey: ["boards"],
    queryFn: async () => {
      const response = await axios.get("/api/boards");
      return response.data;
    },
    staleTime: 60 * 1000, 
    cacheTime: 5 * 60 * 1000, 
  });
};
