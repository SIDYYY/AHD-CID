// src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import Sidebar from "../components/sidebar";
import { supabase } from "../../supabase"; // Make sure supabase client is configured
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
import { useNavigate } from "react-router-dom";
import AddVideoModal from "../components/addVidModal";
import ManageVideosModal from "../components/manageVidModal";


export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAddVideo, setShowAddVideo] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const navigate = useNavigate();

  // Dashboard stats
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeProviders: 0,
    totalRequests: 0,
  });

  // Chart data
  const [serviceData, setServiceData] = useState([]);
  const [statusData, setStatusData] = useState([]);

  const COLORS = ["#facc15", "#3b82f6", "#22c55e", "#ef4444"];

  // Fetch dashboard data
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    // ✅ Total Users
    const { count: totalUsers } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true });

    // ✅ Active Providers
    const { count: activeProviders } = await supabase
      .from("providers")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true);

    // ✅ Total Requests
    const { count: totalRequests } = await supabase
      .from("service_requests")
      .select("*", { count: "exact", head: true });

    setStats({
      totalUsers: totalUsers || 0,
      activeProviders: activeProviders || 0,
      totalRequests: totalRequests || 0,
    });

    // ✅ Requests per Service
    const { data: serviceRequests } = await supabase
      .from("service_requests")
      .select("service_id");

    const { data: services } = await supabase
      .from("services")
      .select("id, name");

    // Count requests per service
    const serviceCounts = services.map((s) => ({
      name: s.name,
      requests:
        serviceRequests?.filter((r) => r.service_id === s.id).length || 0,
    }));
    setServiceData(serviceCounts);

    // ✅ Status distribution
    const { data: requests } = await supabase
      .from("service_requests")
      .select("status");

    const statusCounts = ["Pending", "Approved", "Completed", "Rejected"].map(
      (status) => ({
        name: status,
        value: requests?.filter(
          (r) => r.status?.toLowerCase() === status.toLowerCase()
        ).length || 0,
      })
    );
    setStatusData(statusCounts);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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
          {/* Top Cards */}


          <div className="mt-10">
     <div className="mb-10 bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 border border-gray-100">
    
    {/* Left Content */}
    <div >
      <h2 className="text-xl font-bold text-gray-800">
        New Oro Youth Center Video?
      </h2>
      <p className="text-gray-500 mt-1 max-w-xl">
        Upload and manage official YouTube videos for the Oro Youth Center.
        These videos will be visible to users across the platform.
      </p>
    </div>

    {/* Action Button */}
    <div className="flex gap-4">
    <button
      onClick={() => setShowAddVideo(true)}
      className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200"
    >
      <span className="text-lg">＋</span>
      Add Video
    </button>

    <button
      onClick={() => setShowVideoModal(true)}
      className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200"
    >
      <span className="text-lg"></span>
      Manage Videos
    </button>
    </div>
  </div>
</div>

<AddVideoModal
  isOpen={showAddVideo}
  onClose={() => setShowAddVideo(false)}
  onSuccess={() => {
  }}
/>

<ManageVideosModal
  isOpen={showVideoModal}
  onClose={() => setShowVideoModal(false)}
  onSuccess={() => {
  }}
/>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="font-semibold text-lg mb-2">Total Users</h2>
              <p className="text-3xl font-bold text-blue-900">
                {stats.totalUsers}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="font-semibold text-lg mb-2">Active Providers</h2>
              <p className="text-3xl font-bold text-blue-900">
                {stats.activeProviders}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="font-semibold text-lg mb-2">Total Requests</h2>
              <p className="text-3xl font-bold text-yellow-500">
                {stats.totalRequests}
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
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ marginTop: "30px", padding: "20px", background: "#f5f5f5", borderRadius: "10px" }}>
          </div>

        


        </main>
      </div>
    </div>

  );
}
