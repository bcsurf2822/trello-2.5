"use client";
import { signOut } from "next-auth/react";


const ButtonLogout = () => {
  const handleLogout = () => {
    signOut({ callbackUrl: '/' }); // Redirects the user to "/" after signing out
  };

  return (
    <button onClick={handleLogout} className="btn btn-error font-bold">
      Logout
    </button>
  );
};

export default ButtonLogout;