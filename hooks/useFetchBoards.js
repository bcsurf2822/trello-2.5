import { useGuest } from "@/context/guestContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetchBoards = () => {
  const { guestId, loading } = useGuest();

  return useQuery({
    queryKey: ["boards", guestId],
    queryFn: async () => {
      if (loading || !guestId) {
        return [];
      }

      const response = await axios.get("/api/boards", {
        headers: { "Guest-ID": guestId || "" },
      });
      return response.data;
    },
    enabled: !loading && !!guestId,
    staleTime: 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });
};
