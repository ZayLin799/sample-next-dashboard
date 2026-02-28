"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PieChart, Users, MapPin, Grid, ShieldPlus, FileText, LogOut, Plus } from "lucide-react";
import useConfirmDialogStore from "@/store/ConfirmationBoxStore";
import useAxiosAuth from "@/service/useApiService";
import { useQueryClient } from "@tanstack/react-query";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: PieChart },
  { label: "Admins", href: "/dashboard/admins", icon: ShieldPlus },
  { label: "Users", href: "/dashboard/users", icon: Users },
  { label: "Regions", href: "/dashboard/regions", icon: MapPin },
  { label: "Departments", href: "/dashboard/departments", icon: Grid },
  { label: "Logs", href: "/dashboard/logs", icon: FileText },
];

export default function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { ApiReq } = useAxiosAuth();
  const router = useRouter();
  const { openConfirmDialog } = useConfirmDialogStore();

  const normalize = (p?: string) => (p ? p.replace(/\/+$/, "") : "");
  const isActive = (href?: string) => {
    if (!href) return false;
    if (href === "/dashboard" && pathname !== "/dashboard") return false;
    const a = normalize(pathname);
    const b = normalize(href);
    return a === b || a.startsWith(b + "/");
  };

  const handleLogout = async () => {
    try {
      await ApiReq.post("/auth/admin/logout");
      queryClient.clear();
      router.push("/login");
    } catch {
      router.push("/login");
    }
  };

  return (
    <aside className={clsx("w-[280px] bg-white border-r border-gray-100 flex-col shrink-0 h-screen sticky top-0", className || "flex")}>
      {/* Brand Logo */}
      <div className="h-20 flex items-center px-8 border-b border-transparent">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-[#1268F1] to-[#7131F5] flex items-center justify-center font-bold text-white text-sm">
            N
          </div>
          <span className="font-bold text-xl text-[#0B1536]">NestApp</span>
        </div>
      </div>

      <div className="px-6 py-4">
        <button className="w-full bg-[#7131F5] hover:bg-[#6027DB] transition-colors text-white rounded-lg py-3.5 px-4 flex items-center justify-between shadow-sm">
          <span className="font-semibold text-[13px]">Register account</span>
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 space-y-1 mt-2 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={clsx(
                "flex items-center gap-4 px-4 py-3.5 rounded-xl text-[14px] font-medium transition-all group",
                active
                  ? "text-[#7131F5]"
                  : "text-[#9CA3AF] hover:text-[#555] hover:bg-gray-50/50"
              )}
            >
              <div className="relative flex items-center justify-center">
                <Icon className={clsx("w-5 h-5 transition-colors", active ? "text-[#7131F5]" : "text-[#9CA3AF]")} strokeWidth={active ? 2.5 : 2} />
              </div>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
