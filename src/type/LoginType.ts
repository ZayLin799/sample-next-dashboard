import { z } from "zod";

// Define the schema for admin login
export const loginSchema = z.object({
    identifier: z.string().min(3, "Username or email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

// Infer the type from the schema
export type LoginFormData = z.infer<typeof loginSchema>;

// Define the login response type
export interface LoginResponse {
    message: string;
    status: string;
    userType?: string;
    role?: string;
}

export interface ApiError {
    response?: {
        message?: string;
        data?: {
            message?: string;
        };
    };
    message?: string;
}
