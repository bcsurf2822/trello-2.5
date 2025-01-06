import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useBoard = (boardId) => {
  return useQuery({
    queryKey: ["board", boardId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/board/${boardId}`);
      return data;
    },
    enabled: !!boardId,
  });
};
