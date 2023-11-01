import { sql } from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, 
    {params}: 
    { params: {id: string}}
    ) {
    const {searchParams} = new URL(request.url);
    const page = (searchParams.get("page") && parseInt(searchParams.get("page")!)) || 0;

    const limit = 2;
    const offset = page * 2;
    const id =  params.id;
    const res = await sql(`
        SELECT u.id, u.username, u.avatar
        FROM users u
        INNER JOIN follows f on u.id = f.follower_id
        WHERE user_id = $1 
        LIMIT $2
        OFFSET $3
    `, [id, limit, offset]);

    return NextResponse.json({ data: res.rows })
}