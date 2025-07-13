"use client";

import { useEffect, useState } from "react";
import {
  AreaChart, Area, ResponsiveContainer, YAxis, XAxis, CartesianGrid, Tooltip, Legend
} from "recharts";

const AreaChartComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/area-chart")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error cargando datos del gráfico:", err));
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart width={500} height={400} data={data} margin={{ right: 30 }}>
        <YAxis />
        <XAxis dataKey="name" />
        <CartesianGrid strokeDasharray="5 5" />
        <Tooltip content={CustomToolTip} />
        <Legend />
        <Area type="monotone" dataKey="glucosatisular" stroke="#2563eb" fill="#3b82f6" stackId="1" />
        <Area type="monotone" dataKey="plasmaglucosa" stroke="#7c3aed" fill="#8b5cf6" stackId="1" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const CustomToolTip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg">{label}</p>
        <p className="text-sm text-blue-400">
          Glucosa-Tisular: <span className="ml-2">g/dl {payload[0].value}</span>
        </p>
        <p className="text-sm text-blue-400">
          Plasma-Glucosa: <span className="ml-2">g/dl {payload[1].value}</span>
        </p>
      </div>
    );
  }
};

export default AreaChartComponent;
