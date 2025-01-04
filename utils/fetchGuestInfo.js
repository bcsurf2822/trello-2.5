import axios from "axios";

const localUrl = process.env.API_BASE_URL;

export const fetchGuestInfo = async (guestId) => {
  try {
    console.log("🚀 Starting fetchGuestInfo...");
    console.log("🔍 GUEST ID passed to fetchGuestInfo:", guestId);

    // Construct the URL for debugging
    const requestUrl = `${localUrl}/api/user`;
    console.log("🌐 API Request URL:", requestUrl);

    // Make the API call
    const response = await axios.get(requestUrl, {
      params: { guestId },
      withCredentials: true,
    });

    console.log("✅ API Response Status:", response.status);
    console.log("📦 API Response Data:", response.data);

    // Return the user data from the response
    return response.data.user;
  } catch (error) {
    // Log detailed error information
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
