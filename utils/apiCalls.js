import axiosInstance from "./axios";

export const fetchBoards = async (shouldFetch = true) => {
  if (!shouldFetch) {
    return [];
  }

  const response = await axiosInstance.get("/boards");
  return response.data;
};