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

  return (
    <nav className="bg-gradient-to-r from-slate-50 to-slate-100 shadow-md px-4 py-2 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="dropdown lg:hidden mr-2">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle hover:bg-slate-200"
            >
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

          <Link href={"/dashboard"} className="flex items-center gap-2 group">
            <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-blue-900 transition duration-300">
              Trello 2.5
            </span>
            <div className="p-1.5 bg-blue-600 rounded-lg shadow-md group-hover:bg-blue-700 transition duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                />
              </svg>
            </div>
          </Link>
        </div>

        <div className="hidden lg:flex"></div>

        <div className="flex items-center gap-4">
          {guestUser ? (
            <div className="flex items-center bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-200">
              <span className="text-sm text-slate-500 mr-1.5">
                Logged in as:
              </span>
              <span className="text-sm font-bold text-slate-700">
                {guestUser.email}
              </span>
            </div>
          ) : (
            <ButtonLogin session={session} />
          )}
          <ButtonLogout guestUser={guestUser} />
        </div>
      </div>
    </nav>
  );
}
