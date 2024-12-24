import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import AddCardButton from "./AddCardButton";
import Cards from "./Cards";

export default function List({ list, boardId }) {
  const listId = list._id;

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: ({ boardId, listId }) => {
      return axios.delete("/api/list", { data: { boardId, listId } });
    },
    onSuccess: () => {
      console.log("List deleted successfully");

      queryClient.invalidateQueries(["board", list.boardId]);
    },
    onError: (error) => {
      console.error(
        "Error deleting list:",
        error.response?.data || error.message
      );
    },
  });

  const handleDeleteList = () => {
    deleteMutation.mutate({ boardId: boardId, listId: listId });
  };

  return (
    <div className="bg-neutral-100 w-1/4 pb-2 rounded-lg">
      <div className="flex justify-between items-center py-2 px-1">
        <h2 className="underline font-semibold pl-2">{list.name}</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 hover:text-red-500 cursor-pointer"
          onClick={handleDeleteList}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </div>

      {list.cards.length > 0 && (
        <ul className="flex flex-col gap-1">
          {list.cards.map((card) => (
            <Cards
              key={card._id}
              card={card}
              boardId={boardId}
              listId={list._id}
            />
          ))}
        </ul>
      )}

      <div className="mt-2">
        <AddCardButton boardId={boardId} listId={listId} />
      </div>
    </div>
  );
}
