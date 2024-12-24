import axios from "axios";

export const loginAsGuest = async () => {
  try {
    const response = await axios.post("/api/auth/guest");
    console.log(response.data.message); 
  } catch (error) {
    console.error("Guest login failed:", error);
    throw error;
  }
};