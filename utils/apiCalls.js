import axiosInstance from "./axios";

export const fetchBoards = async () => {


  const response = await axiosInstance.get("/boards");
  return response.data;
};