"use client";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import { useState, useEffect } from "react";

const BarChartComponent = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    fetch("/api/bar-chart")
      .then(res => res.json())
      .then(data => setSalesData(data))
      .catch(err => console.error("Error al cargar datos del bar chart:", err));
  }, []);

  const maxRevenue = Math.max(...salesData.map((item) => item.revenue ?? 0));
  const maxProfit = Math.max(...salesData.map((item) => item.profit ?? 0));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={500} height={400} data={salesData} margin={{ right: 30 }}>
        <YAxis />
        <XAxis dataKey="name" />
        <CartesianGrid strokeDasharray="5 5" />
        <Tooltip content={CustomToolTip} />
        <Legend />

        <Bar dataKey="revenue" name="Revenue" stackId="">
          {salesData.map((entry, index) => (
            <Cell
              key={`revenue-cell-${index}`}
              fill={entry.revenue === maxRevenue ? "#03f1dd" : "#3b82f6"}
            />
          ))}
        </Bar>

        <Bar dataKey="profit" name="Profit" stackId="1">
          {salesData.map((entry, index) => (
            <Cell
              key={`profit-cell-${index}`}
              fill={entry.profit === maxProfit ? "#f103f1" : "#8b5cf6"}
            />
          ))}
        </Bar>
      </BarChart>
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
          <span className="ml-2">${payload[0]?.value ?? "N/A"}</span>
        </p>
        <p className="text-sm text-blue-400">
          Profit:
          <span className="ml-2">${payload[1]?.value ?? "N/A"}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default BarChartComponent;
