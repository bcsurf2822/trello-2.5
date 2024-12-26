import { auth } from "@/auth";
import { cookies } from "next/headers";

export async function getSessionInfo(req) {
  const cookieStore = cookies();

  try {
    const guestSessionCookie = await cookieStore.get("guestSession");

    if (guestSessionCookie) {
      try {
        const guestSession = JSON.parse(guestSessionCookie.value);
        return { isGuest: true, user: guestSession };
      } catch (error) {
        console.error("Invalid guest session cookie:", error);
      }
    }

    const session = await auth();
    if (session) {
      return { isGuest: false, user: session.user };
    }
  } catch (error) {
    console.error("Error retrieving session or cookies:", error);
  }

  return null; 
}
