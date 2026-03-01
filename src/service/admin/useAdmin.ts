import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosAuth from "../useApiService";
import toast from "react-hot-toast";

export const useAdmins = (page = 1, limit = 10, search = "") => {
    const { ApiReq } = useAxiosAuth();

    return useQuery({
        queryKey: ["admins", page, limit, search],
        queryFn: async () => {
            const res = await ApiReq.get("/admin", {
                params: { page, limit, search }
            });
            return res.data;
        },
    });
};

export const useCreateAdmin = () => {
    const { ApiReq } = useAxiosAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: any) => {
            const res = await ApiReq.post("/admin", data);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Admin created successfully");
            queryClient.invalidateQueries({ queryKey: ["admins"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to create admin");
        }
    });
};

export const useUpdateAdmin = () => {
    const { ApiReq } = useAxiosAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string, data: any }) => {
            const res = await ApiReq.put(`/admin/${id}`, data);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Admin updated successfully");
            queryClient.invalidateQueries({ queryKey: ["admins"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to update admin");
        }
    });
};

export const useDeleteAdmin = () => {
    const { ApiReq } = useAxiosAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const res = await ApiReq.delete(`/admin/${id}`);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Admin deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["admins"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to delete admin");
        }
    });
};

export const useBanAdmin = () => {
    const { ApiReq } = useAxiosAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const res = await ApiReq.patch(`/admin/${id}/ban`);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Admin ban status updated successfully");
            queryClient.invalidateQueries({ queryKey: ["admins"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to update admin ban status");
        }
    });
};
