import axios from "axios";

export const fetchUserInfo = async () => {
  try {
    const baseURL = process.env.API_BASE_URL || "http://localhost:3000";
    const response = await axios.get(`${baseURL}/api/user`);
    console.log("Res", response);
    return response.data.user; 
  } catch (error) {
    console.error(
      "Error fetching user info:",
      error.response?.data || error.message
    );
    return null;
  }
};