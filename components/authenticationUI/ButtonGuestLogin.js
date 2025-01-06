"use client";

import { useGuestLogin } from "@/hooks/useGuestLogin";
import { useRouter } from "next/navigation";

export default function ButtonGuestLogin() {
  const router = useRouter();
  const { mutate, isPending } = useGuestLogin();

  const handleGuestLogin = () => {
    console.log("Guest login initiated.");
    mutate(undefined, {
      onSuccess: () => {
        router.push("/dashboard");
      },
      onError: (error) => {
        alert(error.message || "Failed to log in as guest.");
        console.error("Login failed:", error);
      },
    });
  };

  return (
    <button
      onClick={handleGuestLogin}
      className={`bg-green-300 px-4 py-1 rounded-xl text-gray-950 font-bold ${
        isPending ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={isPending}
    >
      {isPending ? (
        <span className="loading loading-spinner text-neutral"></span>
      ) : (
        "Guest"
      )}
    </button>
  );
}
