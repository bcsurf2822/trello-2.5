import axios from "axios";

const baseURL = process.env.API_BASE_URL || "http://localhost:3000";

export const loginAsGuest = async () => {
  try {
    console.log("Logging in as guest helper function starting");
    // good to here
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
