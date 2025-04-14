import * as React from "react";
import { SquareTerminal } from "lucide-react";

import { NavMain } from "@/components/Sidebar/nav-main";
import { NavUser } from "@/components/Sidebar/nav-user";
import { TeamSwitcher } from "@/components/Sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuth } from "@/app/hooks/useAuth";

function getNavMainByRole(role: string) {
  switch (role) {
    case "PARTICIPANT":
      return [
        {
          title: "Concurso",
          url: "#",
          icon: SquareTerminal,
          isActive: true,
          items: [
            { title: "Etapas", url: "/" },
            { title: "Projetos", url: "/projects" },
          ],
        },
      ];

    case "EVALUATION_COMMITTEE":
      return [
        {
          title: "Concurso",
          url: "#",
          icon: SquareTerminal,
          isActive: true,
          items: [
            { title: "Etapas", url: "/" },
            { title: "Projetos", url: "/projects" },
          ],
        },
      ];

    case "MARKETING":
      return [
        {
          title: "Concurso",
          url: "#",
          icon: SquareTerminal,
          isActive: true,
          items: [
            { title: "Etapas", url: "/" },
            { title: "Projetos", url: "/projects" },
          ],
        },
      ];

    default:
      return [];
  }
}

// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();
  const data = {
    user: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      avatar: "/avatars/shadcn.jpg",
    },

    navMain: [
      {
        title: "Concurso",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "Etapas",
            url: "/",
          },
          {
            title: "Usuários",
            url: "#",
          },
          {
            title: "Projetos",
            url: "/projects",
          },
        ],
      },
    ],
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
