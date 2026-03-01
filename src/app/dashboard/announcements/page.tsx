"use client";

import { useState } from "react";
import { Send, AlertTriangle, Info, BellRing } from "lucide-react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { getBackendToken } from "@/app/actions";

export default function Announcements() {
    const [message, setMessage] = useState("");
    const [type, setType] = useState<"info" | "warning" | "alert">("info");
    const [isSending, setIsSending] = useState(false);

    const handleSendAnnouncement = async () => {
        if (!message.trim()) {
            toast.error("Please enter an announcement message");
            return;
        }

        setIsSending(true);

        try {
            const token = await getBackendToken();
            if (!token) {
                toast.error("Authentication required");
                setIsSending(false);
                return;
            }

            // Connect to websocket to send notification
            const socket = io("http://localhost:4000", {
                auth: { token }
            });

            socket.on("connect", () => {
                socket.emit("create_notification", {
                    message: `[${type.toUpperCase()}] ${message}`
                });
            });

            socket.on("notification_sent", (data) => {
                toast.success("Announcement broadcasted successfully!");
                setMessage("");
                socket.disconnect();
                setIsSending(false);
            });

            socket.on("error", (err) => {
                toast.error(err.message || "Failed to send announcement");
                socket.disconnect();
                setIsSending(false);
            });

            // Fallback timeout in case of no response
            setTimeout(() => {
                if (socket.connected) {
                    socket.disconnect();
                    setIsSending(false);
                    if (isSending) toast.error("Connection timeout");
                }
            }, 5000);

        } catch (error) {
            console.error(error);
            toast.error("Failed to connect to notification server");
            setIsSending(false);
        }
    };

    return (
        <div className="max-w-[1200px] mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1536]">System Announcements</h1>
                    <p className="text-sm text-[#6B7280] mt-1">
                        Broadcast critical alerts, maintenance schedules, or general info to Root and Admin users.
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8">
                <div className="max-w-3xl space-y-8">
                    {/* Message Input */}
                    <div className="space-y-3">
                        <label className="text-sm font-bold text-[#0B1536]">Announcement Message</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="e.g. The system will undergo scheduled maintenance from 2:00 AM to 4:00 AM UTC."
                            className="w-full min-h-[150px] p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7131F5] focus:border-transparent text-sm resize-none transition-shadow text-[#0B1536]"
                        />
                    </div>

                    {/* Announcement Type */}
                    <div className="space-y-3">
                        <label className="text-sm font-bold text-[#0B1536]">Announcement Type</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <button
                                onClick={() => setType("info")}
                                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${type === "info"
                                    ? "border-[#1268F1] bg-[#1268F1]/5"
                                    : "border-gray-100 bg-white hover:border-gray-200"
                                    }`}
                            >
                                <div className={`p-2 rounded-lg ${type === "info" ? "bg-[#1268F1] text-white" : "bg-gray-100 text-gray-500"}`}>
                                    <Info className="w-5 h-5" strokeWidth={2.5} />
                                </div>
                                <div className="text-left">
                                    <div className={`font-bold text-sm ${type === "info" ? "text-[#1268F1]" : "text-gray-700"}`}>Information</div>
                                    <div className="text-xs text-gray-500 mt-0.5">General updates</div>
                                </div>
                            </button>

                            <button
                                onClick={() => setType("warning")}
                                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${type === "warning"
                                    ? "border-[#F59E0B] bg-[#F59E0B]/5"
                                    : "border-gray-100 bg-white hover:border-gray-200"
                                    }`}
                            >
                                <div className={`p-2 rounded-lg ${type === "warning" ? "bg-[#F59E0B] text-white" : "bg-gray-100 text-gray-500"}`}>
                                    <AlertTriangle className="w-5 h-5" strokeWidth={2.5} />
                                </div>
                                <div className="text-left">
                                    <div className={`font-bold text-sm ${type === "warning" ? "text-[#F59E0B]" : "text-gray-700"}`}>Maintenance</div>
                                    <div className="text-xs text-gray-500 mt-0.5">Scheduled downtime</div>
                                </div>
                            </button>

                            <button
                                onClick={() => setType("alert")}
                                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${type === "alert"
                                    ? "border-[#EF4444] bg-[#EF4444]/5"
                                    : "border-gray-100 bg-white hover:border-gray-200"
                                    }`}
                            >
                                <div className={`p-2 rounded-lg ${type === "alert" ? "bg-[#EF4444] text-white" : "bg-gray-100 text-gray-500"}`}>
                                    <BellRing className="w-5 h-5" strokeWidth={2.5} />
                                </div>
                                <div className="text-left">
                                    <div className={`font-bold text-sm ${type === "alert" ? "text-[#EF4444]" : "text-gray-700"}`}>Critical Alert</div>
                                    <div className="text-xs text-gray-500 mt-0.5">Immediate action needed</div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Submit Section */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div className="text-sm text-gray-500 flex items-center gap-2">
                            <Info className="w-4 h-4" />
                            This will send a real-time notification to all connected Root and Admin users.
                        </div>
                        <button
                            onClick={handleSendAnnouncement}
                            disabled={isSending || !message.trim()}
                            className="bg-[#7131F5] hover:bg-[#6027DB] text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_8px_16px_-6px_rgba(113,49,245,0.4)]"
                        >
                            {isSending ? (
                                "Sending..."
                            ) : (
                                <>
                                    <Send className="w-4 h-4" strokeWidth={2.5} />
                                    Broadcast Now
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
