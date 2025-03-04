import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useLogoutGuest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ guestId }) => {
      try {
        const response = await axios.delete("/api/auth/guest", {
          data: { guestId },
        });
        return response.data;
      } catch (error) {
        console.error("Error in API call:", error.response || error.message);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.setQueryData(["boards", "authenticated"], []);

      queryClient.removeQueries({ queryKey: ["boards"] });

      queryClient.invalidateQueries(["guestUser"]);
    },
    onError: (error) => {
      console.error(
        "Error during guest logout:",
        error.response?.data || error.message || error
      );
    },
  });
};
