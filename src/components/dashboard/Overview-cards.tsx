

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, FileText, DollarSign, Users } from "lucide-react"
import type React from "react" // Import React

interface OverviewCardProps {
  title: string
  value: string
  change: string
  icon: React.ElementType
}

function OverviewCard({ title, value, change, icon: Icon }: OverviewCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{change}</p>
      </CardContent>
    </Card>
  )
}

export function OverviewCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <OverviewCard title="Total Bounties" value="254" change="+20% from last month" icon={Target} />
      <OverviewCard title="Active Bounties" value="145" change="+15% from last month" icon={FileText} />
      <OverviewCard title="Total Earnings" value="$12,234" change="+10% from last month" icon={DollarSign} />
      <OverviewCard title="Active Users" value="573" change="+8% from last month" icon={Users} />
    </div>
  )
}

