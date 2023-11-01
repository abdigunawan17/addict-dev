import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

function Form(
    {post}:
    {post: PostInterface}
    ){
        const router = useRouter();
        const [content, setContent] = useState(post.content);

        async function handleSubmit(eve: FormEvent) {
            eve.preventDefault();

            const res = await fetch("/api/posts/" + post.id, {
                method: "PATCH",
                body: JSON.stringify({content: content})
            })
            if(res.ok) {
                setContent("");
                router.push("/profile")
            }
        }

        return (
            <form onSubmit={handleSubmit}>
                <textarea 
                    className="bg-gray-700 p-2 rounded-lg w-full my-2"
                    rows={3}
                    placeholder="What is happening?"
                    onChange={(ev) => setContent(ev.target.value)}
                    value={content}
                ></textarea>
                <button 
                    type="submit"
                    className="bg-slate-900 p-2 rounded-lg"
                >Update Post</button>
            </form>
        )
    }

export default Form;