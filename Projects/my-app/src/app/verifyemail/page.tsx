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
    <div className="flex items-center justify-center min-h-screen text-gray-800 bg-linear-to-l from-blue-600 to-indigo-700 px-4">
      <div className="w-full  max-w-md bg-white shadow-lg rounded-xl p-8 text-center">
        {/* Title */}
        <h1 className="text-3xl text-gray-900 font-bold mb-2">
          Email Verification
        </h1>

        <p className="text-gray-500 mb-6">
          Please wait while we verify your email
        </p>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>

            <p className="text-blue-500 font-medium">Verifying your email...</p>
          </div>
        )}

        {/* Success */}
        {verified && (
          <div className="flex flex-col items-center">
            <div className="text-green-500 text-5xl mb-3">✅</div>

            <p className="text-green-600 font-semibold mb-4">
              Email verified successfully
            </p>

            <Link
              href="/login"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
            >
              Go to Login
            </Link>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex flex-col items-center">
            <div className="text-red-500 text-5xl mb-3">❌</div>

            <p className="text-red-600 font-semibold mb-4">
              Verification failed or link expired
            </p>

            <Link
              href="/signup"
              className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg font-semibold transition"
            >
              Signup Again
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
