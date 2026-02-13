import React, { useState } from "react";
import { FiMenu, FiEdit, FiPlus } from "react-icons/fi";
import Sidebar from "../components/sidebar";

export default function Providers() {
  const [sidebarOpen, setSidebarOpen] = useState(true);


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col transition-all duration-300">
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow-md px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-200"
            >
              <FiMenu size={24} />
            </button>
            <h1 className="text-2xl font-bold">Providers</h1>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <FiPlus /> Add Provider
          </button>
        </header>

        
      </div>

    </div>
  );
}
