import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const authenticatedAPIRoutes = [
        pathname.startsWith("/api/users"), 
        pathname.startsWith("/api/posts"),
        pathname.startsWith("/api/follows"),
    ];

    if (authenticatedAPIRoutes.includes(true)) {
        const cookies = request.cookies.get("jwt-token");

        if (!cookies || !cookies?.value) {
            return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
        }

        try {

            const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
            await jwtVerify(cookies.value, secret);

        } catch (error) {
            
            console.error(error);

            return NextResponse.json({ 
                error: "Unfortunatelly you unauthenticated" 
            }, {
                status: 401
            });

        }
    }
}

export const config = {
    matcher: "/:path*",
};