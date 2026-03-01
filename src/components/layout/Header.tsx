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
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { getBackendToken } from "@/app/actions";
import toast from "react-hot-toast";

export default function Header() {
    const queryClient = useQueryClient();
    const { ApiReq } = useAxiosAuth();
    const router = useRouter();
    const { data: currentUser } = useCurrentUser();
    const { openConfirmDialog } = useConfirmDialogStore();
    const [unreadCount, setUnreadCount] = useState(0);
    const [notifications, setNotifications] = useState<any[]>([]);

    const user = currentUser?.data;
    const role = user?.role?.name || "Emma Kwan";
    const name = user?.username || "Emma Kwan";

    useEffect(() => {
        const initSocket = async () => {
            const token = await getBackendToken();
            if (!token) return;

            const socket = io("http://localhost:4000", {
                auth: { token }
            });

            socket.on("notification", (data) => {
                setUnreadCount(prev => prev + 1);
                setNotifications(prev => [{ ...data, id: Date.now() }, ...prev]);

                // Custom toast for notification
                toast.custom((t) => (
                    <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
                        <div className="flex-1 w-0 p-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 pt-0.5">
                                    <div className="h-10 w-10 rounded-full bg-[#1268F1]/10 flex items-center justify-center">
                                        <Bell className="h-5 w-5 text-[#1268F1]" />
                                    </div>
                                </div>
                                <div className="ml-3 flex-1">
                                    <p className="text-sm font-bold text-gray-900">
                                        System Notification
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {data.message}
                                    </p>
                                    <p className="mt-2 text-xs text-gray-400 font-medium">
                                        Sent by {data.sender}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex border-l border-gray-200">
                            <button
                                onClick={() => toast.dismiss(t.id)}
                                className="w-full border border-transparent rounded-none rounded-r-xl p-4 flex items-center justify-center text-sm font-medium text-[#7131F5] hover:text-[#6027DB] focus:outline-none"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                ), { duration: 6000 });
            });

            return socket;
        };

        let socketInstance: any;
        initSocket().then((s) => { socketInstance = s; });

        return () => {
            if (socketInstance) socketInstance.disconnect();
        };
    }, []);

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
                <DropdownMenu onOpenChange={(open) => { if (open) setUnreadCount(0); }}>
                    <DropdownMenuTrigger asChild>
                        <button className="relative text-gray-400 hover:text-gray-600 transition-colors outline-none cursor-pointer">
                            <Bell className="w-[18px] h-[18px]" strokeWidth={2.5} />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                            )}
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80 p-0 rounded-xl border-slate-200 shadow-xl mt-2 bg-white overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                            <span className="font-bold text-[#0B1536] text-sm">Notifications</span>
                            {unreadCount > 0 && (
                                <span className="bg-[#1268F1] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{unreadCount} New</span>
                            )}
                        </div>
                        <div className="max-h-[300px] overflow-y-auto">
                            {notifications.length === 0 ? (
                                <div className="p-4 text-center text-sm text-gray-500 py-8">No notifications yet.</div>
                            ) : (
                                notifications.map((noti: any) => (
                                    <div key={noti.id} className="p-4 border-b border-gray-50 hover:bg-gray-50/50 transition-colors flex flex-col gap-1">
                                        <div className="flex gap-3">
                                            <div className="w-8 h-8 mt-0.5 rounded-full bg-[#1268F1]/10 flex items-center justify-center shrink-0">
                                                <Bell className="h-4 w-4 text-[#1268F1]" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-[#0B1536] leading-snug">{noti.message}</p>
                                                <p className="text-xs text-gray-500 mt-1 font-medium">From: {noti.sender}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* User Profile */}
                <div className="h-6 w-px bg-gray-200 mx-1"></div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex items-center gap-3 cursor-pointer outline-none group">
                            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shadow-sm group-hover:ring-2 ring-gray-100 transition-all">
                                <img src={`https://i.pravatar.cc/150?u=${name}`} alt="Profile" className="w-full h-full object-cover rounded-full" />
                            </div>
                            <span className="font-bold text-[15px] text-[#0B1536] hidden sm:flex items-center">{name} <ChevronDown className="w-4 h-4 text-gray-500 ml-1.5" strokeWidth={3} /></span>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 p-1.5 rounded-xl border-slate-200 shadow-xl mt-2 bg-white">
                        <div className="px-3 py-3 mb-1 border-b border-slate-100 bg-slate-50/50 rounded-t-lg">
                            <div className="text-sm font-bold text-slate-900 leading-tight">
                                {name}
                            </div>
                            <div className="text-[11px] font-bold text-[#7131F5] mt-1 uppercase tracking-wider">
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
