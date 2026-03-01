"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { useUsers, useBanUser, useCreateUser, useUpdateUser, useDeleteUser } from "@/service/user/useUser";
import { useCurrentUser } from "@/utils/hooks/useCurrentUser";
import useConfirmDialogStore from "@/store/ConfirmationBoxStore";
import { Ban, CheckCircle, Edit2, Plus, Trash2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { UserForm } from "./UserForm";

export default function UsersPage() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [editUser, setEditUser] = useState<any>(null);

    const { data: usersData, isLoading, refetch } = useUsers();
    const { data: currentUser } = useCurrentUser();
    const userRole = currentUser?.data?.role?.name; // "root", "developer", or "admin"
    const isAdmin = userRole === "admin";

    const banUser = useBanUser();
    const createUser = useCreateUser();
    const updateUser = useUpdateUser();
    const deleteUser = useDeleteUser();
    const { openConfirmDialog } = useConfirmDialogStore();

    const onSubmit = (data: any) => {
        if (editUser) {
            updateUser.mutate({ id: editUser.id, data }, {
                onSuccess: () => {
                    setIsMenuOpen(false);
                    setEditUser(null);
                }
            });
        } else {
            createUser.mutate(data, {
                onSuccess: () => {
                    setIsMenuOpen(false);
                }
            });
        }
    };

    const handleDelete = (id: string, username: string) => {
        openConfirmDialog(
            () => deleteUser.mutate(id),
            "Delete User",
            `Are you sure you want to delete ${username}? This action cannot be undone.`
        );
    };

    // Client-side filtering and pagination (since backend API currently returns all users at once)
    const allUsers = Array.isArray(usersData?.data) ? usersData.data : (Array.isArray(usersData) ? usersData : []);

    // 1. Filter
    const filteredUsers = allUsers.filter((u: any) =>
        u.username.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    // 2. Paginate
    const totalItems = filteredUsers.length;
    const totalPages = Math.ceil(totalItems / limit) || 1;
    const currentUsers = filteredUsers.slice((page - 1) * limit, page * limit);

    const handleBan = (id: string, username: string, isBanned: boolean) => {
        openConfirmDialog(
            () => banUser.mutate(id),
            isBanned ? "Unban User" : "Ban User",
            `Are you sure you want to ${isBanned ? 'unban' : 'ban'} ${username}?`
        );
    };

    const columns: any[] = [
        { key: "username", header: "Username" },
        { key: "email", header: "Email" },
        {
            key: "status",
            header: "Status",
            render: (user: any) => (
                <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${user.isBanned ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    {user.isBanned ? 'Banned' : 'Active'}
                </span>
            )
        },
        {
            key: "createdBy",
            header: "Created By",
            render: (user: any) => user.createdBy?.username || "-"
        },
        {
            key: "updatedBy",
            header: "Updated By",
            render: (user: any) => user.updatedBy?.username || "-"
        },
        {
            key: "bannedBy",
            header: "Banned By",
            render: (user: any) => user.bannedBy?.username || "-"
        },
        {
            key: "createdAt",
            header: "Joined Date",
            render: (user: any) => new Date(user.createdAt).toLocaleDateString()
        },
    ];

    if (isAdmin) {
        columns.push({
            key: "actions",
            header: "Actions",
            className: "text-right",
            render: (user: any) => (
                <div className="flex items-center justify-end gap-2">
                    <button
                        onClick={() => handleBan(user.id, user.username, user.isBanned)}
                        title={user.isBanned ? "Unban User" : "Ban User"}
                        className={`p-1.5 transition-colors rounded-lg hover:bg-gray-100 ${user.isBanned ? 'text-green-500 hover:text-green-600' : 'text-orange-400 hover:text-orange-500'}`}
                    >
                        {user.isBanned ? <CheckCircle className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                    </button>
                    <button
                        onClick={() => {
                            setEditUser(user);
                            setIsMenuOpen(true);
                        }}
                        className="p-1.5 text-gray-400 hover:text-[#1268F1] transition-colors rounded-lg hover:bg-gray-100"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => handleDelete(user.id, user.username)}
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
                    <h1 className="text-2xl font-bold text-[#0B1536]">Users</h1>
                    <p className="text-sm text-[#6B7280] mt-1">
                        View all user accounts registered in the application.
                    </p>
                </div>

                {isAdmin && (
                    <Dialog open={isMenuOpen} onOpenChange={(open) => {
                        setIsMenuOpen(open);
                        if (!open) setEditUser(null);
                    }}>
                        <DialogTrigger asChild>
                            <button className="bg-[#7131F5] hover:bg-[#6027DB] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm">
                                <Plus className="w-4 h-4" strokeWidth={3} />
                                Add User
                            </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-bold text-[#0B1536]">
                                    {editUser ? "Update User" : "Add User"}
                                </DialogTitle>
                            </DialogHeader>
                            <div className="mt-4">
                                <UserForm
                                    initialData={editUser}
                                    onSubmit={onSubmit}
                                    isLoading={createUser.isPending || updateUser.isPending}
                                />
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
            </div>

            <DataTable
                columns={columns}
                data={currentUsers}
                isLoading={isLoading}
                searchValue={search}
                onSearchChange={(val) => {
                    setSearch(val);
                    setPage(1); // Reset to first page on search
                }}
                currentPage={page}
                onPageChange={setPage}
                pageSize={limit}
                onPageSizeChange={(val) => {
                    setLimit(val);
                    setPage(1);
                }}
                totalItems={totalItems}
                totalPages={totalPages}
                onRefresh={refetch}
                emptyMessage="No users found."
            />
        </div>
    );
}
