// src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import Sidebar from "../provComponents/provSidebar";
import { supabase } from "../../supabase";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ✅ Dashboard stats (4 STATUS COUNTS)
  const [stats, setStats] = useState({
    totalPending: 0,
    totalApproved: 0,
    totalCompleted: 0,
    totalRejected: 0,
  });

  const [serviceData, setServiceData] = useState([]);
  const [statusData, setStatusData] = useState([]);

  const COLORS = ["#facc15", "#3b82f6", "#22c55e", "#ef4444"];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    // ✅ Pending
    const { count: totalPending } = await supabase
      .from("service_requests")
      .select("*", { count: "exact", head: true })
      .eq("status", "Pending");

    // ✅ Approved
    const { count: totalApproved } = await supabase
      .from("service_requests")
      .select("*", { count: "exact", head: true })
      .eq("status", "Approved");

    // ✅ Completed
    const { count: totalCompleted } = await supabase
      .from("service_requests")
      .select("*", { count: "exact", head: true })
      .eq("status", "Completed");

    // ✅ Rejected
    const { count: totalRejected } = await supabase
      .from("service_requests")
      .select("*", { count: "exact", head: true })
      .eq("status", "Rejected");

    setStats({
      totalPending: totalPending || 0,
      totalApproved: totalApproved || 0,
      totalCompleted: totalCompleted || 0,
      totalRejected: totalRejected || 0,
    });

    // ✅ Requests per Service
    const { data: serviceRequests } = await supabase
      .from("service_requests")
      .select("service_id");

    const { data: services } = await supabase
      .from("services")
      .select("id, name");

    const serviceCounts =
      services?.map((s) => ({
        name: s.name,
        requests:
          serviceRequests?.filter((r) => r.service_id === s.id).length || 0,
      })) || [];

    setServiceData(serviceCounts);

    // ✅ Status Distribution (Pie Chart)
    setStatusData([
      { name: "Pending", value: totalPending || 0 },
      { name: "Approved", value: totalApproved || 0 },
      { name: "Completed", value: totalCompleted || 0 },
      { name: "Rejected", value: totalRejected || 0 },
    ]);
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
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-600">Admin</span>
            <img
              src="/src/assets/images/logo.png"
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* ✅ 4 Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="font-semibold text-lg mb-2">Total Pending</h2>
              <p className="text-3xl font-bold text-yellow-500">
                {stats.totalPending}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="font-semibold text-lg mb-2">Total Approved</h2>
              <p className="text-3xl font-bold text-blue-500">
                {stats.totalApproved}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="font-semibold text-lg mb-2">Total Completed</h2>
              <p className="text-3xl font-bold text-green-600">
                {stats.totalCompleted}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="font-semibold text-lg mb-2">Total Rejected</h2>
              <p className="text-3xl font-bold text-red-500">
                {stats.totalRejected}
              </p>
            </div>

          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Bar Chart */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="font-semibold text-lg mb-4">
                Requests per Service
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={serviceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="requests"
                    fill="#2563eb"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="font-semibold text-lg mb-4">
                Request Status Distribution
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
