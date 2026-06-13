// app/login/page.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Terminal } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    // Check if they just arrived from clicking the email verification link
    if (searchParams.get('verified') === 'true') {
      setSuccessMsg("Email verified successfully! You can now log in.");
      setIsLogin(true);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setIsLoading(true);

    if (isLogin) {
      // --- HANDLE LOGIN ---
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (res?.error) {
        setError(res.error);
      } else {
        router.push("/"); // Send them back to the homepage
      }
    } else {
      // --- HANDLE SIGNUP ---
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();

        if (res.ok) {
          setSuccessMsg(data.message);
          setFormData({ name: "", email: "", password: "" }); // Clear form
        } else {
          setError(data.message || "Something went wrong.");
        }
      } catch (err) {
        setError("Network error occurred.");
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Terminal size={24} className="text-blue-600" />
          <h1 className="text-2xl font-bold text-slate-900">HalfDigit AI</h1>
        </div>

        <h2 className="text-lg font-medium text-slate-600 text-center mb-6">
          {isLogin ? "Sign in to access the Assistant" : "Create Account"}
        </h2>

        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">{error}</div>}
        {successMsg && <div className="mb-4 p-3 bg-green-50 text-green-700 text-sm rounded-lg border border-green-100">{successMsg}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="border border-slate-200 p-3 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          )}
          <input
            type="email"
            placeholder="Work Email"
            className="border border-slate-200 p-3 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-slate-200 p-3 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button 
            type="submit" 
            disabled={isLoading}
            className="bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-400 mt-2"
          >
            {isLoading ? "Processing..." : (isLogin ? "Sign In" : "Send Activation Link")}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button 
            type="button" 
            onClick={() => { setIsLogin(!isLogin); setError(""); setSuccessMsg(""); }}
            className="text-blue-600 font-semibold hover:underline"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}