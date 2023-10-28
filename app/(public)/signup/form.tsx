'use client'

import { FormEvent, useState } from "react";

function Form() {
    
    const [username, setUsername] = useState<undefined | string>("");
    const [password, setPassword] = useState<undefined | string>("");
    const [confirmPassword, setconfirmPassword] = useState<undefined | string>("");
    const [errors, setErors] = useState<string[]>([]);

    async function handleSubmit(ev: FormEvent) {
        ev.preventDefault();

        // catch array errors
        setErors([]);

        if(password != confirmPassword) {
            errors.push("Heyy..password do not match!");
            return;
        }

        const response = await fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });

        if(response.ok) {
            window.location.href = "/feed";
        
        } else {
            alert("Sorry sign up failed!");
        }
    };

    return (
        <form className="flex flex-col gap-2 p-5 max-w-xs w-full bg-slate-800 rounded-lg" onSubmit={handleSubmit}>
            <div className="head text-center">
                <h3 className="font-semibold">Sign Up</h3>
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
            <div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="confirmpassword">Confirm Password</label>
                    <input 
                        className="text-black p-3 border border-slate-700 rounded-lg"
                        type="password"
                        onChange={(eve) => setconfirmPassword(eve.target.value)}
                        value={confirmPassword}
                        id="confirmpassword"
                        placeholder="Confirm Password"
                        required 
                    />
                </div>
            </div>
            <button className="mt-4 bg-slate-900 text-white p-3 rounded-lg" type="submit">Sign Up</button>
        </form>
    )
}

export default Form;