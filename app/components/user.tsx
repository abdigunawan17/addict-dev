import Link from "next/link";
import Image from "next/image";

function User({ user, href }: { user: UInterface, href?: string }) {
    return (
        <div>
            <Link href={`/${href || user.username}`} className="flex flex-row items-center">
                <div>
                    {user.avatar && (
                        <Image 
                            className="rounded-full mr-3"
                            src={user.avatar}
                            width={45}
                            height={45}
                            alt={user.username}
                        />
                    )}
                    {!user.avatar && (
                        <div 
                            className="bg-slate-600 rounded-full"
                            style={{ width:45, height: 45 }}
                        ></div>
                    )}
                </div>
                <div>
                    {user.username}
                </div>
            </Link>
        </div>
    )
}

export default User;