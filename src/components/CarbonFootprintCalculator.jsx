import React, { useState } from "react";

const CarbonFootprintCalculator = () => {
  const [formData, setFormData] = useState({
    bodyType: "",
    sex: "",
    diet: "",
    monthlyGroceryBill: "",
    showerFrequency: "",
    heatingEnergy: "",
    recycling: [],
    cooking: [],
    vehicleType: "",
    vehicleMonthlyDistanceKm: "",
    transport: "",
    socialActivity: "",
    travelFrequency: "",
    wasteBagSize: "",
    wasteBagWeeklyCount: "",
    howLongTVPCDailyHour: "",
    howManyNewClothesMonthly: "",
    howLongInternetDailyHour: "",
    energyEfficiency: ""
  });

  const [prediction, setPrediction] = useState(null); 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => {
        const values = new Set(prevData[name]);
        if (checked) values.add(value);
        else values.delete(value);
        return { ...prevData, [name]: Array.from(values) };
      });
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const calculateFootprint = async () => {
    try {
      const response = await fetch("http://localhost:5000/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Prediction failed");
      await fetch("http://localhost:8080/prediction/store", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, footprint: data.footprint }),
      });
      setPrediction(data.footprint); 
    } catch (error) {
      console.error("Error calculating footprint:", error);
      setPrediction("Error calculating footprint");
    }
  };

   

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateFootprint();
    console.log("Submitted data:", formData);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-green-700">
        Carbon Footprint Calculator
      </h1>
      <form onSubmit={handleSubmit}>
        {/* Numeric Fields */}
        {["monthlyGroceryBill", "vehicleMonthlyDistanceKm", "wasteBagWeeklyCount", "howLongTVPCDailyHour", "howManyNewClothesMonthly", "howLongInternetDailyHour"].map((key) => (
          <div key={key} className="mb-4">
            <label className="block text-gray-700 font-medium">
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </label>
            <input
              type="number"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="w-full p-2 border rounded text-green-600"
            />
          </div>
        ))}

        {/* Single Choice Dropdowns */}
        {[
          { name: "bodyType", label: "Body Type", options: ["underweight", "overweight", "obese"] },
          { name: "sex", label: "Sex", options: ["male", "female"] },
          { name: "diet", label: "Diet", options: ["pescatarian", "vegetarian", "vegan", "omnivore"] },
          { name: "showerFrequency", label: "Shower Frequency", options: ["less frequently", "more frequently", "twice a day"] },
          { name: "heatingEnergy", label: "Heating Energy Source", options: ["electricity", "natural gas", "wood"] },
          { name: "transport", label: "Transport", options: ["public", "walk/bicycle", "car"] },
          { name: "vehicleType", label: "Vehicle Type", options: ["petrol", "diesel", "electric", "hybrid", "lpg", "none"] },
          { name: "socialActivity", label: "Social Activity", options: ["often", "sometimes", "rarely"] },
          { name: "travelFrequency", label: "Air Travel Frequency", options: ["never", "rarely", "very frequently"] },
          { name: "wasteBagSize", label: "Waste Bag Size", options: ["small", "medium", "large"] },
          { name: "energyEfficiency", label: "Energy Efficient Home?", options: ["Yes", "Sometimes", "No"] }
        ].map(({ name, label, options }) => (
          <div key={name} className="mb-4">
            <label className="block text-gray-700 font-medium">{label}</label>
            <select
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full p-2 border rounded text-green-600"
            >
              <option value="">-- Select --</option>
              {options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        ))}

        {/* Multi-Choice Checkboxes */}
        {[
          { name: "recycling", label: "Recycling", options: ["Glass", "Plastic", "Paper", "Metal"] },
          { name: "cooking", label: "Cooking Methods", options: ["Oven", "Stove", "Microwave", "Grill", "Airfryer"] }
        ].map(({ name, label, options }) => (
          <div key={name} className="mb-4">
            <label className="block text-gray-700 font-medium">{label}</label>
            <div className="flex flex-wrap gap-4 mt-2">
              {options.map((opt) => (
                <label key={opt} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name={name}
                    value={opt}
                    checked={formData[name].includes(opt)}
                    onChange={handleChange}
                    className="accent-green-600"
                  />
                  <span className="text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Results
        </button>
      </form>

      {/* Result Display */}
      {prediction !== null && (
        <div className="mt-8 p-4 bg-green-100 text-green-800 rounded shadow text-xl font-semibold">
          Predicted Carbon Footprint: {prediction.toFixed(2)} kg CO₂e
        </div>
      )}
    </div>
  );
};

export default CarbonFootprintCalculator;