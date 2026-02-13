// src/components/AdminSidebar.jsx
import React from "react";
import { FiHome, FiUsers, FiSettings, FiLogOut } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

export default function AdminSidebar({ sidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation(); // for active link highlighting

  // Helper to check if the current route is active
  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className={`bg-blue-900 text-white w-64 space-y-6 py-7 px-4 transition-all duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} 
        fixed md:relative h-full`}
    >
      <div className="text-2xl font-bold mb-8 text-center">FACILITY</div>

      <nav className="flex flex-col gap-3">
        <button
          onClick={() => navigate("/provider/providerDashboard")}
          className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-800 transition ${
            isActive("/provider/providerDashboard") ? "bg-blue-700" : ""
          }`}
        >
          <FiHome size={20} /> Dashboard
        </button>

        <button
          onClick={() => navigate("/provider/request")}
          className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-800 transition ${
            isActive("/provider/request") ? "bg-blue-700" : ""
          }`}
        >
          <FiSettings size={20} /> Request
        </button>

        <button
          onClick={() => navigate("/admin/providers")}
          className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-800 transition ${
            isActive("/admin/providers") ? "bg-blue-700" : ""
          }`}
        >
          <FiUsers size={20} /> Services
        </button>

        <button
          onClick={() => navigate("/admin/settings")}
          className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-800 transition ${
            isActive("/admin/settings") ? "bg-blue-700" : ""
          }`}
        >
          <FiSettings size={20} /> Settings
        </button>

        <button
          onClick={() => navigate("/logout")}
          className="flex items-center gap-3 px-4 py-2 hover:bg-red-600 rounded mt-auto"
        >
          <FiLogOut size={20} /> Logout
        </button>
      </nav>
    </aside>
  );
}
