"use client";
import { signIn } from "next-auth/react";


const ButtonLogin = ({ authenticatedSession }) => {
  const dashURL = "/dashboard";



  if (authenticatedSession) {
    return <p className="text-md text-black font-semibold"> {authenticatedSession.user.name || "Guest"}</p>;
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
