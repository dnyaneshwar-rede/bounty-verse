"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function SignIn() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 bg-white rounded-lg shadow-md text-blue-400">
        <h1 className="text-2xl font-bold mb-4">Sign In to Bountyverse</h1>
        <Button onClick={() => signIn("github", { callbackUrl: "/dashboard" })}>Sign in with GitHub</Button>
      </div>
    </div>
  )
}

