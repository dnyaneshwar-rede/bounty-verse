import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Twitter, Github, Globe, Linkedin } from "lucide-react";
import Link from "next/link";

const ProfilePage = async () => {
  const session = await auth();
  if (!session) {
    redirect("/sign-in");
  }

  const user = {
    name: session.user?.name || "Unknown User",
    username: session.user?.email?.split("@")[0] || "anonymous",
    image: session.user?.image || "/default-avatar.png",
    location: "Unknown",
  };

  // Stats data
  const stats = {
    earned: 0,
    submissions: 0,
    won: 0,
  };

  // Skills categorized
  const skills = {
    FRONTEND: ["React"],
    COMMUNITY: ["Community Manager"],
    CONTENT: ["Research", "Writing"],
    BACKEND: ["JavaScript", "Python", "Java"],
    OTHER: ["Product Feedback", "Operations"],
    BLOCKCHAIN: ["Solidity"],
    MOBILE: ["React Native"],
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-blue-100">
      {/* Cover Image Area */}
      <div className="h-48 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400" />

      <div className="max-w-4xl mx-auto px-4 -mt-24">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column - Profile Info */}
          <div className="md:w-2/3">
            <Card className="p-6">
              {/* Profile Header */}
              <div className="flex items-start gap-4">
                <div className="relative">
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-gray-500">@{user.username}</p>
                  {user.location && (
                    <p className="text-sm text-gray-500 mt-1">
                      Based in {user.location}
                    </p>
                  )}
                </div>
                <Link href="">
                  <Button variant="outline" size="sm">
                    Share
                  </Button>
                </Link>
                <Link href="/account/profile/edit">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 mt-6">
                <Link href="#" className="text-gray-500 hover:text-gray-700">
                  <Twitter size={20} />
                </Link>
                <Link href="#" className="text-gray-500 hover:text-gray-700">
                  <Github size={20} />
                </Link>
                <Link href="#" className="text-gray-500 hover:text-gray-700">
                  <Globe size={20} />
                </Link>
                <Link href="#" className="text-gray-500 hover:text-gray-700">
                  <Linkedin size={20} />
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-6 pb-6 border-b">
                <div>
                  <p className="text-xl font-bold">${stats.earned}</p>
                  <p className="text-sm text-gray-500">Earned</p>
                </div>
                <div>
                  <p className="text-xl font-bold">{stats.submissions}</p>
                  <p className="text-sm text-gray-500">Submissions</p>
                </div>
                <div>
                  <p className="text-xl font-bold">{stats.won}</p>
                  <p className="text-sm text-gray-500">Won</p>
                </div>
              </div>

              {/* Skills Section */}
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-4">Skills</h2>
                <div className="space-y-4">
                  {Object.entries(skills).map(([category, skillList]) => (
                    <div key={category}>
                      <p className="text-sm text-gray-500 mb-2">{category}</p>
                      <div className="flex flex-wrap gap-2">
                        {skillList.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py- rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Activity */}
          <div className="md:w-1/3">
            <Card className="p-6">
              <div className="flex gap-4 mb-6">
                <Button variant="default" className="flex-1">
                  Proof of Work
                </Button>
                <Button variant="outline" className="flex-1">
                  Activity Feed
                </Button>
              </div>

              {/* Empty State */}
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gray-400">📄</span>
                </div>
                <p className="text-gray-500 mb-4">
                  Add some proof of work to build your profile
                </p>
                <Button>Add</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
