"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";


function Form() {
    const router = useRouter();
    const [username, setUsername] = useState<undefined | string>("");
    const [password, setPassword] = useState<undefined | string>("");

    async function handleSubmit(ev: FormEvent) {
        ev.preventDefault();

        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });

        if(response.ok) {
            console.log("ok");
            router.push("/feed");
        
        } else {
            alert("Login failed");
        }
    };

    return (
        <form className="flex flex-col gap-2 p-5 max-w-xs w-full bg-slate-800 rounded-lg" onSubmit={handleSubmit}>
            <div className="head text-center">
                <h3 className="font-semibold">Sign In</h3>
            </div>
            <div className="my-3">
                <hr />
            </div>
            <div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="username">Username</label>
                    <input 
                        className="text-black p-3 border border-slate-700 rounded-lg"
                        type="text"
                        onChange={(eve) => setUsername(eve.target.value)}
                        value={username}
                        id="username"
                        placeholder="Username"
                        required
                    />
                </div>
            </div>
            <div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password">Password</label>
                    <input 
                        className="text-black p-3 border border-slate-700 rounded-lg"
                        type="password"
                        onChange={(eve) => setPassword(eve.target.value)}
                        value={password}
                        id="password"
                        placeholder="Password"
                        required 
                    />
                </div>
            </div>
            <button className="mt-4 bg-slate-900 text-white p-3 rounded-lg" type="submit">Sign In</button>
        </form>
    )
}

export default Form;