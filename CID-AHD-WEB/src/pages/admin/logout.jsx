import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutAdmin = async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout failed:", error.message);
      }
      // Redirect to login page or homepage
      navigate("/"); 
    };

    logoutAdmin();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <p className="text-xl font-semibold mb-2">Logging out...</p>
        <p className="text-gray-600">Please wait a moment.</p>
      </div>
    </div>
  );
}