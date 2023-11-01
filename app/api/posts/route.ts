import { getJWTPayload } from "@/app/util/auth";
import { NextResponse } from "next/server";
import { sql } from "@/db";

export async function GET(request: Request) {
    const jwtPayload = await getJWTPayload();
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");
    const page = (searchParams.get("page") && parseInt(searchParams.get("page")!) || 0);
    const limit = 4;
    const offset = page * 4;

    const statement = `
        SELECT p.*, u.avatar, u.username
        FROM posts p INNER JOIN users u
        On p.user_id = u.id 
        WHERE user_id =  $1
        ORDER BY created_at desc
        LIMIT $2
        OFFSET $3
    `;

    if(username) {
        // TODO
        const userRes = await sql(
            "select * from users where username = $1", [username]
        );
        if(userRes.rowCount == 0) {
            return NextResponse.json({ error: "User not found"}, {status: 404});
        }
        const user = userRes.rows[0];
        const postsRes = await sql(statement, [user.id, limit, offset]);
        return NextResponse.json({ data: postsRes.rows });
    }

    const res = await sql(statement, [jwtPayload.sub, limit, offset]);

    return NextResponse.json({ data: res.rows });
}

export async function POST(request: Request) {
    const json = await request.json();
    const content = json.content;
    const jwtPayload = await getJWTPayload();
    const res = await sql(
        "insert into posts (user_id, content) values ($1, $2) returning *", [
            jwtPayload.sub,
            content
        ]);
    return NextResponse.json({ data: res.rows[0] }, {status: 201})
}