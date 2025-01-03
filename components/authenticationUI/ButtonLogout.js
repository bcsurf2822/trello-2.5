'use client'
import { useState } from "react";
import { logoutGuest } from "@/utils/guestLogout";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const ButtonLogout = ({ guestUser }) => {
  const [isLoading, setIsLoading] = useState(false); 
  const router = useRouter();

  const handleLogout = async () => {
    console.log("Initiating logout process...");
    if (guestUser) {
      setIsLoading(true);
      try {
        console.log("Logging out guest user:", guestUser);
        await logoutGuest(guestUser._id);
        console.log("Successfully logged out guest user:", guestUser);

        router.push("/");
      } catch (error) {
        console.error("Failed to log out guest user:", error);
      } finally {
        setIsLoading(false); 
      }
    } else {
      console.log("No guest user found. Logging out authenticated user.");
      signOut({ callbackUrl: "/" });
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={`btn btn-error font-bold ${isLoading ? "loading" : ""}`}
      disabled={isLoading} // Disable button while loading
    >
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default ButtonLogout;
