import React, { useState, useEffect } from "react";
import { FiMenu, FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import Sidebar from "../components/sidebar";
import { supabase } from "../../supabase";

export default function Providers() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [providers, setProviders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    contact_person: "",
    email: "",
  });

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    const { data, error } = await supabase
      .from("providers")
      .select("*")
      .order("id", { ascending: true });

    if (!error) setProviders(data);
  };

  // ✅ ADD OR UPDATE PROVIDER
  const handleSubmit = async () => {
    if (!formData.name) return alert("Name is required");

    if (isEditing) {
      await supabase
        .from("providers")
        .update(formData)
        .eq("id", selectedId);
    } else {
      await supabase.from("providers").insert([
        {
          ...formData,
          is_active: true,
        },
      ]);
    }

    setShowModal(false);
    setFormData({ name: "", address: "", phone: "", contact_person: "", email: "" });
    setIsEditing(false);
    fetchProviders();
  };

  // ✅ EDIT BUTTON
  const handleEdit = (provider) => {
    setIsEditing(true);
    setSelectedId(provider.id);
    setFormData({
      name: provider.name,
      address: provider.address,
      phone: provider.phone,
      contact_person: provider.contact_person,
      email: provider.email,
    });
    setShowModal(true);
  };

  // ✅ DELETE PROVIDER
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this provider?"))
      return;

    await supabase.from("providers").delete().eq("id", id);
    fetchProviders();
  };

  // ✅ TOGGLE ACTIVE STATUS
  const toggleStatus = async (provider) => {
    await supabase
      .from("providers")
      .update({ is_active: !provider.is_active })
      .eq("id", provider.id);

    fetchProviders();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} />

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
            onClick={() => {
              setIsEditing(false);
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <FiPlus /> Add Provider
          </button>
        </header>

        {/* Table */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white rounded-xl shadow overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Address</th>
                  <th className="px-4 py-2">Phone</th>
                  <th className="px-4 py-2">Contact Person</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>

              <tbody>
                {providers.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{p.id}</td>
                    <td className="px-4 py-2">{p.name}</td>
                    <td className="px-4 py-2">{p.address}</td>
                    <td className="px-4 py-2">{p.phone}</td>
                    <td className="px-4 py-2">{p.contact_person}</td>
                    <td className="px-4 py-2">{p.email}</td>

                    <td className="px-4 py-2">
                      <button
                        onClick={() => toggleStatus(p)}
                        className={`px-3 py-1 rounded text-white text-sm ${
                          p.is_active
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {p.is_active ? "Active" : "Inactive"}
                      </button>
                    </td>

                    <td className="px-4 py-2 flex gap-3">
                      <button
                        onClick={() => handleEdit(p)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FiEdit />
                      </button>

                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FiTrash2 />
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
            <h3 className="text-xl font-bold mb-4">
              {isEditing ? "Edit Provider" : "Add Provider"}
            </h3>

            <div className="space-y-3">
              <input
                placeholder="Name"
                className="w-full border px-3 py-2 rounded"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                placeholder="Address"
                className="w-full border px-3 py-2 rounded"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
              <input
                placeholder="Phone"
                className="w-full border px-3 py-2 rounded"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
              <input
                placeholder="Email"
                className="w-full border px-3 py-2 rounded"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                {isEditing ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
