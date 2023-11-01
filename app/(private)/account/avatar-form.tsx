import Image from "next/image";
import useSWR from "swr";

export default function AvatarForm() {
    const { data, error, isLoading } = useSWR("/api/users/profile");

    if(error) return <div>Sorry..failed to load</div>
    if(isLoading) return <div>Loading..</div>

    const user = data.data;

    return (
        <form >
            {user.avatar && (
                <div>
                    <Image 
                        className="rounded-full m-auto my-5"
                        src={user.avatar}
                        alt={user.avatar}
                        width={125}
                        height={125}
                    />
                </div>
            )}
            {!user.avatar && (
                <div
                    className="bg-slate-600 rounded-full m-auto my-5"
                    style={{ width: 125, height: 125 }}
                >

                </div>
            )}
            <input type="file" />
        </form>
    )
}