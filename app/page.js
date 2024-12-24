import ButtonLogout from "@/components/authenticationUI/ButtonLogout";
import Login from "@/components/homeUI/Login";

export default async function Home() {
  return (
    <main>
      <Login />
      <ButtonLogout />
    </main>
  );
}
