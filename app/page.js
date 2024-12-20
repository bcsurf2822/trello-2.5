

import ButtonLogout from "../components/buttons/ButtonLogout";
import { auth } from "../auth";
import ButtonLogin from "../components/buttons/ButtonLogin";

import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  console.log("Auth", auth)

  return (
    <div className="w-28 h-60 bg-green-900">
      <ButtonLogin session={session} />;
    </div>
  );
}
