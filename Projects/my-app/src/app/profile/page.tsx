"use client";

import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

function ProfilePage() {
  const router = useRouter();

  const [data, setData] = useState("nothing");
  const [user, setUser] = useState<any>(null);

  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);

  const logout = async () => {
    try {
      setLoadingLogout(true);

      await axios.get("/api/users/logout");

      toast.success("Logout successfully");

      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoadingLogout(false);
    }
  };

  const getUserDetails = async () => {
    try {
      setLoadingUser(true);

      const res = await axios.get("/api/users/me");

      console.log(res.data);

      setData(res.data.data._id);
      setUser(res.data.data);

      toast.success("User loaded");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoadingUser(false);
    }
  };

  const getForgetPassword = async () => {
    try {
      if (!user?.email) {
        toast.error("Load user first");
        return;
      }

      setLoadingReset(true);

      const res = await axios.post("/api/users/forgetpassword", {
        email: user.email,
      });

      toast.success(res.data.message);
    } catch (error: any) {
      console.log(error.response?.data?.error);
      toast.error(error.response?.data?.error);
    } finally {
      setLoadingReset(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        {/* Title */}
        <h1 className="text-3xl text-gray-900 font-bold text-center mb-2">Profile</h1>

        <p className="text-gray-500 text-center mb-6">Manage your account</p>

        {/* User Info Card */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="text-sm text-gray-500 mb-1">User ID</div>

          <div className="font-medium break-all">
            {data === "nothing" ? (
              <span className="text-gray-400">Not loaded</span>
            ) : (
              <Link
                href={`profile/${data}`}
                className="text-blue-500 hover:underline"
              >
                {data}
              </Link>
            )}
          </div>

          {user && (
            <>
              <div className="text-sm text-gray-500 mt-3">Email</div>

              <div className="font-medium break-all text-blue-500 ">
                {user.email}
              </div>
            </>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={getUserDetails}
            disabled={loadingUser}
            className={`py-2 rounded font-medium text-white transition
            ${loadingUser ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
          >
            {loadingUser ? "Loading..." : "Load User Details"}
          </button>

          <button
            onClick={getForgetPassword}
            disabled={loadingReset}
            className={`py-2 rounded font-medium text-white transition
            ${loadingReset ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"}`}
          >
            {loadingReset ? "Sending Email..." : "Reset Password"}
          </button>

          <button
            onClick={logout}
            disabled={loadingLogout}
            className={`py-2 rounded font-medium text-white transition
            ${loadingLogout ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
          >
            {loadingLogout ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
