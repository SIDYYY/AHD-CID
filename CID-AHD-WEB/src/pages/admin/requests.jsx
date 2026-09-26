import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { FiMenu, FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";
import { supabase } from "../../supabase";

export default function ServiceRequests() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [formData, setFormData] = useState({
    full_name: "",
    address: "",
    contact_no: "",
    preferred_date: "",
    status: "Pending",
  });

  /* ---------------- FETCH ---------------- */

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const { data } = await supabase
      .from("service_requests")
      .select(`
        *,
        facilities(name),
        services(name),
        subservices(subservices_name)
      `)
      .order("created_at", { ascending: false });

    setRequests(data || []);
    setFilteredRequests(data || []);
  };

  /* ---------------- SEARCH ---------------- */

  useEffect(() => {
    const keyword = search.toLowerCase();
    const filtered = requests.filter((r) =>
      r.full_name?.toLowerCase().includes(keyword) ||
      r.address?.toLowerCase().includes(keyword) ||
      r.contact_no?.toLowerCase().includes(keyword)
    );
    setFilteredRequests(filtered);
  }, [search, requests]);

  /* ---------------- EDIT ---------------- */

  const handleEdit = (req) => {
    setIsEditing(true);
    setSelectedRequest(req);
    setFormData({
      full_name: req.full_name,
      address: req.address,
      contact_no: req.contact_no,
      preferred_date: req.preferred_date,
      status: req.status,
    });
    setShowModal(true);
  };

  /* ---------------- SAVE ---------------- */

  const handleSubmit = async () => {
    if (isEditing) {
      await supabase
        .from("service_requests")
        .update(formData)
        .eq("id", selectedRequest.id);
    }

    setShowModal(false);
    setIsEditing(false);
    fetchRequests();
  };

  /* ---------------- DELETE ---------------- */

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this request?")) return;
    await supabase.from("service_requests").delete().eq("id", id);
    fetchRequests();
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
            <h1 className="text-2xl font-bold">Service Requests</h1>
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
                  placeholder="Search name, address, contact..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <span className="text-sm text-gray-500">
                Showing {filteredRequests.length} of {requests.length}
              </span>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left text-sm">
                    <th className="p-4">Full Name</th>
                    <th className="p-4">Service</th>
                    <th className="p-4">Facility</th>
                    <th className="p-4">Preferred Date</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRequests.map((r) => (
                    <tr key={r.id} className="border-t text-sm">
                      <td className="p-4 font-medium">{r.full_name}</td>
                      <td className="p-4">{r.services?.name}</td>
                      <td className="p-4">{r.facilities?.name}</td>
                      <td className="p-4">{r.preferred_date}</td>
                      <td className="p-4">{r.contact_no}</td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            r.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : r.status === "Approved"
                              ? "bg-blue-100 text-blue-700"
                              : r.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>

                      <td className="p-4 flex gap-3">
                        <button
                          onClick={() => handleEdit(r)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(r.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredRequests.length === 0 && (
                    <tr>
                      <td colSpan="7" className="p-6 text-center text-gray-500">
                        No service requests found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-lg p-6">
            <h2 className="text-xl font-bold mb-4">Edit Request</h2>

            <div className="space-y-3">
              <input
                className="w-full border rounded px-3 py-2"
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
              />
              <input
                className="w-full border rounded px-3 py-2"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
              <input
                className="w-full border rounded px-3 py-2"
                value={formData.contact_no}
                onChange={(e) =>
                  setFormData({ ...formData, contact_no: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}