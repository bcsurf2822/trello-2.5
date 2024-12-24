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

  const handleClose = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <form className="bg-base-100 p-8 rounded-3xl space-y-8">
      {/* TITLE */}
      <div className="flex justify-between">
        <p className="font-bold text-lg">Create board</p>
        <button
          onClick={handleClose}
          className="text-red-500 bg-gray-200 hover:bg-gray-300 font-bold p-1 rounded"
        >
          ✕
        </button>
      </div>

      {/* FORM */}
      <label className="form-control block mt-4">
        <div className="label flex flex-col items-start">
          <span className="text-md font-bold">Title</span>
        </div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter board name"
          className="border-black border rounded mt-1 pl-1 w-full"
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
