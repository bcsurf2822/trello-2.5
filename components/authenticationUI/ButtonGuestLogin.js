"use client";

import { loginAsGuest } from "@/utils/guestLogin";

import { useRouter } from "next/navigation";

export default function ButtonGuestLogin() {
  const router = useRouter();

  const handleGuestLogin = async () => {
    try {
      console.log("Guest Button Pressed")
      // fail somewhere here in login as guest
      const guestSession = await loginAsGuest();
      console.log("Logged in as guest:", guestSession);

      router.push("/dashboard")
    } catch (e) {
      alert(e.message);
    }
  };
  return (
    <button
      onClick={handleGuestLogin}
      className="bg-green-300 px-4 py-1 rounded-xl text-gray-950 font-bold"
      href="/dashboard"
    >
      Guest
    </button>
  );
}
