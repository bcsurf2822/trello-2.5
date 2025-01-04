"use client";
import { useState } from "react";
import { useLogoutGuest } from "@/hooks/useLogoutGuest";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const ButtonLogout = ({ guestUser }) => {
  const [guestId, setGuestId] = useState(guestUser?._id || null); // Manage guestId state locally
  const logoutGuest = useLogoutGuest();
  const router = useRouter();

  console.log("GuestUser", guestUser); // Log the full guestUser object
  console.log("Current guestId (state):", guestId); // Log the guestId state

  const handleLogout = () => {
    if (guestId) {
      logoutGuest.mutate(
        { guestId }, 
        {
          onSuccess: () => {
            console.log("Guest successfully logged out. Resetting guestId to null...");
            setGuestId(null); // Reset guestId to null after successful logout
            router.push("/");
          },
        }
      );
    } else {
      console.log("No guestId found, signing out user session.");
      signOut({ callbackUrl: "/" });
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={`btn btn-error font-bold ${logoutGuest.isLoading ? "loading" : ""}`}
      disabled={logoutGuest.isLoading}
    >
      {logoutGuest.isLoading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default ButtonLogout;
