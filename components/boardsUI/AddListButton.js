"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function AddList({ boardId }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData) => {
      return axios.post("/api/list", formData);
    },
    onSuccess: (data) => {
      console.log("List added:", data.data);
      queryClient.invalidateQueries(["lists", boardId]);
    },
    onError: (error) => {
      console.error(
        "Error adding list:",
        error.response?.data || error.message
      );
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();

    const formData = {
      boardId,
      name: event.target.elements.listName.value.trim(),
    };

    if (formData.name === "") return;

    mutation.mutate(formData);
    event.target.reset();
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-1/4 bg-neutral-100 py-2 rounded-lg flex-shrink-0 flex flex-col items-center gap-2 px-4"
    >
      <input
        type="text"
        name="listName"
        placeholder="Type here"
        className="input input-bordered input-sm w-full max-w-xs"
      />
      <button
        type="submit"
        disabled={mutation.isLoading}
        className="btn btn-primary w-full"
      >
        {mutation.isLoading ? "Adding..." : "Add List"}
      </button>
    </form>
  );
}
