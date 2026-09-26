import { Routes, Route } from "react-router-dom";
import React from 'react';
import Login from "./screens/login";
import Admin from "./pages/admin/adminDashboard";
import Provider from "./pages/provider/providerDashboard";
import Providers from "./pages/admin/requests";
import Sidebar from "./pages/components/sidebar";
import Reports from "./pages/provider/reports";
import ProvSidebar from "./pages/provComponents/provSidebar";
import Request from "./pages/provider/request";
import AddVideo from "./pages/admin/AddVideo"; 
import Facilities from "./pages/admin/facilities";
import Logout from "./pages/admin/logout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin/adminDashboard" element={<Admin />} />
      <Route path="/admin/facilities" element={<Facilities />} />
      <Route path="/admin/providers" element={<Providers />} />
      <Route path="/admin/addvideo" element={<AddVideo />} /> {/* Add this route */}
      <Route path="/admin/logout" element={<Logout />} />
      <Route path="/provider/reports" element={<Reports />} />
      <Route path="/provider/providerDashboard" element={<Provider />} />
      <Route path="/components/sidebar" element={<Sidebar />} />
      <Route path="/provComponents/provSidebar" element={<ProvSidebar />} />
      <Route path="/provider/request" element={<Request />} />
    </Routes>
  );
}