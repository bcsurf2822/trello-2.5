import axios from "axios";

const localUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchUserInfo = async (guestId) => {
  try {
    const response = await axios.get(`${localUrl}/api/user`, {
      params: { guestId },
      withCredentials: true,
    });
    return response.data.user;
  } catch (error) {
    console.error(
      "Error fetching user info:",
      error.response?.data || error.message
    );
    return null;
  }
};
