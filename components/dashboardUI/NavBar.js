import React from "react";
import ButtonLogin from "../authenticationUI/ButtonLogin";
import { auth } from "@/auth";
import Link from "next/link";
import ButtonLogout from "../authenticationUI/ButtonLogout";

export default async function NavBar() {
  const session = await auth();
  return (
    <nav className="navbar bg-green-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

        </div>
        <Link href={"/dashboard"} className="btn btn-ghost text-2xl text-primary font-bold">Trello 2.5</Link>
      </div>
      <div className="navbar-center hidden lg:flex">

      </div>
      <div className="navbar-end flex gap-3 ">
        <ButtonLogin session={session} />
        <ButtonLogout />
      </div>
    </nav>
  );
}
