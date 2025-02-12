import type { NextApiRequest, NextApiResponse } from "next"
import { verifyGitHubWebhook } from "../lib/github"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const signature = req.headers["x-hub-signature-256"] as string
  if (!signature) {
    return res.status(400).json({ message: "No signature" })
  }

  const isValid = await verifyGitHubWebhook(req.body, signature)
  if (!isValid) {
    return res.status(401).json({ message: "Invalid signature" })
  }

  const event = req.headers["x-github-event"] as string
  if (event === "pull_request") {
    // Handle pull request events
    const { action, pull_request } = req.body
    if (action === "closed" && pull_request.merged) {
      // Update bounty status and reward contributor
      // This is where you'd implement your logic to update the bounty and reward the contributor
      console.log(`PR ${pull_request.number} merged. Updating bounty status and rewarding contributor.`)
    }
  }

  res.status(200).json({ message: "Webhook received" })
}

