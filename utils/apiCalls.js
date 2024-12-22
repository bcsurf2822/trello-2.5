import axiosInstance from "./axios";

export const fetchBoards = async () => {
  const response = await axiosInstance.get("/board");
  return response.data; // Ensure this matches the shape of the returned data
};