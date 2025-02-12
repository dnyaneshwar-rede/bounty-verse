


import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const bounties = [
  {
    id: 1,
    title: "Implement user authentication",
    reward: "$500",
    status: "Open",
    description: "Implement a secure user authentication system using NextAuth.js",
  },
  {
    id: 2,
    title: "Create responsive dashboard",
    reward: "$750",
    status: "In Progress",
    description: "Design and implement a responsive dashboard for the admin panel",
  },
  {
    id: 3,
    title: "Optimize database queries",
    reward: "$1000",
    status: "Open",
    description: "Improve the performance of database queries for the user profile page",
  },
]

export default function BountyDetailPage({ params }: { params: { id: string } }) {
  const bounty = bounties.find((b) => b.id === Number.parseInt(params.id))

  if (!bounty) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>{bounty.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{bounty.description}</p>
          <p>Reward: {bounty.reward}</p>
          <p>Status: {bounty.status}</p>
          <Button className="mt-4">Apply for Bounty</Button>
        </CardContent>
      </Card>
    </div>
  )
}

