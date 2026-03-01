import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosAuth from "../useApiService";
import toast from "react-hot-toast";

export const useUsers = () => {
    const { ApiReq } = useAxiosAuth();

    return useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await ApiReq.get("/user");
            return res.data;
        },
    });
};

export const useBanUser = () => {
    const { ApiReq } = useAxiosAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const res = await ApiReq.patch(`/user/${id}/ban`);
            return res.data;
        },
        onSuccess: () => {
            toast.success("User banned successfully");
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to ban/unban user");
        }
    });
};

export const useCreateUser = () => {
    const { ApiReq } = useAxiosAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: any) => {
            const res = await ApiReq.post("/user", data);
            return res.data;
        },
        onSuccess: () => {
            toast.success("User created successfully");
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to create user");
        }
    });
};

export const useUpdateUser = () => {
    const { ApiReq } = useAxiosAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string, data: any }) => {
            const res = await ApiReq.put(`/user/${id}`, data);
            return res.data;
        },
        onSuccess: () => {
            toast.success("User updated successfully");
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to update user");
        }
    });
};

export const useDeleteUser = () => {
    const { ApiReq } = useAxiosAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const res = await ApiReq.delete(`/user/${id}`);
            return res.data;
        },
        onSuccess: () => {
            toast.success("User deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to delete user");
        }
    });
};
