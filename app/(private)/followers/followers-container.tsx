
import { useState } from "react";
import FollowersList from "./followers-list";

function FollowersContainer() {
    const [count, setCount] = useState(1);

    const pages = [];

    for(let i = 0; i < count; i++) {
        pages.push(<FollowersList index={i} />);
    }

    return (
        <div>
            {pages}
            <div className="flex justify-center w-full">
                <button
                    onClick={() => setCount(count + 1)}
                    className="bg-slate-900 p-2 rounded-lg"
                >
                    Load more
                </button>
            </div>
        </div>
    )
}

export default FollowersContainer;