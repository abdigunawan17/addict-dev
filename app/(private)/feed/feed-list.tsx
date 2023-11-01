import Post from "@/app/components/post";
import useSWR from "swr";

function FeedList({index}: {index:number}) {
    const { data, error, isLoading } = useSWR("/api/posts/feed?page=" + index);

    if(error) return <div>Sorry..failed to load</div>
    if(isLoading) return <div>Loading..</div>

    return (
        <ul>
            {data.data.map((post: PostInterface) => {
                return (
                    <li className="my-5" key={post.id}>
                        <Post post={post} />
                    </li>
                );
            })}
        </ul>
    )
}

export default FeedList;