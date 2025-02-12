import { NextResponse } from "next/server";
import getServerSession from "next-auth";
import { authOptions } from "@/app/auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";
import { handleError } from "@/lib/error-handler";
import { rateLimiter } from "@/lib/rate-limiter";
import { Session } from "next-auth";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const rateLimitResult = await rateLimiter(ip);
  if (rateLimitResult) return rateLimitResult;

  try {
    const bounties = await prisma.bounty.findMany({
      include: { creator: true },
    });
    return NextResponse.json(bounties);
  } catch (error) {
    return handleError(error, "Failed to fetch bounties");
  }
}

export async function POST(request: Request) {
  const session = (await getServerSession(authOptions)) as unknown as Session | null;

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const rateLimitResult = await rateLimiter(ip);
  if (rateLimitResult) return rateLimitResult;

  try {
    const { title, description, reward } = await request.json();
    const bounty = await prisma.bounty.create({
      data: {
        title,
        description,
        reward,
        creatorId: session.user.id,
      },
    });
    return NextResponse.json(bounty);
  } catch (error) {
    return handleError(error, "Failed to create bounty");
  }
}