"use client";
import React, { useState, FormEvent } from 'react';
import { createClient } from "@/lib/supabase/client";

const RegisterPage = () => {

    const supabse = createClient();


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    async function handleRegister(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();


        setLoading(true);
        setMessage(" ");
        setError(" ");

        const { error } = await supabse.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name,
                },
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            setError(error.message);
        }
        else {
            setMessage(
                "RegistrationSuccessFully. Check your email to confirm your account.",
            );
        }

        setLoading(false);
    }
    return (
        <main>
            <h1>Create Account</h1>

            <form onSubmit={handleRegister}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email"> Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        minLength={6}
                        required
                    />
                </div>


                <button type="submit" disabled={loading}>
                    {loading ? "Creating Account..." : "Create Account"}
                </button>
            </form>


            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
        </main>
    );
}

export default RegisterPage