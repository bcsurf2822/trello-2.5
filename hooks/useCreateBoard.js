import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useGuest } from "@/context/guestContext";

export const useCreateBoard = () => {
  const queryClient = useQueryClient();
  const { guestId, isGuest } = useGuest();

  return useMutation({
    mutationFn: async (boardData) => {
      if (!boardData.name || boardData.name.trim() === "") {
        throw new Error("Board name is required");
      }

      const headers = {};

      if (guestId) {
        headers["Guest-ID"] = guestId;

        headers["guestId"] = guestId;
      }

      try {
        if (isGuest && !guestId) {
          console.error("Guest mode active but no guestId available");
          throw new Error("Guest ID not found. Please try logging in again.");
        }

        const response = await axios.post("/api/boards", boardData, {
          headers,
          timeout: 8000,
        });

        console.log("Board created successfully:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error creating board:", {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          headers: error.response?.headers,
          message: error.message,
          isGuestMode: isGuest,
          guestIdPresent: !!guestId,
        });

        if (error.response?.status === 401) {
          throw new Error(
            "Authentication required. Your guest session may have expired."
          );
        }

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
        (oldData = []) => {
          return [...oldData, data];
        }
      );
    },

    onError: (error) => {
      console.error("Board creation error (onError):", error.message);
    },
  });
};
