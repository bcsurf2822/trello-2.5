import { useQuery } from "react-query";
import axios from "axios";

const fetchUserInfo = async () => {
  const response = await axios.get("/api/user");
  return response.data.user;
};

export const useUserInfo = () => {
  return useQuery("userInfo", fetchUserInfo, {
    staleTime: 60000,
    cacheTime: 300000,
    retry: 2,
    onError: (error) => {
      console.error(
        "Error fetching user info:",
        error.response?.data || error.message
      );
    },
  });
};
