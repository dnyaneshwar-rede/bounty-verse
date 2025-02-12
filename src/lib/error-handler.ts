import { NextResponse } from "next/server"

export function handleError(error: unknown, message: string) {
  console.error(`${message}:`, error)
  return NextResponse.json({ error: message }, { status: 500 })
}

