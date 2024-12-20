"use client";
import Link from "next/link";
// pulling from "next-auth" package to prevent API key from being exposed
import { signIn } from "next-auth/react";

const ButtonLogin = ({ session }) => {
  const dashURL = "/dashboard"

  if (session) {
    return (
      <Link

        className="btn btn-primary"
        href={dashURL}
      >
        Welcome Back {session.user.name || "user"}
        {/* {children} */}
      </Link>
    );
  }

  return (
    <button
      onClick={() => {
        signIn(undefined, { callbackUrl: 
         dashURL});
      }}
      className="btn btn-primary "
    >
    Sign In With Google
    </button>
  );
};

export default ButtonLogin;
