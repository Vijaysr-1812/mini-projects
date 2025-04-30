import React, { useState, useEffect } from "react";
import CarbonFootprintChart from "./carbon-footprint-chart";
import { predictCarbonFootprint, loadModel } from "../lib/carbon-model";
import { getRecommendations } from "../lib/recomendation";
import type { Recommendation } from "../lib/types";

export default function CarbonFootprintCalculator() {
  const [activeTab, setActiveTab] = useState("input");
  const [isLoading, setIsLoading] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [footprint, setFootprint] = useState<number | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const [formData, setFormData] = useState({
    transportation: {
      carType: "Gasoline Vehicle",
      carMileage: 10000,
      publicTransport: 1000,
      flights: 2,
    },
    home: {
      primaryEnergySource: "Electricity",
      electricityUsage: 12000,
      naturalGasUsage: 500,
      houseSize: 1500,
      occupants: 3,
    },
    lifestyle: {
      dietType: "Omnivore",
      shoppingHabits: "Average",
      itemsPurchasedMonthly: 5,
      wasteRecycledMonthly: 50,
      incomeLevel: "medium",
    },
  });

  useEffect(() => {
    async function initializeModel() {
      try {
        await loadModel();
        setModelLoaded(true);
      } catch (error) {
        console.error("Error loading model:", error);
      }
    }
    initializeModel();
  }, []);

  const handleChange = (section: string, key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  };

  const calculateFootprint = async () => {
    setIsLoading(true);
    try {
      if (!modelLoaded) {
        await loadModel();
        setModelLoaded(true);
      }
      const prediction = await predictCarbonFootprint(formData);
      setFootprint(prediction);
      const recs = getRecommendations(formData, prediction);
      setRecommendations(recs);
      setActiveTab("results");
    } catch (error) {
      console.error("Error calculating footprint:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center py-10 px-4 bg-gray-100">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-green-700">Carbon Footprint Predictor</h1>
          <p className="text-gray-600">Using Machine Learning on CoolClimate Network data to calculate your footprint.</p>
        </div>

        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 rounded ${activeTab === "input" ? "bg-green-700 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => setActiveTab("input")}
          >
            Input Data
          </button>
          <button
            className={`ml-4 px-4 py-2 rounded ${activeTab === "results" ? "bg-green-700 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => setActiveTab("results")}
            disabled={footprint === null}
          >
            Results
          </button>
        </div>

        {activeTab === "input" && (
          <div>
            {/* Transportation Section */}
            <h2 className="text-xl font-semibold text-green-700 mb-4">Transportation</h2>
            <div className="space-y-4">
              <label className="block text-gray-700">Car Type</label>
              <select
                value={formData.transportation.carType}
                onChange={(e) => handleChange("transportation", "carType", e.target.value)}
                className="w-full p-2 text-black border rounded"
              >
                <option value="Gasoline Vehicle">Gasoline Vehicle</option>
                <option value="Electric Vehicle">Electric Vehicle</option>
                <option value="Hybrid Vehicle">Hybrid Vehicle</option>
              </select>

              <label className="block text-gray-700">Annual Car Mileage</label>
              <input
                type="range"
                min="0"
                max="50000"
                value={formData.transportation.carMileage}
                onChange={(e) => handleChange("transportation", "carMileage", Number(e.target.value))}
                className="w-full"
              />
              <label className="text-black">Car Mileage: {formData.transportation.carMileage} miles/year</label>

              <label className="block text-gray-700">Public Transport (miles/year)</label>
              <input
                type="range"
                min="0"
                max="20000"
                value={formData.transportation.publicTransport}
                onChange={(e) => handleChange("transportation", "publicTransport", Number(e.target.value))}
                className="w-full"
              />
              <label className="text-black">Public Transport: {formData.transportation.publicTransport} miles/year</label>

              <label className="block text-gray-700">Flights per Year</label>
              <input
                type="range"
                min="0"
                max="50"
                value={formData.transportation.flights}
                onChange={(e) => handleChange("transportation", "flights", Number(e.target.value))}
                className="w-full"
              />
              <label className="text-black">Flights: {formData.transportation.flights} per year</label>
            </div>

            {/* Home Section */}
            <h2 className="text-xl font-semibold text-green-700 mt-8 mb-4">Home</h2>
            <div className="space-y-4">
              <label className="block text-gray-700">Primary Energy Source</label>
              <select
                value={formData.home.primaryEnergySource}
                onChange={(e) => handleChange("home", "primaryEnergySource", e.target.value)}
                className="w-full p-2 border rounded text-black"
              >
                <option value="Electricity">Electricity</option>
                <option value="Natural Gas">Natural Gas</option>
                <option value="Renewable">100% Renewable</option>
              </select>

              <label className="block text-gray-700">House Size (sq ft)</label>
              <input
                type="range"
                min="0"
                max="5000"
                value={formData.home.houseSize}
                onChange={(e) => handleChange("home", "houseSize", Number(e.target.value))}
                className="w-full"
              />
              <label className="text-black">House Size: {formData.home.houseSize} sq ft</label>

              <label className="block text-gray-700">Number of Occupants</label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.home.occupants}
                onChange={(e) => handleChange("home", "occupants", Number(e.target.value))}
                className="w-full"
              />
              <label className="text-black">Occupants: {formData.home.occupants}</label>
            </div>

            {/* Lifestyle Section */}
            <h2 className="text-xl font-semibold text-green-700 mt-8 mb-4">Lifestyle</h2>
            <div className="space-y-4">
              <label className="block text-gray-700">Diet Type</label>
              <select
                value={formData.lifestyle.dietType}
                onChange={(e) => handleChange("lifestyle", "dietType", e.target.value)}
                className="w-full p-2 border rounded text-black"
              >
                <option value="Vegan">Vegan</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Omnivore">Omnivore</option>
              </select>

              <label className="block text-gray-700">Income Level</label>
              <select
                value={formData.lifestyle.incomeLevel}
                onChange={(e) => handleChange("lifestyle", "incomeLevel", e.target.value)}
                className="w-full p-2 text-black border rounded"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              <label className="block text-gray-700">New Items Purchased Monthly</label>
              <input
                type="range"
                min="0"
                max="20"
                value={formData.lifestyle.itemsPurchasedMonthly}
                onChange={(e) => handleChange("lifestyle", "itemsPurchasedMonthly", Number(e.target.value))}
                className="w-full"
              />
              <label className="text-black">Items Purchased: {formData.lifestyle.itemsPurchasedMonthly}</label>

              <label className="block text-gray-700">Waste Recycled Monthly (%)</label>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.lifestyle.wasteRecycledMonthly}
                onChange={(e) => handleChange("lifestyle", "wasteRecycledMonthly", Number(e.target.value))}
                className="w-full"
              />
              <label className="text-black">Recycled: {formData.lifestyle.wasteRecycledMonthly}%</label>
            </div>

            <div className="text-center mt-6">
              <button
                onClick={calculateFootprint}
                className="px-6 py-2 bg-green-700 text-white rounded shadow hover:bg-green-800"
              >
                {isLoading ? "Calculating..." : "Calculate"}
              </button>
            </div>
          </div>
        )}

        {activeTab === "results" && footprint !== null && (
          <div>
            <h2 className="text-xl font-semibold text-green-700">Your Estimated Carbon Footprint</h2>
            <p className="text-2xl mt-4 mb-6">{footprint.toFixed(2)} tons CO₂e/year</p>
            <div className="h-[400px]">
              <CarbonFootprintChart formData={formData} footprint={footprint} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
