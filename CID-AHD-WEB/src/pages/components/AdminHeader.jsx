// src/components/admin/AdminHeader.jsx
import { FiMenu, FiLogOut } from "react-icons/fi";

export default function AdminHeader({ toggleSidebar }) {
  return (
    <header className="flex items-center justify-between bg-white shadow-md px-6 py-4">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-md hover:bg-gray-200"
        >
          <FiMenu size={24} />
        </button>
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-gray-600">Admin</span>

        <button
          className="flex items-center gap-2 text-red-600 hover:text-red-700"
        >
          <FiLogOut />
          Logout
        </button>
      </div>
    </header>
  );
}
