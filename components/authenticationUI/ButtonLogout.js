"use client";
import { useEffect, useState } from "react";
import { useLogoutGuest } from "@/hooks/useLogoutGuest";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const ButtonLogout = ({ guestUser }) => {
  const [guest, setGuest] = useState(guestUser || null); // Manage guest state locally
  const logoutGuest = useLogoutGuest();
  const router = useRouter();

  // Log guest state whenever it changes
  useEffect(() => {
    console.log("Guest state updated:", guest);
  }, [guest]);

  const handleLogout = () => {
    if (guest?._id) {
      logoutGuest.mutate(
        { guestId: guest._id },
        {
          onSuccess: () => {
            console.log(
              "Guest successfully logged out. Resetting guest to null..."
            );
            setGuest(null); // Reset guest to null after successful logout
            router.push("/");
            router.refresh()
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
      className={`btn btn-error font-bold ${
        logoutGuest.isLoading ? "loading" : ""
      }`}
      disabled={logoutGuest.isLoading}
    >
      {logoutGuest.isLoading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default ButtonLogout;
