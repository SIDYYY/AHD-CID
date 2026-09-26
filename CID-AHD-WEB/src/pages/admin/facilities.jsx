import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { FiMenu, FiSearch } from "react-icons/fi";
import { supabase } from "../../supabase";

export default function Facilities() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [facilities, setFacilities] = useState([]);
  const [filteredFacilities, setFilteredFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact_person: "",
    contact_number: "",
    is_active: true,
  });

  /* ---------------- FETCH FACILITIES ---------------- */

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("facilities")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setFacilities(data || []);
      setFilteredFacilities(data || []);
    }

    setLoading(false);
  };

  /* ---------------- SEARCH FILTER ---------------- */

  useEffect(() => {
    const keyword = search.toLowerCase();

    const filtered = facilities.filter((f) =>
      f.name?.toLowerCase().includes(keyword) ||
      f.address?.toLowerCase().includes(keyword) ||
      f.contact_person?.toLowerCase().includes(keyword) ||
      f.contact_number?.toLowerCase().includes(keyword)
    );

    setFilteredFacilities(filtered);
  }, [search, facilities]);

  /* ---------------- MODAL HANDLERS ---------------- */

  const openEditModal = (facility) => {
    setSelectedFacility(facility);
    setFormData({
      name: facility.name,
      address: facility.address,
      contact_person: facility.contact_person || "",
      contact_number: facility.contact_number || "",
      is_active: facility.is_active,
    });
    setEditModalOpen(true);
  };

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const saveChanges = async () => {
    const { error } = await supabase
      .from("facilities")
      .update(formData)
      .eq("id", selectedFacility.id);

    if (!error) {
      setEditModalOpen(false);
      fetchFacilities();
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="flex items-center justify-between bg-white shadow px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded hover:bg-gray-200"
            >
              <FiMenu size={24} />
            </button>
            <h1 className="text-2xl font-bold">Facilities</h1>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white rounded-xl shadow p-6">

            {/* SEARCH BAR */}
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-full md:w-1/3">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, address, or contact person..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <span className="text-sm text-gray-500">
                Showing {filteredFacilities.length} of {facilities.length}
              </span>
            </div>

            {/* TABLE */}
            {loading ? (
              <p className="text-gray-500">Loading facilities...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-left text-sm">
                      <th className="p-4">Name</th>
                      <th className="p-4">Address</th>
                      <th className="p-4">Contact Person</th>
                      <th className="p-4">Contact Number</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFacilities.map((f) => (
                      <tr key={f.id} className="border-t text-sm">
                        <td className="p-4 font-medium">{f.name}</td>
                        <td className="p-4">{f.address}</td>
                        <td className="p-4">{f.contact_person || "—"}</td>
                        <td className="p-4">{f.contact_number || "—"}</td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              f.is_active
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {f.is_active ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => openEditModal(f)}
                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}

                    {filteredFacilities.length === 0 && (
                      <tr>
                        <td colSpan="6" className="p-6 text-center text-gray-500">
                          No facilities found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ---------------- EDIT MODAL ---------------- */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-lg p-6">
            <h2 className="text-xl font-bold mb-4">Edit Facility</h2>

            <div className="space-y-3">
              <input
                className="w-full border rounded px-3 py-2"
                placeholder="Facility Name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              <input
                className="w-full border rounded px-3 py-2"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
              <input
                className="w-full border rounded px-3 py-2"
                placeholder="Contact Person"
                value={formData.contact_person}
                onChange={(e) =>
                  handleChange("contact_person", e.target.value)
                }
              />
              <input
                className="w-full border rounded px-3 py-2"
                placeholder="Contact Number"
                value={formData.contact_number}
                onChange={(e) =>
                  handleChange("contact_number", e.target.value)
                }
              />

              <select
                className="w-full border rounded px-3 py-2"
                value={formData.is_active ? "active" : "inactive"}
                onChange={(e) =>
                  handleChange("is_active", e.target.value === "active")
                }
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditModalOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={saveChanges}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}