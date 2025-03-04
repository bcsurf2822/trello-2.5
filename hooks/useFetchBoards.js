import { useGuest } from "@/context/guestContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef } from "react";

export const useFetchBoards = () => {
  const { guestId, loading } = useGuest();

  const prevGuestIdRef = useRef(guestId);

  useEffect(() => {
    if (prevGuestIdRef.current && !guestId) {
      console.log("Logout detected, disabling board fetching");
    }
    prevGuestIdRef.current = guestId;
  }, [guestId]);

  return useQuery({
    queryKey: ["boards", guestId || "authenticated"],
    queryFn: async () => {
      if (
        !guestId &&
        (window.location.pathname === "/" ||
          window.location.pathname === "/login")
      ) {
        return [];
      }

      const headers = guestId ? { "Guest-ID": guestId } : {};
      const response = await axios.get("/api/boards", { headers });
      return response.data;
    },

    enabled:
      !loading &&
      (!!guestId ||
        (window.location.pathname !== "/" &&
          window.location.pathname.includes("/dashboard"))),
    staleTime: 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });
};
