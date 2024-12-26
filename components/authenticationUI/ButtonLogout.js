"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";


const ButtonLogout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false }); 
    router.push("/"); 
  };


  return <button onClick={handleLogout} className="btn btn-error font-bold">Logout</button>;
};

export default ButtonLogout