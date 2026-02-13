// src/pages/admin/AdminServiceRequests.jsx
import React, { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import ProvSidebar from "../provComponents/provSidebar";
import { supabase } from "../../supabase";

export default function ServiceRequests() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  // ✅ FETCH WITH JOIN
  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from("service_requests")
      .select(`
        id,
        full_name,
        contact_no,
        preferred_date,
        status,
        services ( name ),
        sub_services ( name )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching requests:", error);
    } else {
      setTransactions(data);
    }
  };

  // ✅ UPDATE STATUS IN DATABASE
  const updateStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from("service_requests")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      console.error("Error updating status:", error);
    } else {
      fetchRequests(); // refresh after update
    }
  };

  const getStatusColor = (status) => {
    if (status === "Pending") return "bg-yellow-400";
    if (status === "Approved") return "bg-blue-500";
    if (status === "Completed") return "bg-green-500";
    if (status === "Rejected") return "bg-red-500";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <ProvSidebar sidebarOpen={sidebarOpen} />

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
            <h1 className="text-2xl font-bold">Services Request</h1>
          </div>

          <span className="text-gray-600">Admin</span>
        </header>

        {/* Table */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white rounded-xl shadow overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-green-900 text-white">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Youth Name</th>
                  <th className="px-4 py-2">Contact Number</th>
                  <th className="px-4 py-2">Service</th>
                  <th className="px-4 py-2">Sub-Service</th>
                  <th className="px-4 py-2">Preferred Date</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((t) => (
                  <tr key={t.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{t.id}</td>
                    <td className="px-4 py-2">{t.full_name}</td>
                    <td className="px-4 py-2">{t.contact_no}</td>
                    <td className="px-4 py-2">
                      {t.services?.name || "N/A"}
                    </td>
                    <td className="px-4 py-2">
                      {t.sub_services?.name || "N/A"}
                    </td>
                    <td className="px-4 py-2">{t.preferred_date}</td>

                    <td className="px-4 py-2">
                      <span
                        className={`text-white px-3 py-1 rounded text-sm ${getStatusColor(
                          t.status
                        )}`}
                      >
                        {t.status}
                      </span>
                    </td>

                    <td className="px-4 py-2">
                      <select
                        value={t.status}
                        onChange={(e) =>
                          updateStatus(t.id, e.target.value)
                        }
                        className="border px-3 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Completed">Completed</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
