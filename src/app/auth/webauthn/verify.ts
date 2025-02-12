import type { NextApiRequest, NextApiResponse } from "next"
import { verifyRegistrationResponse } from "@simplewebauthn/server"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req

  // Verify the registration response
  const verification = await verifyRegistrationResponse({
    response: body,
    expectedChallenge: "challenge-from-session-or-database",
    expectedOrigin: "https://bountyverse.com",
    expectedRPID: "bountyverse.tech",
    // ... other options
  })

  if (verification.verified) {
    // Registration successful, save the credential to the database
    res.json({ success: true })
  } else {
    res.status(400).json({ success: false, error: "Verification failed" })
  }
}

