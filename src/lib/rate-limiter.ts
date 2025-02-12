import { NextResponse } from "next/server"
import { Redis } from "@upstash/redis"

const redis = Redis.fromEnv()

export async function rateLimiter(ip: string) {
  const limit = 5
  const duration = 60 // 1 minute

  const requests = await redis.incr(`rate_limit:${ip}`)

  if (requests === 1) {
    await redis.expire(`rate_limit:${ip}`, duration)
  }

  if (requests > limit) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 })
  }

  return null
}

