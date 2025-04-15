import { AppSidebar } from "@/components/Sidebar/app-sidebar";

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger className="-ml-1 sm:sr-only" />
      <SidebarInset className="md:p-6 py-6 pr-6">
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
