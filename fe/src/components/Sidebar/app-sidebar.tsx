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
import { Role } from "@/app/entities/Role";
import { CurrentPeriodIndicator } from "./current-period-indicator";
import { useLocation } from "react-router-dom";

// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();
  const location = useLocation();

  function getNavMainByRole(role: Role) {
    switch (role) {
      case "PARTICIPANT":
        return [
          {
            title: "Concurso",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
              {
                title: "Etapas",
                url: "/",
                isActive: location.pathname === "/",
              },
              {
                title: "Projetos",
                url: "/projects",
                isActive: location.pathname === "/projects",
              },
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
              {
                title: "Etapas",
                url: "/",
                isActive: location.pathname === "/",
              },
              {
                title: "Projetos",
                url: "/projects",
                isActive: location.pathname === "/projects",
              },
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
              {
                title: "Etapas",
                url: "/",
                isActive: location.pathname === "/",
              },
              {
                title: "Participantes",
                url: "/participants",
                isActive: location.pathname === "/participants",
              },
              {
                title: "Projetos",
                url: "/projects",
                isActive: location.pathname === "/projects",
              },
              {
                title: "Edições",
                url: "/editions",
                isActive: location.pathname === "/editions",
              },
            ],
          },
        ];

      default:
        return [];
    }
  }
  const data = React.useMemo(() => {
    return {
      user: {
        name: user?.name ?? "",
        email: user?.email ?? "",
        avatar: "/avatars/shadcn.jpg",
      },

      navMain: getNavMainByRole(user?.role!),
    };
  }, [location]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
        <CurrentPeriodIndicator />
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
