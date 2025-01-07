import { auth } from "@/auth";
import Footer from "@/components/dashboardUI/Footer";
import NavBar from "@/components/dashboardUI/NavBar";
import { GuestProvider } from "@/context/guestContext";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FaLinkedin } from "react-icons/fa";

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
        <div className="min-h-screen flex flex-col">
          <NavBar />
          <div className="flex-grow">{children}</div>
          <Footer />
        </div>
      </GuestProvider>
    </>
  );
}
