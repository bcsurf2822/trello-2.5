"use client";
import { useLogoutGuest } from "@/hooks/useLogoutGuest";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const ButtonLogout = ({ guestId }) => {
  const logoutGuest = useLogoutGuest();
  const router = useRouter();

  const handleLogout = () => {
    if (guestId) {
      logoutGuest.mutate(
        { guestId }, 
        {
          onSuccess: () => {
            router.push("/");
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
      className={`btn btn-error font-bold ${logoutGuest.isLoading ? "loading" : ""}`}
      disabled={logoutGuest.isLoading}
    >
      {logoutGuest.isLoading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default ButtonLogout;
