import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import SuspenseFallback from "@/components/SuspenseFallback";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";

export default function AppLayout() {
  const location = useLocation();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger className="-ml-1 sm:sr-only " />
      <Suspense fallback={<SuspenseFallback />} key={location.key}>
        <SidebarInset className="flex flex-1 flex-col overflow-y-auto bg-red">
          <div className="flex-1 overflow-y-auto p-6 px-6 ">
            <Outlet key={location.key} />
          </div>
        </SidebarInset>
      </Suspense>
    </SidebarProvider>
  );
}
