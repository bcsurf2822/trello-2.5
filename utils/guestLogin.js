import axios from "axios";

export const loginAsGuest = async () => {
  try {
    console.log("Attempting to log in as a guest...");

    const { data } = await axios.post("/api/auth/guest");

    console.log("Guest session created:", data.guest);

    return data.guest;
  } catch (error) {
    console.error("Error logging in as guest:", error);

    throw new Error(
      error.response?.data?.error ||
        "Failed to log in as a guest. Please try again."
    );
  }
};