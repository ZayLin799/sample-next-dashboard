"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLogin } from "@/service/auth/useLogin";
import { loginSchema, LoginFormData } from "@/type/LoginType";
import { LayoutDashboard } from "lucide-react";

export default function LoginPage() {
    const { mutate: login, isPending: loading } = useLogin();

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            identifier: "",
            password: "",
        },
    });

    async function onSubmit(values: LoginFormData) {
        login(values);
    }

    return (
        <div className="flex min-h-screen font-sans bg-[#F8F9FE] items-center justify-center p-4">
            <div className="w-full max-w-[900px] min-h-[500px] sm:h-[600px] bg-white rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] flex relative z-10">
                {/* Left Side (Branding/Illustration) */}
                <div className="hidden lg:flex flex-col w-[45%] bg-[#7131F5] p-12 text-white justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#894ef6] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 opacity-60"></div>
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#6027DB] rounded-full blur-[60px] translate-y-1/2 -translate-x-1/4 opacity-60"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-16">
                            <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-[#7131F5]">
                                <LayoutDashboard className="w-5 h-5 stroke-[2.5px]" />
                            </div>
                            <span className="font-bold text-xl">NestApp</span>
                        </div>

                        <h1 className="text-[34px] font-bold leading-[1.2] mb-6">
                            Manage your<br />application with<br />ease and speed.
                        </h1>
                        <p className="text-white/70 font-medium text-[15px] leading-relaxed max-w-[280px]">
                            Streamline your workflow, track user records, and enhance overall system management natively.
                        </p>
                    </div>

                    <div className="relative z-10 flex gap-2">
                        <div className="w-8 h-1.5 bg-white rounded-full"></div>
                        <div className="w-2 h-1.5 bg-white/30 rounded-full"></div>
                        <div className="w-2 h-1.5 bg-white/30 rounded-full"></div>
                    </div>
                </div>

                {/* Right Side (Form) */}
                <div className="flex-1 flex flex-col justify-center px-10 sm:px-16 relative bg-white">
                    <div className="max-w-[360px] w-full mx-auto">
                        <div className="mb-10 lg:hidden flex items-center gap-2">
                            <div className="w-8 h-8 rounded bg-[#7131F5] flex items-center justify-center text-white">
                                <LayoutDashboard className="w-5 h-5 stroke-[2.5px]" />
                            </div>
                            <span className="font-bold text-xl text-[#0B1536]">NestApp</span>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-[28px] font-bold text-[#0B1536] mb-2">Welcome back</h2>
                            <p className="text-[#6B7280] text-[15px] font-medium">Please enter your credentials to login.</p>
                        </div>

                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[13px] font-bold text-[#0B1536] mb-2 uppercase tracking-wide">
                                        Username or Email
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="admin"
                                        {...form.register("identifier")}
                                        className="w-full bg-[#F8F9FE] border-transparent focus:bg-white focus:border-[#7131F5] ring-0 outline-none rounded-xl px-4 py-3.5 text-[15px] text-[#0B1536] font-medium transition-all shadow-sm placeholder:text-[#9CA3AF] border-2"
                                    />
                                    {form.formState.errors.identifier && (
                                        <p className="text-red-500 text-xs font-semibold mt-1.5 pl-1">{form.formState.errors.identifier.message}</p>
                                    )}
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="block text-[13px] font-bold text-[#0B1536] uppercase tracking-wide">
                                            Password
                                        </label>
                                        <a href="#" className="flex text-[#7131F5] text-[13px] font-bold hover:underline">Forgot?</a>
                                    </div>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        {...form.register("password")}
                                        className="w-full bg-[#F8F9FE] border-transparent focus:bg-white focus:border-[#7131F5] ring-0 outline-none rounded-xl px-4 py-3.5 text-[15px] text-[#0B1536] font-medium transition-all shadow-sm placeholder:text-[#9CA3AF] border-2"
                                    />
                                    {form.formState.errors.password && (
                                        <p className="text-red-500 text-xs font-semibold mt-1.5 pl-1">{form.formState.errors.password.message}</p>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#7131F5] hover:bg-[#6027DB] text-white font-bold rounded-xl py-4 text-[15px] transition-all shadow-[0_10px_20px_-10px_rgba(113,49,245,0.5)] active:scale-[0.98]"
                            >
                                {loading ? "Authenticating..." : "Login to account"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Background elements */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10 bg-[#F8F9FE]">
                <div className="absolute -top-[20%] -right-[10%] w-[1000px] h-[1000px] rounded-full border-[100px] border-white/40 blur-[1px]"></div>
                <div className="absolute -bottom-[20%] -left-[10%] w-[800px] h-[800px] rounded-full border-[80px] border-white/40 blur-[1px]"></div>
                <div className="absolute top-[20%] left-[10%] w-4 h-4 rounded-full bg-[#7131F5]/20 blur-sm"></div>
                <div className="absolute bottom-[30%] right-[20%] w-8 h-8 rounded-full bg-[#0BCE94]/20 blur-sm"></div>
            </div>
        </div>
    );
}
