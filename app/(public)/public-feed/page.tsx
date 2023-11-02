import Post from "@/app/components/post";
import { sql } from "@/db";

async function getData() {
    const res = await sql(`
        select p.*, u.avatar, u.username from posts p inner join users u on p.user_id = u.id order by created_at desc limit 10
    `);
    return res.rows;
}

export default async function PublicFeed() {
    const posts = await getData();
    return (
        <main>
            <h1 className="mb-4">Addict App</h1>
            <div>
                <h2 className="mb-4">Recent posts From the Community</h2>
                {posts.map((post) => {
                    return <Post post={post} key={post.id} />
                })}
            </div>
        </main>
    )
}