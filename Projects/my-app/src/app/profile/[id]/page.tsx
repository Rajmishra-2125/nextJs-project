"use client";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function UserProfile({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-l from-blue-600 to-indigo-700 px-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-3xl font-bold text-indigo-600 shadow">
            {id?.charAt(0)?.toUpperCase()}
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mt-4">
            User Profile
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Your unique profile identifier
          </p>
        </div>

        {/* Divider */}
        <div className="border-t my-6"></div>

        {/* Profile Info */}
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border">
            <p className="text-sm text-gray-500">User ID</p>
            <p className="text-lg font-semibold text-gray-800 break-all">
              {id}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => window.history.back()}
            className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
          >
            Go Back
          </button>

          <button
            onClick={() => (window.location.href = "/profile")}
            className="flex-1 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow"
          >
            Profile Home
          </button>
        </div>
      </div>
    </div>
  );
}
