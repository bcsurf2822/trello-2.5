"use client";
import Link from "next/link";
import { useState } from "react";
import ButtonLogin from "../buttons/ButtonLogin";
import { redirect } from "next/navigation";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("vals", e);
    setUsername("");
    setPassword("");
  };

  const handleGuestSignIn = async () => {
    const response = await axios.post("/api/auth/guest");
    if (response.ok) {
      redirect("/dashboard");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center mb-6">
          <h2 className="text-3xl text-white font-bold underline">
            Trello 2.5
          </h2>
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account or
            </h1>

            <div className="flex gap-5 items-center">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Continue as
              </h1>
              <button
                onClick={handleGuestSignIn}
                className="bg-green-300 px-4 py-1 rounded-xl text-gray-950 font-bold"
                href="/dashboard"
              >
                Guest
              </button>
            </div>

            <ButtonLogin />
          </div>
        </div>
      </div>
    </section>
  );
}
