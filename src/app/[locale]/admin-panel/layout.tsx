import { ReactNode } from "react";

import { SidebarMenu } from "@/components/AdminPanel/SidebarMenu";
import { CardDescription, CardTitle } from "@/components/ui/card";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
} from "@/components/ui/sidebar";

type Props = { children: ReactNode };

const AdminPageLayout = ({ children }: Props) => {
  return (
    <div className="flex w-full flex-1 flex-col">
      <div className="m-4">
        <CardTitle className="mb-1">Admin settings</CardTitle>
        <CardDescription>Manage your admin settings</CardDescription>
      </div>
      <hr className="my-4 border-t border-gray-300" />
      <div className="flex flex-1">
        <SidebarProvider className="mr-4 min-h-[0] w-auto">
          <Sidebar className="relative h-full">
            <SidebarContent className="rounded-md">
              <SidebarMenu />
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
        <main>{children}</main>
      </div>
    </div>
  );
};
export default AdminPageLayout;
