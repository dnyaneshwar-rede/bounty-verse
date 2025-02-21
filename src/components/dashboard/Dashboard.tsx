import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OverviewCards } from "./Overview-cards"
import { RecentBounties } from "./Recent-bounties"
import { TopHunters } from "./Top-hunters"
import { AnalyticsChart } from "./Analytics-chart"
import { AdminReports } from "./Admin-reports"
import { BountyCard } from "../Bounty/Bounty-card"

// Example default bounty object
const defaultBounty = {
  id: "1", // Changed from number to string
  title: "Sample Bounty",
  description: "This is a sample bounty description.",
  reward: 100,
  amount: 50, // Add the missing properties
  status: "open", // Example status
  issueUrl: "https://example.com/issue/1", // Example issue URL
  repo: "example/repo", // Example repository
  issueNumber: 123 // Example issue number
};

export function Dashboard({ isAdmin = false }: { isAdmin?: boolean }) {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        {isAdmin && <TabsTrigger value="reports">Reports</TabsTrigger>}
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <OverviewCards />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <RecentBounties />
         
          <TopHunters />
        </div>
      </TabsContent>
      <TabsContent value="analytics" className="space-y-4">
        <AnalyticsChart />
      </TabsContent>
      <TabsContent value="analytics" className="space-y-4">
      <BountyCard bounty={defaultBounty} /> {/* Pass a valid bounty object */}
      </TabsContent>
      {isAdmin && (
        <TabsContent value="reports" className="space-y-4">
          <AdminReports />
        </TabsContent>
      )}
    </Tabs>
  )
}