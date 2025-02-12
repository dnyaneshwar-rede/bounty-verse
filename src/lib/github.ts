import { createHmac } from "crypto"

export async function verifyGitHubWebhook(body: Record<string, unknown>, signature: string): Promise<boolean> {
  const secret = process.env.GITHUB_WEBHOOK_SECRET
  if (!secret) {
    throw new Error("GITHUB_WEBHOOK_SECRET is not set")
  }

  const hmac = createHmac("sha256", secret)
  hmac.update(JSON.stringify(body))
  const expectedSignature = `sha256=${hmac.digest("hex")}`

  return signature === expectedSignature
}