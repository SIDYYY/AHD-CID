// AdminSidebar.jsx
import React, { useState } from "react";
import {
  FiHome,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiVideo,
  FiX,
  FiMenu,
} from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../../supabase";

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile toggle button */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 bg-blue-900 text-white rounded-md shadow md:hidden"
        >
          <FiMenu size={22} />
        </button>
      )}

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-blue-900 text-white h-full w-64 transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        fixed md:relative z-50 md:translate-x-0 shrink-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-blue-800">
          <h1 className="text-xl font-bold">ADMIN</h1>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden">
            <FiX size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3 px-4 mt-6">
          <SidebarBtn
            icon={<FiHome />}
            label="Dashboard"
            active={isActive("/admin/adminDashboard")}
            onClick={() => navigate("/admin/adminDashboard")}
          />
          <SidebarBtn
            icon={<FiSettings />}
            label="Facility"
            active={isActive("/admin/facilities")}
            onClick={() => navigate("/admin/facilities")}
          />
          <SidebarBtn
            icon={<FiUsers />}
            label="Requests"
            active={isActive("/admin/providers")}
            onClick={() => navigate("/admin/providers")}
          />
          <button
              onClick={async () => {
                const { error } = await supabase.auth.signOut();
                if (error) {
                  console.error("Logout failed:", error.message);
                  return alert("Logout failed. Try again.");
                }
                // Redirect to login page after logout
                navigate("/");
              }}
              className="flex items-center gap-3 px-4 py-2 mt-8 rounded hover:bg-red-600"
            >
              <FiLogOut /> Logout
            </button>
        </nav>
      </aside>
    </>
  );
}

function SidebarBtn({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
      ${active ? "bg-blue-700" : "hover:bg-blue-800"}`}
    >
      {icon}
      {label}
    </button>
  );
}