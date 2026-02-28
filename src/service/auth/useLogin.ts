import { LoginFormData } from "@/type/LoginType";
import useAxiosAuth from "../useApiService";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { encryptData } from "@/utils/encryption";

export const useLogin = () => {
    const { AuthReq } = useAxiosAuth();
    const router = useRouter();

    return useMutation({
        mutationFn: async (arg: LoginFormData) => {
            // Connect to unified backend login
            const payload = {
                identifier: arg.identifier,
                password: arg.password
            };

            const response = await AuthReq.post("/auth/admin/login", payload);
            return response.data;
        },

        onSuccess: (data: {
            message: string;
            status: string;
            userType?: string;
            role?: string;
            token?: string;
        }) => {
            toast.success("Login Successfully");

            if (data.userType) {
                const encryptedUserData = encryptData(data.userType);
                setCookie("user", encryptedUserData);
            }

            if (data.token) {
                // Fallback for Next routing
                setCookie("backend_token", data.token, { maxAge: 60 * 60 * 24 * 7 });
            }

            router.push("/dashboard");
        },
        // The ReactQueryProvider handles onError toast output automatically,
        // but we can add specifics here if needed.
    });
};
