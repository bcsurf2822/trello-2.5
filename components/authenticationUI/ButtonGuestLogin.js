"use client";
import { useLoginGuest } from "@/hooks/useLoginGuest";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function ButtonGuestLogin() {
  const { mutate, isPending, isSuccess, errorMessage } = useLoginGuest();
  const [showError, setShowError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const handleGuestLogin = () => {
    setShowError(false);
    mutate();

    setRetryCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (errorMessage) {
      setShowError(true);

      const timer = setTimeout(() => setShowError(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const isLoading = isPending || isSuccess;

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleGuestLogin}
        className={`flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg shadow-sm transition-colors duration-200 ${
          isLoading ? "opacity-70 cursor-not-allowed" : "hover:shadow"
        }`}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="ml-2">Loading...</span>
          </div>
        ) : (
          <>
            <FaUser size={14} />
            <span>Continue as Guest</span>
          </>
        )}
      </button>

      {showError && (
        <div className="mt-2 text-sm text-red-500 bg-red-50 p-2 rounded-md border border-red-200 max-w-xs text-center">
          {errorMessage}
          <button
            className="ml-2 underline text-blue-600 hover:text-blue-800"
            onClick={handleGuestLogin}
          >
            Retry
          </button>
        </div>
      )}

      {retryCount >= 2 && showError && (
        <div className="mt-2 text-xs text-gray-600">
          Having trouble?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Sign in with email
          </a>{" "}
          instead.
        </div>
      )}
    </div>
  );
}
