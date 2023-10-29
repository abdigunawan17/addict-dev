import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const authenticatedAPIRoutes = [
        pathname.startsWith("/api/users")
    ];

    if (authenticatedAPIRoutes.includes(true)) {
        
    }
}