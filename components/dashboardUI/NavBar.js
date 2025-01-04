import ButtonLogin from "../authenticationUI/ButtonLogin";
import { auth } from "@/auth";
import Link from "next/link";
import ButtonLogout from "../authenticationUI/ButtonLogout";
import { fetchGuestInfo } from "@/utils/fetchGuestInfo";
import { cookies } from "next/headers";

export default async function NavBar() {
  const session = await auth();
  const cookieStore = await cookies();
  const guestId = cookieStore.get("guestId")?.value;
  let guestUser = null;
  if (!session && guestId) {
    guestUser = await fetchGuestInfo(guestId);
  }

  console.log("Guest User in Nav", guestUser)


  return (
    <nav className="navbar bg-neutral-300 ">
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

        <Link
          href={"/dashboard"}
          className="text-3xl text-blue-700 font-extrabold flex gap-2 items-center"
        >
          Trello 2.5{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
            />
          </svg>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex"></div>
      <div className="navbar-end flex gap-3 ">
        {guestUser ? (
          <div className="text-sm font-semibold flex justify-center gap-1">
            Logged In As: <span className="font-bold"> {guestUser.name}</span>
          </div>
        ) : (
          <ButtonLogin session={session} />
        )}
        <ButtonLogout guestUser={guestUser} />
      </div>
    </nav>
  );
}
