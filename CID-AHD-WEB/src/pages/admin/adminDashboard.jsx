// src/pages/admin/AdminDashboard.jsx
import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import Sidebar from "../components/sidebar";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} />
      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow-md px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-200"
            >
              <FiMenu size={24} />
            </button>
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-600">Admin</span>
            <img
              src="/assets/images/admin-avatar.jpg"
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h2 className="font-semibold text-lg mb-2">Total Users</h2>
              <p className="text-3xl font-bold text-blue-900">150</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h2 className="font-semibold text-lg mb-2">Active Providers</h2>
              <p className="text-3xl font-bold text-blue-900">42</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h2 className="font-semibold text-lg mb-2">Pending Requests</h2>
              <p className="text-3xl font-bold text-blue-900">8</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
