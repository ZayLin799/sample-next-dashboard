import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function proxy(request: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get("backend_token");
    const { pathname } = request.nextUrl;

    // If no token, redirect to login
    if (pathname === "/" && token) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (pathname === "/" && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    if (pathname === "/login" && token) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // If accessing a protected route without a token, redirect to login
    if (pathname.startsWith("/dashboard") && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    // If token exists, allow access to the dashboard
    return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
    matcher: ["/dashboard/:path*", "/login", "/"], // Protect all routes under /dashboard
};
