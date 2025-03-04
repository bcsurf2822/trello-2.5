import { useGuest } from "@/context/guestContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetchBoards = () => {
  const { guestId, loading } = useGuest();

  return useQuery({
    queryKey: ["boards", guestId || "authenticated"],
    queryFn: async () => {
      const headers = guestId ? { "Guest-ID": guestId } : {};

      const response = await axios.get("/api/boards", { headers });
      return response.data;
    },
    enabled: !loading,
    staleTime: 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });
};