// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import bcrypt from "bcryptjs";

export default function Login() {
  const navigate = useNavigate();

  const [contact_no, setContactNo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // ✅ prevent page reload
    setLoading(true);
    setError("");

    try {
      // 1️⃣ Fetch user by contact number
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("contact_no", contact_no.trim())
        .single();

      if (error || !data) {
        throw new Error("Invalid credentials");
      }

      // 2️⃣ Compare hashed password
      const isMatch = await bcrypt.compare(password, data.password);
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }

      // 3️⃣ Block mobile-only users
      if (data.role === "user") {
        throw new Error("This account is for mobile app use only");
      }

      // 4️⃣ Role-based redirect
      if (data.role === "admin") {
        navigate("/admin/adminDashboard");
      } else if (data.role === "provider") {
        navigate("/provider/providerDashboard");
      } else {
        throw new Error("Unauthorized role");
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          DASH Login
        </h2>

        {/* Error message */}
        {error && (
          <p className="bg-red-100 text-red-700 p-3 mb-4 rounded text-center">
            {error}
          </p>
        )}

        {/* Contact Number */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">
            Contact Number
          </label>
          <input
            type="tel"
            value={contact_no}
            onChange={(e) => setContactNo(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block mb-1 font-semibold">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
