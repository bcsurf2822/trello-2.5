import { getServerSession } from "next-auth";

import { sign } from "jsonwebtoken";
import { setCookie } from "cookies-next/client";


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); 
  }

  const token = sign(
    {
      name: "Guest User",
      email: "guest@example.com",
      isGuest: true,
    },
    process.env.AUTH_SECRET,
    { expiresIn: "24h" } 
  );

  setCookie("next-auth.session-token", token, { req, res });

  return res.status(200).json({ message: "Guest signed in" });
}