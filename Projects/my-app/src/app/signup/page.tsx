"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    if (buttonDisabled || loading) return;

    try {
      setLoading(true);

      const response = await axios.post("/api/users/signup", user);

      toast.success(response.data.message);

      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex items-center text-gray-800 justify-center min-h-screen bg-linear-to-l from-blue-600 to-indigo-700 px-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        {/* Heading */}
        <h1 className="text-3xl text-gray-900 font-bold text-center mb-2">
          {loading ? "Creating Account..." : "Create Account"}
        </h1>

        <p className="text-gray-500 text-center mb-6">Signup to get started</p>

        {/* Username */}
        <div className="mb-4">
          <label className="block fon text-sm font-medium mb-1">Username</label>

          <input
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Enter username"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>

          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Password</label>

          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>

        {/* Button */}
        <button
          onClick={onSignup}
          disabled={buttonDisabled || loading}
          className={`w-full py-2 rounded-lg font-semibold text-white transition
            ${
              buttonDisabled || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {loading ? "Processing..." : "Signup"}
        </button>

        {/* Login link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
