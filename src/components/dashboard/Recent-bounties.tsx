


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const recentBounties = [
  { id: 1, title: "Fix API endpoint", reward: "$500", status: "Open" },
  { id: 2, title: "Implement new feature", reward: "$1000", status: "In Progress" },
  { id: 3, title: "Optimize database queries", reward: "$750", status: "Open" },
  { id: 4, title: "Design new logo", reward: "$300", status: "Completed" },
]

export function RecentBounties() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Recent Bounties</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Reward</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentBounties.map((bounty) => (
              <TableRow key={bounty.id}>
                <TableCell>{bounty.title}</TableCell>
                <TableCell>{bounty.reward}</TableCell>
                <TableCell>{bounty.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

