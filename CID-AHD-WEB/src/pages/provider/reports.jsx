import { useEffect, useState } from "react";
import { supabase } from "../../supabase";

export default function FacilityReports() {
  const [providerId, setProviderId] = useState(null);
  const [requests, setRequests] = useState([]);
  const [services, setServices] = useState([]);
  const [subServices, setSubServices] = useState([]);

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedSubService, setSelectedSubService] = useState("");
  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(false);

  // 🔹 Get logged-in provider
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("users")
        .select("provider_id")
        .eq("email_ad", user.email)
        .single();

      setProviderId(data?.provider_id);
    };

    fetchUser();
  }, []);

  // 🔹 Load Services
  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await supabase
        .from("services")
        .select("*");

      setServices(data || []);
    };

    fetchServices();
  }, []);

  // 🔹 Load Subservices when service changes
  useEffect(() => {
    if (!selectedService) return;

    const fetchSubServices = async () => {
      const { data } = await supabase
        .from("sub-services")
        .select("*")
        .eq("service_id", selectedService);

      setSubServices(data || []);
    };

    fetchSubServices();
  }, [selectedService]);

  // 🔹 Generate Report
  const generateReport = async () => {
    if (!providerId) return;

    setLoading(true);

    let query = supabase
      .from("service_requests")
      .select(`
        *,
        services(name),
        sub-services(name)
      `)
      .eq("provider_id", providerId);

    // Year filter
    query = query
      .gte("created_at", `${year}-01-01`)
      .lt("created_at", `${Number(year) + 1}-01-01`);

    // Month filter
    if (month) {
      query = query
        .gte("created_at", `${year}-${month}-01`)
        .lt("created_at", `${year}-${Number(month) + 1}-01`);
    }

    // Service filter
    if (selectedService) {
      query = query.eq("service_id", selectedService);
    }

    // Subservice filter
    if (selectedSubService) {
      query = query.eq("sub_services_id", selectedSubService);
    }

    // Status filter
    if (status) {
      query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (!error) {
      setRequests(data);
    }

    setLoading(false);
  };

  // 🔹 Download CSV
  const downloadCSV = () => {
    if (!requests.length) return;

    const formatted = requests.map(r => ({
      ID: r.id,
      Full_Name: r.full_name,
      Service: r.services?.name,
      Sub_Service: r["sub-services"]?.name,
      Status: r.status,
      Preferred_Date: r.preferred_date,
      Created_At: r.created_at
    }));

    const headers = Object.keys(formatted[0]);
    const rows = formatted.map(row =>
      headers.map(field => `"${row[field] || ""}"`).join(",")
    );

    const csv = [headers.join(","), ...rows].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "facility_report.csv";
    a.click();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Facility Report Generator</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">

        {/* Year */}
        <input
          type="number"
          className="border p-2 rounded"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        {/* Month */}
        <select
          className="border p-2 rounded"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          <option value="">All Months</option>
          {[...Array(12)].map((_, i) => (
            <option key={i} value={String(i + 1).padStart(2, "0")}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>

        {/* Service */}
        <select
          className="border p-2 rounded"
          value={selectedService}
          onChange={(e) => {
            setSelectedService(e.target.value);
            setSelectedSubService("");
          }}
        >
          <option value="">All Services</option>
          {services.map(service => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>

        {/* Subservice */}
        <select
          className="border p-2 rounded"
          value={selectedSubService}
          onChange={(e) => setSelectedSubService(e.target.value)}
        >
          <option value="">All Sub-Services</option>
          {subServices.map(sub => (
            <option key={sub.id} value={sub.id}>
              {sub.name}
            </option>
          ))}
        </select>

        {/* Status */}
        <select
          className="border p-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="completed">Completed</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="flex gap-4">
        <button
          onClick={generateReport}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Generate
        </button>

        <button
          onClick={downloadCSV}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Download CSV
        </button>
      </div>

      {loading && <p className="mt-4">Generating report...</p>}
    </div>
  );
}

