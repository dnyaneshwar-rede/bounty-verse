import DOMPurify from "dompurify";
import { v4 as uuidv4 } from "uuid";
import NextAuth, { type Session, type User as NextAuthUser } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

// Extend the User type to include the role property
declare module "next-auth" {
  interface User {
    role: string; // Define the expected type for role
  }

  interface Session {
    user: User & { id: string }; // Include id in the User type
  }
}

// Initialize Prisma Client
const prisma = new PrismaClient();

// Define authentication options
export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    // Customize session object
    async session({ session, user }: { session: Session; user: NextAuthUser }) {
      session.user = {
        ...session.user,
        id: sanitizeInput(typeof user.id === "string" ? user.id : uuidv4()),
        role: user.role ?? "defaultRole", // Use nullish coalescing to provide a default value for role
      };
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
    error: "/auth/error", // Custom error page
  },
};

// Export NextAuth configuration
export default NextAuth(authOptions);

// Implement the sanitizeInput function
function sanitizeInput(input: unknown): string {
  try {
    if (
      typeof input !== "string" &&
      typeof input !== "number" &&
      typeof input !== "boolean"
    ) {
      throw new Error("Invalid input type");
    }
    // Convert to string, trim whitespace, and escape special characters
    const sanitized = String(input).trim();
    const escaped = sanitized.replace(/[&<>"'`=\/]/g, (char) => {
      const escapeMap: { [key: string]: string } = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;",
        "=": "&#x3D;",
        "/": "&#x2F;",
      };
      return escapeMap[char] || char;
    });
    // Use DOMPurify to sanitize input for XSS vulnerabilities
    return DOMPurify.sanitize(escaped);
  } catch (error) {
    console.error("Error sanitizing input:", error);
    return "";
  }
}
