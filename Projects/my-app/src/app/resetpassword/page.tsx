"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

function Page() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setsuccess] = useState(false);
  const [error, setError] = useState<any>(false);

  // Get token from url
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");

    if (urlToken) {
      setToken(urlToken);
    } else {
      setError("Invalid or missing reset token");
    }
  }, []);

  const resetPassword = async () => {
    try {
      if (!password || password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }

      setLoading(true);
      setError(false);

      await axios.post("/api/users/resetpassword", {
        token,
        password,
      });

      setsuccess(true);
    } catch (error: any) {
      setError(error?.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-2">Reset Password</h1>

        <p className="text-gray-500 text-center mb-6">
          Enter your new password below
        </p>

        {/* Success UI */}
        {success ? (
          <div className="text-center">
            <div className="text-green-600 font-semibold mb-4">
              ✅ Password reset successful
            </div>

            <Link
              href="/profile"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
            >
              Go to Profile
            </Link>
          </div>
        ) : (
          <>
            {/* Password Input */}
            <input
              type="password"
              placeholder="Enter new password"
              className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 mb-3 w-full rounded transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />

            {/* Error Message */}
            {error && <div className="text-red-500 text-sm mb-3">{error}</div>}

            {/* Reset Button */}
            <button
              onClick={resetPassword}
              disabled={loading || !password}
              className={`w-full py-3 rounded font-medium text-white transition
                ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                  Resetting...
                </span>
              ) : (
                "Reset Password"
              )}
            </button>

            {/* Back link */}
            <div className="text-center mt-4">
              <Link
                href="/Profile"
                className="text-blue-500 hover:underline text-sm"
              >
                Back to Profile
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Page;
