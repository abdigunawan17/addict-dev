import { getJWTPayload } from "@/app/util/auth";
import { sql } from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const page = (searchParams.get("page") && parseInt(searchParams.get("page")!)) || 0;
    const limit = 4;
    const offset = page * 4;
    const jwtPayload = await getJWTPayload();

    const res = await sql(`
        SELECT p.*, u.username, u.avatar
        FROM posts p 
        INNER JOIN users u ON p.user_id = u.id 
        WHERE user_id IN (SELECT user_id FROM follows WHERE follower_id = $1)
        ORDER BY created_at DESC
        LIMIT $2
        OFFSET $3;
        `, [jwtPayload.sub, limit, offset]);

    return NextResponse.json({ data: res.rows });
}
