"use client";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

const ButtonLogin = ({ session }) => {
  const dashURL = "/dashboard";

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
          {session.user.name ? session.user.name.charAt(0).toUpperCase() : "G"}
        </div>
        <p className="text-slate-700 font-medium">
          {session.user.name || "Guest"}
        </p>
      </div>
    );
  }

  return (
    <button
      onClick={() => {
        signIn("google", { callbackUrl: dashURL });
      }}
      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium rounded-lg shadow-sm transition-all duration-200 hover:shadow"
    >
      <FaGoogle className="text-red-500" size={18} />
      <span>Sign In With Google</span>
    </button>
  );
};

export default ButtonLogin;
