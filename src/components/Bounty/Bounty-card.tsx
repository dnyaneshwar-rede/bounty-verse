// components/bounty-card.tsx
"use client";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Define the Bounty type
interface Bounty {
  id: string; // or number, depending on your data structure
  amount: number;
  status: string;
  issueUrl: string;
  repo: string;
  issueNumber: number; // or string, depending on your data structure
}

export function BountyCard({ bounty }: { bounty: Bounty }) {

  const handlePayment = (id: unknown): void => {
    console.log("paid", id);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>${bounty.amount} Bounty</span>
          <span className="text-sm text-muted-foreground">
            {bounty.status}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <a 
          href={bounty.issueUrl} 
          target="_blank"
          className="text-primary hover:underline"
        >
          {bounty.repo}#{bounty.issueNumber}
        </a>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        {bounty.status === "COMPLETED" && (
          <Button variant="outline" onClick={() => handlePayment(bounty.id)}>
            Mark as Paid
          </Button>
        )}
        <Button variant="ghost">View Submissions</Button>
      </CardFooter>
    </Card>
  );
}