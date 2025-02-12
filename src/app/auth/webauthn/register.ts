import type { NextApiRequest, NextApiResponse } from "next"
import { generateRegistrationOptions } from "@simplewebauthn/server"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Generate registration options
  const options = await generateRegistrationOptions({
    rpName: "Bountyverse",
    rpID: "bountyverse.tech",
    userID: "user-unique-id",
    userName: "username",
    // ... other options
  })

  // Convert the challenge to Uint8Array
  const challengeArray = new Uint8Array(Buffer.from(options.challenge, 'base64'));

  // Save options to session or database for verification later
  // req.session.currentChallenge = challengeArray

  res.json({ ...options, challenge: challengeArray });
}