import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";

type Role = "user" | "admin";

interface SessionUser {
  role: Role;
  // Add other user properties if needed
}

interface Session {
  user: SessionUser;
  // Add other session properties if needed
}

/**
 * Higher-order function to enforce Role-Based Access Control (RBAC) on API routes.
 * @param handler - The API route handler function.
 * @param allowedRoles - Array of roles permitted to access the handler.
 * @returns A function that checks user session and role before executing the handler.
 */
export function withRBAC(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>,
  allowedRoles: Role[]
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (allowedRoles.length === 0) {
      res.status(400).json({ message: "No roles specified" });
      return;
    }
    try {
      // Correctly pass the req object to getSession
      const session = await getSession(req) as Session | null;

      if (!session || !session.user || !session.user.role) {
        console.warn(
          `Unauthorized access attempt by IP: ${req.socket.remoteAddress}`
        );
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const userRole = session.user.role; // No need to cast to Role since it's already typed
      if (!allowedRoles.includes(userRole)) {
        console.warn(
          `Forbidden access attempt by user with role: ${userRole}`
        );
        res.status(403).json({ message: "Forbidden" });
        return;
      }

      await handler(req, res);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: "Internal Server Error", error: error.message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  };
}