import { useGuest } from "@/context/guestContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef } from "react";

export const useFetchBoards = () => {
  const { guestId, loading } = useGuest();
  
  // Keep track of previous guestId to detect logout
  const prevGuestIdRef = useRef(guestId);
  
  useEffect(() => {
    // If guestId changed from a value to null, a logout probably occurred
    if (prevGuestIdRef.current && !guestId) {
      console.log("Logout detected, disabling board fetching");
    }
    prevGuestIdRef.current = guestId;
  }, [guestId]);
  
  return useQuery({
    queryKey: ["boards", guestId || "authenticated"],
    queryFn: async () => {
      // If no guestId and on the login/root page, don't make the request
      if (!guestId && (window.location.pathname === "/" || window.location.pathname === "/login")) {
        return [];
      }
      
      const headers = guestId ? { "Guest-ID": guestId } : {};
      const response = await axios.get("/api/boards", { headers });
      return response.data;
    },
    // Only enable the query if we're not loading AND either there's a guestId or we're on a dashboard page
    // During logout, this query should be disabled to prevent the 404 error
    enabled: !loading && (!!guestId || (window.location.pathname !== "/" && window.location.pathname.includes("/dashboard"))),
    staleTime: 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });
};