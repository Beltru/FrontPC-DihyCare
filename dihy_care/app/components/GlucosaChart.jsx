"use client";
import { useEffect, useState } from "react";
import axios from "../src/api";
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

const AreaChartComponent = ({ onDataLoad }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/data/glucoseGraphic")
      .then((res) => {
        const raw = Array.isArray(res.data) ? res.data : res.data?.data ?? [];

        // Normalizar fecha y evitar timezone
        const payload = raw.map((item) => ({
          ...item,
          day: item.day.split("T")[0], // "2025-11-28"
        }));

        console.log("📊 Datos usados en gráfico:", payload);
        setData(payload);

        if (onDataLoad) onDataLoad(payload);
      })
      .catch((err) =>
        console.error("❌ Error cargando datos del gráfico:", err)
      );
  }, [onDataLoad]);

  // Formatear manualmente DD/MM
  const formatDay = (str) => {
    const [y, m, d] = str.split("-");
    return `${d}/${m}`;
  };

  // Formato Tooltip: día completo
  const formatLabel = (str) => {
    const [y, m, d] = str.split("-");
    return `${d}/${m}/${y}`;
  };

  return (
    <div className="w-full h-full flex flex-col">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 20, left: -10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="5 5" strokeOpacity={0.5} />

          <XAxis
            dataKey="day"
            tickFormatter={formatDay} // SIN new Date()
            tick={{ fontSize: 11 }}
            tickMargin={5}
          />

          <YAxis
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            formatter={(value) => `${value.toFixed(2)} mg/dl`}
            labelFormatter={formatLabel} // SIN new Date()
            contentStyle={{
              backgroundColor: "#1e293b",
              borderRadius: "8px",
              border: "none",
              color: "white",
            }}
          />

          <Legend wrapperStyle={{ fontSize: "12px" }} />

          <Area
            type="monotone"
            dataKey="average"
            stroke="#7c3aed"
            fill="#7c3aed"
            strokeWidth={2}
            dot={{ r: 3, stroke: "#fff", strokeWidth: 2 }}
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartComponent;
