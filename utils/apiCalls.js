import axiosInstance from "./axios";

export const fetchBoards = async (shouldFetch = true) => {
  if (!shouldFetch) {
    return [];
  }

  const response = await axiosInstance.get("/board");
  return response.data;
};

export const fetchBoard = async (boardId, shouldFetch = true) => {
  if (!shouldFetch || !boardId) {
    return null; 
  }

  const response = await axiosInstance.get(`/board/${boardId}`);
  return response.data;
};


export const addList = async ({ boardId, listName }) => {
  if (!boardId || !listName) {
    throw new Error("Board ID and list name are required to add a list.");
  }

  const response = await axiosInstance.post("/list", {
    boardId,
    name: listName,
  });

  return response.data;
};