import { useGuest } from "@/context/guestContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useSaveCardOrder(boardId) {
  const queryClient = useQueryClient();
  const { guestId } = useGuest();

  return useMutation({
    mutationFn: async ({
      cardId,
      sourceListId,
      destinationListId,
      newIndex,
    }) => {
      const headers = guestId ? { "Guest-ID": guestId } : {};

      try {
        console.log("Saving card order with data:", {
          boardId,
          cardId,
          sourceListId,
          destinationListId,
          newIndex,
        });

        const response = await axios.put(
          "/api/card",
          {
            boardId,
            cardId,
            sourceListId,
            destinationListId,
            newIndex,
          },
          { headers }
        );

        console.log("Card order saved successfully:", response.data);
        return response.data;
      } catch (error) {
        console.error(
          "Error saving card order:",
          error.response?.data || error.message || error
        );
        throw error;
      }
    },
    onSuccess: () => {
      console.log("Invalidating board query after saving card order...");
      queryClient.invalidateQueries(["board", boardId]);
    },
    onError: (error) => {
      console.error(
        "Error saving card order in onError:",
        error.response?.data || error.message || error
      );
    },
  });
}
