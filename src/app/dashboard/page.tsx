"use client";

import { PieChart, Users, MapPin, Grid, ShieldPlus, FileText, Activity } from "lucide-react";

export default function Dashboard() {
    return (
        <div className="space-y-6 max-w-[1800px] mx-auto">
            {/* Top Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[#0B1536] font-bold text-2xl mb-1">1,245</span>
                        <span className="text-[#9CA3AF] text-xs font-semibold uppercase tracking-wider">Total Users</span>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-[#FAF5FF] flex items-center justify-center text-[#7131F5]">
                        <Users className="w-6 h-6" strokeWidth={2.5} />
                    </div>
                </div>

                <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[#0B1536] font-bold text-2xl mb-1">8</span>
                        <span className="text-[#9CA3AF] text-xs font-semibold uppercase tracking-wider">Active Admins</span>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-[#F0FDF4] flex items-center justify-center text-[#0BCE94]">
                        <ShieldPlus className="w-6 h-6" strokeWidth={2.5} />
                    </div>
                </div>

                <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[#0B1536] font-bold text-2xl mb-1">$8,240</span>
                        <span className="text-[#9CA3AF] text-xs font-semibold uppercase tracking-wider">Monthly Revenue</span>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-[#FFF7ED] flex items-center justify-center text-[#F97316]">
                        <PieChart className="w-6 h-6" strokeWidth={2.5} />
                    </div>
                </div>

                <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[#0B1536] font-bold text-2xl mb-1">14%</span>
                        <span className="text-[#9CA3AF] text-xs font-semibold uppercase tracking-wider">Server Load</span>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-[#FEF2F2] flex items-center justify-center text-[#EF4444]">
                        <Activity className="w-6 h-6" strokeWidth={2.5} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart area skeleton */}
                <div className="lg:col-span-2 bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <span className="text-xl font-bold text-[#0B1536] block mb-2">User Growth Trend</span>
                        <span className="text-[#9CA3AF] text-sm">Main Analytics Graph UI Placeholder</span>
                    </div>
                </div>

                {/* Users by Region skeleton */}
                <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center">
                    <span className="text-[15px] font-bold text-[#0B1536] self-start w-full mb-8">User Demographics</span>
                    <div className="w-40 h-40 rounded-full border-[18px] border-[#7131F5] flex items-center justify-center relative shadow-[inset_0px_2px_8px_0px_rgba(0,0,0,0.05)]">
                        <div className="absolute top-0 right-0 w-1/2 h-full border-[18px] border-[#F97316] rounded-r-full -mr-[18px]"></div>
                        <div className="w-full h-full bg-white rounded-full"></div>
                    </div>
                    <div className="flex gap-6 mt-8">
                        <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#F97316]"></span><span className="text-[#0B1536] text-sm font-bold">Groups</span></div>
                        <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#7131F5]"></span><span className="text-[#0B1536] text-sm font-bold">Individuals</span></div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Bottom charts skeletons */}
                <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 min-h-[300px] flex items-center justify-center">
                    <span className="font-bold text-[#0B1536]">Activity Status Chart</span>
                </div>

                <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 items-center justify-center flex flex-col">
                    <span className="text-[15px] font-bold text-[#0B1536] self-start w-full mb-6">Device Usage</span>
                    <div className="space-y-4 w-full">
                        <div className="flex items-center justify-between"><div className="flex items-center gap-3"><MapPin className="text-[#9CA3AF] w-4 h-4" /><span className="text-[#6B7280] font-medium text-sm">Mobile App</span></div><span className="font-bold text-[#0B1536]">247</span></div>
                        <div className="flex items-center justify-between"><div className="flex items-center gap-3"><Grid className="text-[#9CA3AF] w-4 h-4" /><span className="text-[#6B7280] font-medium text-sm">Desktop</span></div><span className="font-bold text-[#0B1536]">164</span></div>
                        <div className="flex items-center justify-between"><div className="flex items-center gap-3"><FileText className="text-[#9CA3AF] w-4 h-4" /><span className="text-[#6B7280] font-medium text-sm">Tablet</span></div><span className="font-bold text-[#0B1536]">86</span></div>
                    </div>
                </div>

                <div className="bg-[#7131F5] rounded-[24px] shadow-lg shadow-[#7131F5]/30 p-8 min-h-[300px] flex flex-col justify-between overflow-hidden relative">
                    <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-[#6027DB] rounded-full blur-[40px] translate-y-1/2 translate-x-1/4"></div>
                    <div className="relative z-10">
                        <span className="text-white text-[32px] font-bold block mb-1">1,402</span>
                        <span className="text-white/80 text-sm font-medium">New visitors this week</span>
                    </div>
                    <div className="relative z-10 text-center text-white/40 font-medium">Spline Chart Graphic</div>
                </div>
            </div>
        </div>
    );
}
