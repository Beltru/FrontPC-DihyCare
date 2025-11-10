"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const initialData = [
  { name: "Jan", glucosatisular: 4000, plasmaglucosa: 3000 },
  { name: "Feb", glucosatisular: 5000, plasmaglucosa: 2000 },
  { name: "Mar", glucosatisular: 2000, plasmaglucosa: 1000 },
  { name: "Apr", glucosatisular: 3700, plasmaglucosa: 2400 },
  { name: "May", glucosatisular: 7800, plasmaglucosa: 9500 },
  { name: "Jun", glucosatisular: 2900, plasmaglucosa: 8300 },
];

const AreaChartComponentLand = () => {
  const [data, setData] = useState(initialData);

  const handleChange = (index, key, value) => {
    const newData = [...data];
    newData[index][key] = parseInt(value) || 0;
    setData(newData);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ right: 30 }}>
          <YAxis />
          <XAxis dataKey="name" />
          <CartesianGrid strokeDasharray="5 5" />
          <Tooltip content={CustomToolTip} />
          <Legend />
          <Area
            type="monotone"
            dataKey="glucosatisular"
            stroke="#2563eb"
            stackId="1"
          />
          <Area
            type="monotone"
            dataKey="plasmaglucosa"
            stroke="#7c3aed"
            fill="#8b5cf6"
            stackId="1"
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Inputs dinámicos */}
<div className="flex flex-row gap-6 overflow-x-auto w-full items-start pb-4">
  {/* Gráfico */}
  <div className="min-w-[500px]">
    <AreaChartComponentLand data={initialData} />
  </div>

  {/* Inputs */}
  <div className="flex flex-row gap-4">
    {initialData.map((item, index) => (
      <div key={index} className="flex flex-col w-44 bg-white/10 p-3 rounded-md shrink-0">
        <h3 className="text-white font-bold text-lg">{item.name}</h3>
        <label className="text-sm text-sky-200">Glucosa Tisular</label>
        <input
          className="mb-2 rounded-md px-2 py-1 text-black"
          value={item.glucosas}
          onChange={(e) => handleInputChange(index, "glucosas", e.target.value)}
        />
        <label className="text-sm text-purple-300">Plasma Glucosa</label>
        <input
          className="rounded-md px-2 py-1 text-black"
          value={item.plasmaglucosa}
          onChange={(e) => handleInputChange(index, "plasmaglucosa", e.target.value)}
        />
      </div>
    ))}
  </div>
</div>

    </div>
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
        <p className="text-sm text-purple-400">
          Plasma-Glucosa: <span className="ml-2">g/dl {payload[1].value}</span>
        </p>
      </div>
    );
  }
};

export default AreaChartComponentLand;
