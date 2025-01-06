import { useGuest } from "@/context/guestContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetchBoards = () => {
  console.log("Trying to Fetch Boards");
  const { guestId, loading } = useGuest();

  return useQuery({
    queryKey: ["boards", guestId || "authenticated"], // Include a fallback key for authenticated users
    queryFn: async () => {
      console.log("Fetching Boards - Guest ID:", guestId);
      console.log("Fetching Boards - Loading State:", loading);

      const headers = guestId ? { "Guest-ID": guestId } : {};

      const response = await axios.get("/api/boards", { headers });
      console.log("Response in Hook:", response.data);
      return response.data;
    },
    enabled: !loading,
    staleTime: 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });
};
