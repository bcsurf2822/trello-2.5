import { auth } from "@/auth";
import NavBar from "@/components/dashboardUI/NavBar";
import { GuestProvider } from "@/context/guestContext";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  const session = await auth();

  const cookieStore = await cookies();
  const guestId = cookieStore.get("guestId")?.value;

  if (!session && !guestId) {
    console.log("Redirecting: No session or guest ID");
    redirect("/");
  }
  return (
    <>
      <GuestProvider>
        <NavBar />
        {children}
      </GuestProvider>
    </>
  );
}
