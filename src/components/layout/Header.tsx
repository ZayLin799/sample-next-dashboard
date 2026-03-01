"use client";

import { useQueryClient } from "@tanstack/react-query";
import useAxiosAuth from "@/service/useApiService";
import { useCurrentUser } from "@/utils/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import { Search, Bell, Menu, User, Settings as SettingsIcon, LogOut, ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import useConfirmDialogStore from "@/store/ConfirmationBoxStore";
import ConfirmationDialog from "./ConfirmationDialog";

export default function Header() {
    const queryClient = useQueryClient();
    const { ApiReq } = useAxiosAuth();
    const router = useRouter();
    const { data: currentUser } = useCurrentUser();
    const { openConfirmDialog } = useConfirmDialogStore();

    const user = currentUser?.data;
    const role = user?.role?.name || "Emma Kwan";
    const name = user?.username || "Emma Kwan";

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
        <header className="sticky top-0 z-40 flex h-[80px] items-center justify-between gap-3 bg-white px-4 md:px-8 border-b border-gray-100">
            <ConfirmationDialog />

            {/* Mobile drawer */}
            <div className="lg:hidden flex items-center">
                <Sheet>
                    <SheetTrigger asChild>
                        <button className="p-2 text-gray-500 hover:text-gray-900 transition-colors">
                            <Menu className="h-6 w-6" />
                        </button>
                    </SheetTrigger>
                    <SheetContent
                        side="left"
                        className="p-0 w-72 bg-white border-0 shadow-none pt-0"
                    >
                        <Sidebar />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Search Input - Hidden on very small screens, shown otherwise */}
            <div className="hidden sm:flex flex-1 max-w-[400px]">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={2.5} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-transparent outline-none pl-10 pr-4 text-sm font-medium placeholder:text-gray-400 placeholder:font-medium text-gray-800"
                    />
                </div>
            </div>

            {/* Right Side Tools */}
            <div className="ml-auto flex items-center gap-4 sm:gap-6">
                <button className="relative text-gray-400 hover:text-gray-600 transition-colors">
                    <Bell className="w-[18px] h-[18px]" strokeWidth={2.5} />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                {/* User Profile */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex items-center gap-3 border-l border-gray-100 pl-4 sm:pl-6 cursor-pointer outline-none">
                            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden shadow-sm">
                                <img src={`https://i.pravatar.cc/150?u=${name}`} alt="Profile" className="w-full h-full object-cover rounded-full" />
                            </div>
                            <span className="font-bold text-[13px] text-[#0B1536] hidden sm:flex items-center">{name} <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" strokeWidth={3} /></span>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 p-1.5 rounded-xl border-slate-200 shadow-xl mt-2 bg-white">
                        <div className="px-3 py-3 mb-1 border-b border-slate-100 bg-slate-50/50 rounded-t-lg">
                            <div className="text-sm font-bold text-slate-900 leading-tight">
                                {name}
                            </div>
                            <div className="text-[11px] font-bold text-[#7131F5] mt-0.5 uppercase tracking-wider">
                                {role}
                            </div>
                        </div>
                        <DropdownMenuItem
                            onSelect={(e) => {
                                e.preventDefault();
                                openConfirmDialog(
                                    handleLogout,
                                    "Logout?",
                                    "Are you sure you want to log out?"
                                );
                            }}
                            className="flex items-center gap-2 py-2 px-3 text-red-600 focus:text-red-600 focus:bg-red-50 rounded-lg cursor-pointer outline-none"
                        >
                            <LogOut className="h-4 w-4" />
                            <span className="font-medium">Sign out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
