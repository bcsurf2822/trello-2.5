

import ButtonLogout from "../components/buttons/ButtonLogout";
import { auth } from "../auth";
import ButtonLogin from "../components/buttons/ButtonLogin";

import { redirect } from "next/navigation";
import Login from "@/components/homeUI/Login";

export default async function Home() {
  const session = await auth();

  console.log("Auth", auth)

  return (
    <main >
      {/* <ButtonLogin session={session} />; */}
      <Login />
    </main>
  );
}
