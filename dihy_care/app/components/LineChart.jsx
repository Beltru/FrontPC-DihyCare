"use client";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const LineChartComponent = () => {
  const [presion, setPresion] = useState([]);

  useEffect(() => {
    fetch("/api/line-chart")
      .then((res) => res.json())
      .then((data) => setPresion(data))
      .catch((err) => console.error("Error al cargar datos del line chart:", err));
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={500} height={400} data={presion} margin={{ right: 30 }}>
        <YAxis />
        <XAxis dataKey="name" />
        <CartesianGrid strokeDasharray="5 5" />
        <Tooltip content={CustomToolTip} />
        <Legend />
        <Line type="monotone" dataKey="presion" stroke="#2563eb" fill="#3b82f6"/>
      </LineChart>
    </ResponsiveContainer>
  );
};

const CustomToolTip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg">{label}</p>
        <p className="text-sm text-blue-400">
          Revenue:
          <span className="ml-2">mmHg {payload[0]?.value ?? "N/A"}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default LineChartComponent;
