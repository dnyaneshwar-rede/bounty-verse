

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const reports = [
  { id: 1, type: "User Growth", value: "+15%", status: "Positive" },
  { id: 2, type: "Bounty Completion Rate", value: "78%", status: "Neutral" },
  { id: 3, type: "Average Bounty Value", value: "$650", status: "Positive" },
  { id: 4, type: "Platform Revenue", value: "+22%", status: "Positive" },
]

export function AdminReports() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report Type</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.type}</TableCell>
                <TableCell>{report.value}</TableCell>
                <TableCell>{report.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

