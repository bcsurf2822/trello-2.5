"use client";
import { logoutGuest } from "@/utils/guestLogout";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const ButtonLogout = ({ guestUser }) => {
  const router = useRouter();
  const handleLogout = async () => {
    if (guestUser) {
      try {
        await logoutGuest(guestUser._id); 
        console.log("Guest user logged out successfully");
        router.push("/");
      } catch (error) {
        console.error("Failed to log out guest user:", error);
      }
    } else {
     
      signOut({ callbackUrl: "/" });
    }
  };

  return (
    <button onClick={handleLogout} className="btn btn-error font-bold">
      Logout
    </button>
  );
};

export default ButtonLogout;
