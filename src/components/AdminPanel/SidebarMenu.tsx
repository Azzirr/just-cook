"use client";

import {
  SidebarMenu as SidebarMenuShadcn,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Link, usePathname } from "@/i18n/routing";

const BASE_ROUTE = "/admin-panel";

const elements = [
  {
    href: `/categories`,
    title: "Categories",
  },
  {
    href: `/users`,
    title: "Users",
  },
];

export const SidebarMenu = () => {
  const pathname = usePathname();

  const isActive = (path: string) => path === pathname;

  return (
    <SidebarMenuShadcn>
      {elements.map(({ href, title }, index) => (
        <SidebarMenuButton key={index} isActive={isActive(BASE_ROUTE + href)}>
          <Link href={BASE_ROUTE + href}>{title}</Link>
        </SidebarMenuButton>
      ))}
    </SidebarMenuShadcn>
  );
};
