import React from "react";
import { useNavigate } from "react-router-dom";

const Services = () => {
    const navigate = useNavigate();
    return(
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-600 via-gray-100 to-green-600">
            <div className="w-[500px] p-10 rounded-2xl shadow-xl hover:bg-green-300 bg-green-400 text-center space-y-6 transition">
            <h2 className="text-xl font-bold text-green-800">SERVICES AVAILABLE</h2>
            <div className="flex justify-center space-x-4">
            <button className="px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-green-900 transition " onClick={() => navigate("/services")}>
                Carbon Footprint Prediction
            </button>
            <button className="px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-green-900 transition " onClick={() => navigate("/greentoken")}>
                Claim Green Tokens 
            </button>
            </div>
            </div>
        </div>
  );
}
export default Services;