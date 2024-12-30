import axios from "axios";

export const fetchUserInfo = async () => {
  try {
    const response = await axios.get("/api/user");
    return response.data.user;
  } catch (error) {
    console.error("Error fetching user info:", error.response?.data || error.message);
    return null;
  }
};