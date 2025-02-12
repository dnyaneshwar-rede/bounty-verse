import type { NextApiRequest, NextApiResponse } from "next"
import { withRateLimit } from "../lib/rate-limit"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Example usage of req to handle a GET request
  if (req.method === 'GET') {
    res.status(200).json({ message: 'Hello, world!' });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withRateLimit(handler)