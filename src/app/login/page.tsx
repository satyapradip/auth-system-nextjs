"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState, FormEvent } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!user.email || !user.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      router.push("/");
    } catch (error: any) {
      console.log("Login failed", error);
      setError(error.response?.data?.error || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 text-sm text-red-700 bg-red-100 border border-red-400 rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={onLogin} className="space-y-5">
          {/* Email Input */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none"
            />
          </div>

          {/* Password Input */}
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="••••••••"
              className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link 
              href="/signup" 
              className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-200"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
