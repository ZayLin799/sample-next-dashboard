"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ApiError } from "@/type/LoginType";
import toast from "react-hot-toast";

const ReactQueryProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: false,
            },
            mutations: {
                onError: (error: any) => {
                    const apiErr = error as ApiError;
                    console.log(apiErr);
                    toast.error(
                        apiErr?.response?.data?.message ||
                        apiErr?.response?.message ||
                        "An error occurred"
                    );
                },
            },
        },
    });

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools
                initialIsOpen={process.env.NODE_ENV === "development"}
            />
            {children}
        </QueryClientProvider>
    );
};

export default ReactQueryProvider;
