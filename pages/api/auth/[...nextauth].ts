import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/utils/mongodb";

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID || "",
    //   clientSecret: process.env.GOOGLE_SECRET || "",
    // }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.SECRET,
  jwt: {
    secret: process.env.SECRET,
  },
  session: {
    strategy: "jwt",
  },
});
