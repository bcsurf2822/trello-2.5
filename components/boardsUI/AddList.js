"use client";
import { useCreateList } from "@/hooks/useCreateList";

import { useState } from "react";

export default function AddList({ boardId }) {
  const [listName, setListName] = useState("");
  const createList = useCreateList(boardId);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (listName.trim() === "") return;

    const formData = {
      boardId,
      name: listName.trim(),
    };

    createList.mutate(formData, {
      onSuccess: () => {
        setListName("");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[20vw] bg-neutral-100 py-2 rounded-lg flex-shrink-0 flex flex-col items-center justify-center gap-2 px-4"
    >
      <input
        type="text"
        name="listName"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        placeholder="List Name"
        className="input input-bordered input-sm w-full max-w-xs"
      />
      <button
        type="submit"
        disabled={createList.isLoading}
        className="btn btn-primary w-1/2"
      >
        {createList.isLoading ? "Adding..." : "Add List"}
      </button>
    </form>
  );
}
