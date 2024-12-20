"use client";
import Link from "next/link";
// pulling from "next-auth" package to prevent API key from being exposed
import { signIn } from "next-auth/react";

const ButtonLogin = ({ session }) => {
  const dashURL = "/dashboard"

  if (session) {
    return (
      <Link
        // using conditional and ternary to make button look different based on props passed
        className="btn btn-primary"
        href={dashURL}
      >
        Welcome back {session.user.name || "user"}
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
      Get Started
    </button>
  );
};

export default ButtonLogin;
