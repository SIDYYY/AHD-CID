import { Routes, Route } from "react-router-dom";
import React from 'react';
import Login from "./screens/login";
import Admin from "./pages/admin/adminDashboard";
import Provider from "./pages/provider/providerDashboard";
// import Unauthorized from "./pages/Unauthorized";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/provider" element={<Provider />} />
      {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}
    </Routes>
  );
}
