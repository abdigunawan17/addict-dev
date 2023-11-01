import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteBtn({post}: { post: PostInterface }) {
    const router = useRouter();
    const [state, setState] = useState({showConfirm: false});

    async function handleHapusPost() {
        const res = await fetch("/api/posts/" + post.id, {
            method: "DELETE",
        });
        if(res.ok) {
            router.push("/profile");
        }
    }

    function handleKlik() {
        //const newState = Object.assign({}, state, {showConfim: !state.showConfim});
        //state.showConfim = !state.showConfim;
        //setState(newState);
        setState({ ...state, showConfirm: !state.showConfirm });
    }

    return (
        <div>
            {!state.showConfirm && (
                <button className="text-red-400" onClick={handleKlik}>
                    Delete post
                </button>
            )}

            {state.showConfirm && (
                <div>
                    <p>Are you sure want to delete this post?</p>
                    <div className="flex flex-row gap-10">
                        <button className="text-red-400" onClick={handleHapusPost}>Yes</button>
                        <button className="text-blue-400" onClick={handleKlik}>No</button>
                    </div>
                </div>
            )}
        </div>
    )
}