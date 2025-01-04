import axios from "axios";

const localUrl = process.env.API_BASE_URL;

export const fetchGuestInfo = async (guestId) => {
  try {

    const requestUrl = `${localUrl}/api/user`;

    const response = await axios.get(requestUrl, {
      params: { guestId },
      withCredentials: true,
    });




    return response.data.user;
  } catch (error) {
    console.error("❌ Error in fetchGuestInfo:");
    if (error.response) {
      console.error("🌐 Response Status:", error.response.status);
      console.error("📦 Response Data:", error.response.data);
    } else {
      console.error("⚠️ Error Message:", error.message);
    }
    return null;
  }
};
