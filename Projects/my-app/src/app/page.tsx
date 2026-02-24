import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-linear-to-l from-blue-600 to-indigo-700">
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">👋 Welcome</h1>

        <p className="text-gray-600 mb-6">
          Hi User, nice to meet you ✅ Your authentication system is ready.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/profile"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
