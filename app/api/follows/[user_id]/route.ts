import { getJWTPayload } from "@/app/util/auth";
import { sql } from "@/db";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    {params}: {params: {user_id: number}}
    ) {
    const jwtPayload = await getJWTPayload();
    const user_id = params.user_id;

    await sql(
        "delete from follows where user_id = $1 and follower_id =$2",
        [user_id, jwtPayload.sub]
        );
        
    return NextResponse.json({ msg: "Follow deleted"});
}