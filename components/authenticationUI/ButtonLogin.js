"use client";
import { signIn } from "next-auth/react";

const ButtonLogin = ({ session }) => {
  const dashURL = "/dashboard";

  if (session) {
    return (
      <p className="text-md text-black font-semibold">
        {" "}
        {session.user.name || "Guest"}
      </p>
    );
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
