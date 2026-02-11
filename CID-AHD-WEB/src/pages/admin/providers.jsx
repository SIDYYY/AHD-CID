import React, { useState } from "react";
import { FiMenu, FiEdit, FiPlus } from "react-icons/fi";
import Sidebar from "../components/sidebar";

export default function Providers() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Providers state
  const [providers, setProviders] = useState([
    { id: 1, name: "John Doe", contact: "09123456789", email: "john@example.com" },
    { id: 2, name: "Jane Smith", contact: "09234567890", email: "jane@example.com" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newProvider, setNewProvider] = useState({
    name: "",
    contact: "",
    email: "",
  });

  const handleAddProvider = () => {
    setProviders([
      ...providers,
      { id: providers.length + 1, ...newProvider },
    ]);
    setNewProvider({ name: "", contact: "", email: "" });
    setShowModal(false);
  };

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

        {/* Providers content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Table */}
          <div className="bg-white rounded-xl shadow overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Contact</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {providers.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{p.id}</td>
                    <td className="px-4 py-2">{p.name}</td>
                    <td className="px-4 py-2">{p.contact}</td>
                    <td className="px-4 py-2">{p.email}</td>
                    <td className="px-4 py-2">
                      <button className="flex items-center gap-1 bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500">
                        <FiEdit /> Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Add Provider</h3>

            <div className="space-y-3">
              <input
                placeholder="Name"
                className="w-full border px-3 py-2 rounded"
                value={newProvider.name}
                onChange={(e) =>
                  setNewProvider({ ...newProvider, name: e.target.value })
                }
              />
              <input
                placeholder="Contact"
                className="w-full border px-3 py-2 rounded"
                value={newProvider.contact}
                onChange={(e) =>
                  setNewProvider({ ...newProvider, contact: e.target.value })
                }
              />
              <input
                placeholder="Email"
                className="w-full border px-3 py-2 rounded"
                value={newProvider.email}
                onChange={(e) =>
                  setNewProvider({ ...newProvider, email: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button
                onClick={handleAddProvider}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
