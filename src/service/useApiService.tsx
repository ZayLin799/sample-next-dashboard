import axios from "axios";
import { useRouter } from "next/navigation";

const API_URL = "http://localhost:4000/api";

const ApiReq = axios.create({
    baseURL: API_URL,
    timeout: 50000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

const AuthReq = axios.create({
    baseURL: API_URL,
    timeout: 50000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

const logout = async () => {
    try {
        await AuthReq.post("/auth/admin/logout");
    } catch (e) {
        console.log(e);
    }
};

const useAxiosAuth = () => {
    const router = useRouter();

    ApiReq.interceptors.request.use(
        (config) => {
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    ApiReq.interceptors.response.use(
        async (response) => {
            return response;
        },
        async (error) => {
            console.log('=== AXIOS ERROR ===', error.response?.data);
            if (error.response?.status === 401) {
                await logout();
                router.push("/login");
            } else {
                return Promise.reject(error);
            }
        }
    );

    return {
        AuthReq,
        ApiReq,
    };
};

export default useAxiosAuth;
