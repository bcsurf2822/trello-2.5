import axios from "axios";

export const logoutGuest = async (guestId) => {
  try {
    const { data } = await axios.delete("/api/auth/guest", {
      data: { guestId },
    });
    console.log(data.message);
  } catch (error) {
    console.error("Error deleting guest user:", error);
    throw error;
  }
};