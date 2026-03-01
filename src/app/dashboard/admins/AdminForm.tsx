import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AdminFormProps {
    initialData?: any;
    onSubmit: (data: any) => void;
    isLoading: boolean;
}

export function AdminForm({ initialData, onSubmit, isLoading }: AdminFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: initialData?.username || "",
            email: initialData?.email || "",
            password: "",
        }
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                    id="username"
                    {...register("username", { required: "Username is required" })}
                    placeholder="johndoe"
                />
                {errors.username && <p className="text-red-500 text-sm">{errors.username.message as string}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message as string}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">Password {initialData && "(Leave blank to keep current)"}</Label>
                <Input
                    id="password"
                    type="password"
                    {...register("password", { required: !initialData ? "Password is required" : false })}
                    placeholder="••••••••"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message as string}</p>}
            </div>

            <div className="flex justify-end pt-4">
                <Button type="submit" disabled={isLoading} className="bg-[#7131F5] hover:bg-[#6027DB]">
                    {isLoading ? "Saving..." : "Save Admin"}
                </Button>
            </div>
        </form>
    );
}
