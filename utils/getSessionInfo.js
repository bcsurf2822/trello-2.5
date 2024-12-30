import { auth } from "@/auth";



export async function getSessionInfo() {
  try {
    const session = await auth();
    if (session) {
      return { isGuest: false, user: session.user };
    }
  } catch (error) {
    console.error("Error retrieving session or cookies:", error);
  }

  return null;
}
