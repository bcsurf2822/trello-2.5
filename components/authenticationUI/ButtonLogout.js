"use client";
import { useAuth } from "@/context/AuthContext";
import { logoutGuest } from "@/utils/guestLogout";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const ButtonLogout = () =>{
  const router = useRouter();
const {authenticatedSession, isLoading} = useAuth()
  const handleLogout = async () => {
    try {
      if (authenticatedSession?.isGuest) {
        await logoutGuest();
      } else {
        await signOut({ redirect: false });
      }
      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <button onClick={handleLogout} className="btn btn-error font-bold">
      Logout
    </button>
  );
};

export default ButtonLogout;
