import React from "react";
import { useNavigate } from "react-router-dom"; // For navigation

const Service = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-100 to-green-300 p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-6">Discover Your Carbon Footprint</h1>
        <p className="text-lg text-gray-700 mb-10 max-w-2xl">
          Our AI-powered tool uses Machine Learning trained on the CoolClimate Network dataset to predict your
          personalized carbon footprint based on your lifestyle. Start exploring now and get eco-friendly recommendations!
        </p>

        <button
          onClick={() => navigate("/ai-integration")} // ✅ Redirects to AI page
          className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
        >
          Predict My Carbon Footprint
        </button>
      </div>
    </section>
  );
};

export default Service;
