"use client";
import axios from "axios";
import { useState } from "react";

export default function AddList({ boardId }) {
  const [listName, setListName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setListName(e.target.value);
  };

  const handleSubmit = async () => {
    if (listName.trim() === "") return;

    setIsLoading(true);
    try {
      const response = await axios.post("/api/list", {
        boardId,
        name: listName,
      });
      console.log("List added:", response.data);

      // Optionally refresh or update lists in parent component here
    } catch (error) {
      console.error(
        "Error adding list:",
        error.response?.data || error.message
      );
    } finally {
      setIsLoading(false);
      setListName("");
    }
  };

  return (
    <div className="w-1/4 bg-neutral-100 py-2 rounded-lg flex-shrink-0 flex flex-col items-center gap-2 px-4">
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-sm w-full max-w-xs"
        value={listName}
        onChange={handleInputChange}
      />
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="btn btn-primary w-full"
      >
      {isLoading ? "Adding..." : "Add List"}
      </button>
    </div>
  );
}
