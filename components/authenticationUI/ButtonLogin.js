"use client";
import { useAuth } from "@/context/AuthContext";
import { signIn } from "next-auth/react";


const ButtonLogin = () => {
  const dashURL = "/dashboard";

  const {authenticatedSession} = useAuth()
  console.log("SeshInfo", authenticatedSession)



  if (authenticatedSession) {
    return <p className="text-md text-black font-semibold"> {authenticatedSession.name}</p>;
  }

  return (
    <button
      onClick={() => {
        signIn(undefined, { callbackUrl: dashURL });
      }}
      className="btn btn-primary "
    >
      Sign In With Google
    </button>
  );
};

export default ButtonLogin;
