"use client";

import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { calculateBreakdown } from "../lib/carbon-model";

Chart.register(...registerables);

interface CarbonFootprintChartProps {
  formData: any;  // or your correct FormDataType
  footprint: number;
}

export default function CarbonFootprintChart({ formData, footprint }: CarbonFootprintChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const { transportation, home, lifestyle } = calculateBreakdown(formData);

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Transportation", "Home Energy", "Lifestyle & Consumption"],
        datasets: [
          {
            data: [transportation, home, lifestyle],
            backgroundColor: [
              "rgba(54, 162, 235, 0.7)",
              "rgba(255, 99, 132, 0.7)",
              "rgba(75, 192, 192, 0.7)",
            ],
            borderColor: [
              "rgba(54, 162, 235, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              font: {
                size: 14,
              },
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || "";
                const value = context.raw as number;
                const percentage = footprint ? Math.round((value / footprint) * 100) : 0;
                return `${label}: ${value.toFixed(2)} tons CO₂e (${percentage}%)`;
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [formData, footprint]);

  return (
    <div className="relative h-[400px] w-full">
      <canvas ref={chartRef} />
    </div>
  );
}
