"use client";
import { signOut } from "next-auth/react";

// auto takes away session token using next auth


const ButtonLogout = () => {
  return <button onClick={() => signOut()} className="btn btn-ghost">Logout</button>;
};

export default ButtonLogout