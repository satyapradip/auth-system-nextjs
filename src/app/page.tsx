"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log("Logout failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-2xl shadow-2xl text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome! 🎉
          </h1>
          <p className="text-lg text-gray-600">
            You are successfully logged in to your account
          </p>
        </div>

        <div className="pt-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/profile/123"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200"
            >
              View Profile
            </Link>
            
            <button
              onClick={handleLogout}
              disabled={loading}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging out..." : "Logout"}
            </button>
          </div>

          <div className="pt-4 text-sm text-gray-500">
            <p>Don't have an account yet?</p>
            <Link 
              href="/signup" 
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Sign up here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
