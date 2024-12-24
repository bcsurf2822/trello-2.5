"use client";
import { signOut } from "next-auth/react";


const ButtonLogout = () => {
  return <button onClick={() => signOut()} className="btn btn-error font-bold">Logout</button>;
};

export default ButtonLogout