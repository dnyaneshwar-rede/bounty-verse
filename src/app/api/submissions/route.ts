import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github"; // Import GoogleProvider directly
import { DefaultSession } from "next-auth";

// Extend the DefaultSession interface to include the user property with the correct type
declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null
      avatar?: string | null;
      username?: string | null;
      bio?: string | null;
      createdAt: Date;
      updatedAt: Date;
      // Add other user properties as needed
    };
  }
}

// Example usage of NextAuth
export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // Add other providers as needed
  ],
  callbacks: {
    async session({ session, user }) {
      // Ensure session.user is defined before assigning the id
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Other NextAuth configuration options can go here
});