import { Routes, Route } from "react-router-dom";
import React from 'react';
import Login from "./screens/login";
import Admin from "./pages/admin/adminDashboard";
import Provider from "./pages/provider/providerDashboard";
import Providers from "./pages/admin/providers";
import Sidebar from "./pages/components/sidebar";
import Settings from "./pages/admin/settings";
import ProvSidebar from "./pages/provComponents/provSidebar";
import Request from "./pages/provider/request"
// import Unauthorized from "./pages/Unauthorized";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin/adminDashboard" element={<Admin />} />
      <Route path="/admin/providers" element={<Providers />} />
      <Route path="/admin/settings" element={<Settings />} />
      <Route path="/provider/providerDashboard" element={<Provider />} />
      <Route path="/components/sidebar" element={<Sidebar />} />
      <Route path="/provComponents/provSidebar" element={<ProvSidebar />} />
      <Route path="/provider/request" element={<Request />} />
      {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}
    </Routes>
  );
}
