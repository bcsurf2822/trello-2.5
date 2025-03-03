import ButtonLogin from "../authenticationUI/ButtonLogin";
import ButtonGuestLogin from "../authenticationUI/ButtonGuestLogin";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 mx-auto min-h-screen">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-2.5 bg-blue-600 rounded-lg shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="white"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Trello 2.5
          </h1>
        </div>
        <p className="text-slate-600 max-w-md">
          Organize your projects and tasks
        </p>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-700"></div>

          <div className="p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
              Welcome Back
            </h2>

            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <p className="text-sm text-slate-500 mb-2">
                  Sign in with your account
                </p>
                <div className="w-3/4 flex justify-center">
                  <ButtonLogin />
                </div>
              </div>

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-4 text-slate-400 text-sm">
                  or
                </span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-3/4 flex justify-center">
                  <ButtonGuestLogin />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
