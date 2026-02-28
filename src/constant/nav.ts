import { Home, Users, LucideIcon } from "lucide-react";

export type SidebarItem = {
  icon?: LucideIcon;
  label: string;
  href?: string;
  children?: SidebarItem[];
};

export type SidebarSection = {
  label: string;
  items: SidebarItem[];
};

export const mainSidebar: SidebarSection[] = [
  {
    label: "MAIN",
    items: [
      {
        icon: Home,
        label: "Dashboard",
        href: "/dashboard"
      },
    ],
  },
  {
    label: "MANAGEMENT",
    items: [
      {
        icon: Users,
        label: "All Users",
        href: "/dashboard/users"
      },
      {
        icon: Users,
        label: "All Admins",
        href: "/dashboard/admins"
      }
    ],
  }
];