"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const FormNewBoard = ({ closeModal, onBoardCreate }) => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/boards", { name });
      setName("");
      toast.success("Board Successfully Created");
      onBoardCreate(data); 
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.message || "Something went wrong";
      console.error(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };

  return (
    <form className="bg-base-100 p-8 rounded-3xl space-y-8">
      {/* TITLE */}
      <p className="font-bold text-lg">Create board</p>
      <button
        onClick={closeModal}
        className="text-gray-200 hover:bg-gray-200 hover:text-black p-1 rounded"
      >
        ✕
      </button>

      {/* FORM */}
      <label className="form-control block mt-4">
        <div className="label">
          <span className="text-md font-bold">Board Title</span>
        </div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter board name"
          className="border-black border rounded mt-1 w-full"
        />
      </label>
      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        type="submit"
        className="btn btn-primary btn-block"
      >
        {isLoading && (
          <span className="loading loading-spinner loading-xs"></span>
        )}
        Submit
      </button>
    </form>
  );
};

export default FormNewBoard;
