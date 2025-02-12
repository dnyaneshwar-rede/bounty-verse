"use client";

import type * as React from "react";
import {
  BarChart,
  CheckCircle,
  FileText,
  GalleryVerticalEnd,
  LayoutDashboard,
  Settings,
  ShieldAlert,
  Target,
  Trophy,
  Users,
} from "lucide-react";

import { NavMain } from "./NavMain";
import { NavProjects } from "./NavProjects";
import { NavUser } from "./NavUser";
import { TeamSwitcher } from "./Team-switcher";
import PostForm from "@/components/PostForm"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useSession, signOut } from "next-auth/react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "John Doe",
    email: "john@bountyverse.com",
    avatar: "/avatars/john-doe.jpg",
  },
  teams: [
    {
      name: "Bountyverse",
      logo: GalleryVerticalEnd,
      plan: "Pro",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Bounties",
      url: "/bounties",
      icon: Target,
      items: [
        {
          title: "Active Bounties",
          url: "/bounties/active",
        },
        {
          title: "Completed Bounties",
          url: "/bounties/completed",
        },
        {
          title: "Create Bounty",
          url: "/bounties/create",
        },
      ],
    },
    {
      title: "My Submissions",
      url: "/submissions",
      icon: FileText,
    },
    {
      title: "Leaderboard",
      url: "/leaderboard",
      icon: Trophy,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      items: [
        {
          title: "Profile",
          url: "/settings/profile",
        },
        {
          title: "Notifications",
          url: "/settings/notifications",
        },
        {
          title: "Billing",
          url: "/settings/billing",
        },
      ],
    },
  ],
  adminNav: [
    {
      title: "Admin Dashboard",
      url: "/admin",
      icon: ShieldAlert,
    },
    {
      title: "User Management",
      url: "/admin/users",
      icon: Users,
    },
    {
      title: "Bounty Approval",
      url: "/admin/bounty-approval",
      icon: CheckCircle,
    },
    {
      title: "Reports",
      url: "/admin/reports",
      icon: BarChart,
    },
  ],
  projects: [],
};

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.email === "admin@example.com"; // Replace with your admin check logic

  const user = {
    name: session?.user?.name || "User",
    email: session?.user?.email || "",
    avatar: session?.user?.image || "",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={data.navMain}
          adminItems={isAdmin ? data.adminNav : undefined}
        />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        {status === "authenticated" ? (
          <NavUser user={user} onSignOut={signOut} />
        ) : (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/login">Sign In</a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
