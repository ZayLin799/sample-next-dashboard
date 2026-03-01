"use server";

import { cookies } from "next/headers";

export async function getBackendToken() {
    const cookieStore = await cookies();
    return cookieStore.get("backend_token")?.value;
}
