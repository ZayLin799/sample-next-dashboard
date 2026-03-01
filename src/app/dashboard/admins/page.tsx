"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { useAdmins, useCreateAdmin, useUpdateAdmin, useDeleteAdmin, useBanAdmin } from "@/service/admin/useAdmin";
import { useCurrentUser } from "@/utils/hooks/useCurrentUser";
import { AdminForm } from "./AdminForm";
import useConfirmDialogStore from "@/store/ConfirmationBoxStore";
import { Plus, Edit2, Trash2, Ban, CheckCircle } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function AdminsPage() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [editAdmin, setEditAdmin] = useState<any>(null);

    const { data: adminResponse, isLoading, refetch } = useAdmins(page, limit, search);
    const { data: currentUser } = useCurrentUser();
    const userRole = currentUser?.data?.role?.name; // "root" or "developer"

    const isRoot = userRole === "root";

    const createAdmin = useCreateAdmin();
    const updateAdmin = useUpdateAdmin();
    const deleteAdmin = useDeleteAdmin();
    const banAdmin = useBanAdmin();
    const { openConfirmDialog } = useConfirmDialogStore();

    const handleBan = (id: string, username: string, isBanned: boolean) => {
        openConfirmDialog(
            () => banAdmin.mutate(id),
            isBanned ? "Unban User" : "Ban User",
            `Are you sure you want to ${isBanned ? "unban" : "ban"} ${username}?`
        );
    };

    const onSubmit = (data: any) => {
        if (editAdmin) {
            updateAdmin.mutate({ id: editAdmin.id, data }, {
                onSuccess: () => {
                    setIsMenuOpen(false);
                    setEditAdmin(null);
                }
            });
        } else {
            createAdmin.mutate(data, {
                onSuccess: () => {
                    setIsMenuOpen(false);
                }
            });
        }
    };

    const handleDelete = (id: string, username: string) => {
        openConfirmDialog(
            () => deleteAdmin.mutate(id),
            "Delete Admin",
            `Are you sure you want to delete ${username}? This action cannot be undone.`
        );
    };

    // Prepare columns
    const columns: any[] = [
        { key: "username", header: "Username" },
        { key: "email", header: "Email" },
        {
            key: "role",
            header: "Role",
            render: (admin: any) => (
                <span className="bg-[#1268F1]/10 text-[#1268F1] px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {admin.role?.name || "Unknown"}
                </span>
            )
        },
        {
            key: "status",
            header: "Status",
            render: (admin: any) => (
                <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${admin.isBanned ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    {admin.isBanned ? 'Banned' : 'Active'}
                </span>
            )
        },
        {
            key: "createdBy",
            header: "Created By",
            render: (admin: any) => admin.createdBy?.username || "-"
        },
        {
            key: "createdAt",
            header: "Created",
            render: (admin: any) => new Date(admin.createdAt).toLocaleDateString()
        },
    ];

    if (isRoot) {
        columns.push({
            key: "actions",
            header: "Actions",
            className: "text-right",
            render: (admin: any) => (
                <div className="flex items-center justify-end gap-2">
                    <button
                        onClick={() => handleBan(admin.id, admin.username, admin.isBanned)}
                        title={admin.isBanned ? "Unban User" : "Ban User"}
                        className={`p-1.5 transition-colors rounded-lg hover:bg-gray-100 ${admin.isBanned ? 'text-green-500 hover:text-green-600' : 'text-orange-400 hover:text-orange-500'}`}
                    >
                        {admin.isBanned ? <CheckCircle className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                    </button>
                    <button
                        onClick={() => {
                            setEditAdmin(admin);
                            setIsMenuOpen(true);
                        }}
                        className="p-1.5 text-gray-400 hover:text-[#1268F1] transition-colors rounded-lg hover:bg-gray-100"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => handleDelete(admin.id, admin.username)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-gray-100"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            )
        });
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1536]">System Admins</h1>
                    <p className="text-sm text-[#6B7280] mt-1">
                        Manage backend administrators.
                    </p>
                </div>

                {isRoot && (
                    <Dialog open={isMenuOpen} onOpenChange={(open) => {
                        setIsMenuOpen(open);
                        if (!open) setEditAdmin(null);
                    }}>
                        <DialogTrigger asChild>
                            <button className="bg-[#7131F5] hover:bg-[#6027DB] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm">
                                <Plus className="w-4 h-4" strokeWidth={3} />
                                Add Admin
                            </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-bold text-[#0B1536]">
                                    {editAdmin ? "Update Admin" : "Add Admin"}
                                </DialogTitle>
                            </DialogHeader>
                            <div className="mt-4">
                                <AdminForm
                                    initialData={editAdmin}
                                    onSubmit={onSubmit}
                                    isLoading={createAdmin.isPending || updateAdmin.isPending}
                                />
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
            </div>

            <DataTable
                columns={columns}
                data={adminResponse?.data || []}
                isLoading={isLoading}
                searchValue={search}
                onSearchChange={setSearch}
                currentPage={page}
                onPageChange={setPage}
                pageSize={limit}
                onPageSizeChange={setLimit}
                totalItems={adminResponse?.meta?.total || 0}
                totalPages={adminResponse?.meta?.totalPages || 1}
                onRefresh={refetch}
                emptyMessage="No administrators found."
            />
        </div>
    );
}
