"use client";
import { useState } from "react";
import { useLogoutGuest } from "@/hooks/useLogoutGuest";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const ButtonLogout = ({ guestUser }) => {
  const [guest, setGuest] = useState(guestUser|| null); // Manage guestId state locally
  const logoutGuest = useLogoutGuest();
  const router = useRouter();

  console.log("GuestUser", guest); // Log the full guestUser object


  const handleLogout = () => {
    if (guest._id) {
      logoutGuest.mutate(
        { guestId: guestUser._id },
        {
          onSuccess: () => {
            console.log("Guest successfully logged out. Resetting guestId to null...");
            setGuest(null); // Reset guestId to null after successful logout
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
