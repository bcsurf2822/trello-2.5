import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import Google from "next-auth/providers/google";
import clientPromise from "./lib/mongo";

const config = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    {
      id: "guest",
      name: "Guest",
      type: "credentials",
      credentials: {},
      authorize: async (credentials) => {
        const { id, name } = credentials;
        return { id, name, isGuest: true };
      },
    },
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "guest") {
        token.isGuest = true;
        token.userId = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      session.isGuest = token.isGuest || false; 
      session.user.id = token.userId || session.user.id; 
      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
