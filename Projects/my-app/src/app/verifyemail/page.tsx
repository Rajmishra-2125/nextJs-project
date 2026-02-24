"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const verifyUserEmail = async (token: string) => {
        try {
            await axios.post("/api/users/verifyemail", { token });
            setVerified(true);
        } catch (error: any) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // ✅ safer way to get token
        const params = new URLSearchParams(window.location.search);
        const urlToken = params.get("token");

        if (urlToken) {
            setToken(urlToken);
            verifyUserEmail(urlToken);
        } else {
            setLoading(false);
            setError(true);
        }
    }, []);

     return (
        <div className="flex flex-col items-center justify-center min-h-screen">
             <h1 className="text-3xl font-bold mb-4">Verify Email</h1>

        {loading && (
            <p className="text-blue-500">Verifying...</p>
        )}

        {verified && (
            <div className="text-green-500">
                <p>Email verified successfully ✅</p>
                <Link href="/login" className="text-blue-500 underline">
                    Go to Login
                </Link>
            </div>
        )}

        {error && (
            <div className="text-red-500">
                <p>Verification failed ❌</p>
            </div>
        )}

    </div>
);
    
}