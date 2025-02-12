import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PrismaClient, Bounty } from "@prisma/client"

const prisma = new PrismaClient()

export default async function BountiesPage() {
  const bounties: (Bounty & { creator: { name: string | null } })[] = await prisma.bounty.findMany({
    include: { creator: true },
  })

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Active Bounties</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bounties.map((bounty) => (
          <Card key={bounty.id}>
            <CardHeader>
              <CardTitle>{bounty.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Reward: ${bounty.reward}</p>
              <p>Status: {bounty.status}</p>
              <p>Created by: {bounty.creator.name || "Unknown"}</p>
              <Button asChild className="mt-4">
                <Link href={`/bounties/${bounty.id}`}>View Details</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}