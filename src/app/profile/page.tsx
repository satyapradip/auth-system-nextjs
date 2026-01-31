"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      setLoading(true);
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error) {
      console.log("Logout failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-2xl text-center">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <hr className="border-gray-300" />
        <h3 className="text-xl text-gray-700">Profile Page</h3>
        
        <button
          onClick={logout}
          disabled={loading}
          className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200 disabled:opacity-50"
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}
