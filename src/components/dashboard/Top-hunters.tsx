


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const topHunters = [
  { id: 1, name: "Alice", earnings: "$5,000", avatar: "/avatars/alice.jpg" },
  { id: 2, name: "Bob", earnings: "$4,500", avatar: "/avatars/bob.jpg" },
  { id: 3, name: "Charlie", earnings: "$4,000", avatar: "/avatars/charlie.jpg" },
  { id: 4, name: "David", earnings: "$3,500", avatar: "/avatars/david.jpg" },
]

export function TopHunters() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Top Hunters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topHunters.map((hunter) => (
            <div key={hunter.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={hunter.avatar} alt={hunter.name} />
                <AvatarFallback>{hunter.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{hunter.name}</p>
                <p className="text-sm text-muted-foreground">Earnings: {hunter.earnings}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

