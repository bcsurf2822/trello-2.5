"use client";

import { useLoginGuest } from "@/hooks/useLoginGuest";

export default function ButtonGuestLogin() {
  const { mutate, isPending, isSuccess } = useLoginGuest();

  const handleGuestLogin = () => {
    mutate();
  };

  const isLoading = isPending || isSuccess;

  return (
    <button
      onClick={handleGuestLogin}
      className={`bg-green-300 px-4 py-1 rounded-xl text-gray-950 font-bold ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="loading loading-spinner text-neutral"></span>
      ) : (
        "Guest"
      )}
    </button>
  );
}
