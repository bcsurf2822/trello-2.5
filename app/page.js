import Login from "./components/Login";
// import { SignupForm } from "./components/SignupFrom";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login");
}
