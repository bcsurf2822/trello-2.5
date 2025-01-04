"use client";
import { useState } from "react";
import { useLogoutGuest } from "@/hooks/useLogoutGuest";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const ButtonLogout = ({ guestUser }) => {
  const [guest, setGuest] = useState(guestUser || null);
  const logoutGuest = useLogoutGuest();
  const router = useRouter();



  const handleLogout = () => {
    if (guest?._id) {
      logoutGuest.mutate(
        { guestId: guest._id },
        {
          onSuccess: () => {
            console.log(
              "Guest successfully logged out. Resetting guest to null..."
            );
            setGuest(null); 
            router.push("/");
            router.refresh()
          },
        }
      );
    } else {
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
