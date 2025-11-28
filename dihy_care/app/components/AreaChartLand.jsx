"use client";

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

const data = [
  { name: "Jan", glucosa: 4000, presion: 3000 },
  { name: "Feb", glucosa: 5000, presion: 2000 },
  { name: "Mar", glucosa: 2000, presion: 1000 },
  { name: "Apr", glucosa: 3700, presion: 2400 },
  { name: "May", glucosa: 7800, presion: 9500 },
  { name: "Jun", glucosa: 2900, presion: 8300 },
];

const CustomToolTip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 bg-slate-900 text-white rounded-md shadow-lg text-sm">
        <p className="font-medium">{label}</p>
        <p className="text-blue-400">
          Glucosa: <span className="ml-2">{payload[0].value} mg/dl</span>
        </p>
        <p className="text-purple-400">
          Presion: <span className="ml-2">{payload[1].value} mg/dl</span>
        </p>
      </div>
    );
  }
  return null;
};

const AreaChartComponentLand = () => {
  return (
    <div className="w-full h-[250px]">  {/* ANTES: 350px */}
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 5, right: 10, left: -5, bottom: 5 }} // márgenes reducidos
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.25} />

          <XAxis
            dataKey="name"
            tick={{ fontSize: 11 }}
            tickMargin={5}
          />

          <YAxis
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip content={<CustomToolTip />} />

          <Legend
            wrapperStyle={{ fontSize: "11px" }}
            iconSize={8}   // Leyenda más chica
          />

          <Area
            type="monotone"
            dataKey="glucosa"
            stroke="#40b4ff"
            fill="#40b4ff22"
            strokeWidth={2}   // Líneas más delgadas
            activeDot={{ r: 4 }}
          />

          <Area
            type="monotone"
            dataKey="presion"
            stroke="#9c40ff"
            fill="#9c40ff22"
            strokeWidth={2}
            activeDot={{ r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartComponentLand;
