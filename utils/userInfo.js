import axios from "axios";

const localUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchUserInfo = async (guestId) => {
  try {
    console.log("Fetching user info for guestId:", guestId);

    const response = await axios.get(`${localUrl}/api/user`, {
      params: { guestId },
      withCredentials: true,
    });

    console.log("User Info Response:", response.data);
    return response.data.user;
  } catch (error) {
    console.error(
      "Error fetching user info:",
      error.response?.data || error.message
    );
    return null;
  }
};
