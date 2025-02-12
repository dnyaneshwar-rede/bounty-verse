import rateLimit from "express-rate-limit"
import type { NextApiRequest, NextApiResponse } from "next"

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})

export function withRateLimit(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) {
  return async (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
      rateLimiter(req, res, (result: unknown) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(handler(req, res))
      })
    })
}

