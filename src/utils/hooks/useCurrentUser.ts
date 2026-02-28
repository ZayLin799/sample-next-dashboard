"use client";
import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "@/service/useApiService";

export const useCurrentUser = () => {
    const { ApiReq } = useAxiosAuth();

    return useQuery({
        queryKey: ["currentUser"],
        queryFn: async () => {
            const response = await ApiReq.get("/auth/admin/me");
            return response.data;
        },
        retry: false,
    });
};
