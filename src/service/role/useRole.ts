import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "../useApiService";

export const useRoles = () => {
    const { ApiReq } = useAxiosAuth();

    return useQuery({
        queryKey: ["roles"],
        queryFn: async () => {
            const res = await ApiReq.get("/role");
            return res.data;
        },
    });
};
