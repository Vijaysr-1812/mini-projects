import React from "react"; // ✅ Add this line
import CarbonFootprintCalculator from "./components/carbon-footprint-calculator";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-300 mb-4">Carbon Footprint Predictor</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Using machine learning trained on the CoolClimate Network dataset to predict your carbon footprint based on
            your lifestyle choices.
          </p>
        </div>
        <CarbonFootprintCalculator />
      </div>
    </main>
  );
}
