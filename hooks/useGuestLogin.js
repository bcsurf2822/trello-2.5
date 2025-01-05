import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useGuestLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      try {
        const { data } = await axios.post("/api/auth/guest");
        return data.guest;
      } catch (error) {
        console.error("Error logging in as guest:", error);
        throw new Error(
          error.response?.data?.error ||
            "Failed to log in as a guest. Please try again."
        );
      }
    },
    onSuccess: (guest) => {
      queryClient.setQueryData(["guestUser"], guest);
    },
    onError: (error) => {
      console.error(
        "Error during guest login:",
        error.response?.data || error.message || error
      );
    },
  });
};
