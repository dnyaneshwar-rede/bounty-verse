import type { NextApiRequest, NextApiResponse } from "next";
import { withRBAC } from "../../lib/rbac";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Admin-only logic here
  // For example, sending a success response
  res.status(200).json({ message: "Admin access granted." });
}

export default withRBAC(handler, ["admin"]);