"use client";

import { useGuestLogin } from "@/hooks/useGuestLogin";
import { useRouter } from "next/navigation";

export default function ButtonGuestLogin() {
  const router = useRouter();
  const guestLogin = useGuestLogin();

  const handleGuestLogin = () => {
    guestLogin.mutate(undefined, {
      onSuccess: (guestSession) => {
        console.log("Logged in as guest:", guestSession);
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
        guestLogin.isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={guestLogin.isLoading}
    >
      {guestLogin.isLoading ? "Logging in..." : "Guest"}
    </button>
  );
}
