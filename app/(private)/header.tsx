"use client"

import useSWR from "swr"
import User from "../components/user";



export default function Header() {
    const { data, error, isLoading } = useSWR("/api/users/profile");

    if (error) return <div>Sorry..failed to load!</div>
    if (isLoading) return <div>Loading..</div>

    console.log(data);

    return (
        <header className="flex flex-row w-full p-5 bg-slate-800 rounded my-2 justify-between items-center">
            <div>
                <h1 className="font-mono text-lg">Welcome to Addct Dev</h1>
            </div>
            <div>
                <User user={data.data} />
            </div>
        </header>
    )
}