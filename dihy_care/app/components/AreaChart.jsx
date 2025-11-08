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

const AreaChartComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/data/glucoseGraphic")
      .then((res) => {
        const payload = Array.isArray(res.data) ? res.data : res.data?.data ?? [];
        console.log("📊 Datos usados en gráfico:", payload);
        setData(payload);
      })
      .catch((err) => console.error("❌ Error cargando datos del gráfico:", err));
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-lg font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
        Promedios diarios de glucosa
      </h2>

      <div className="w-full max-w-5xl h-[300px] sm:h-[350px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis
              dataKey="day"
              tickFormatter={(str) =>
                new Date(str).toLocaleDateString("es-AR", {
                  day: "2-digit",
                  month: "2-digit",
                })
              }
              tick={{ fontSize: 12 }}
              tickMargin={8}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              formatter={(value) => `${value.toFixed(2)} mg/dl`}
              labelFormatter={(label) =>
                new Date(label).toLocaleDateString("es-AR", {
                  weekday: "short",
                  day: "2-digit",
                  month: "2-digit",
                })
              }
              contentStyle={{
                backgroundColor: "#1e293b",
                borderRadius: "8px",
                border: "none",
                color: "white",
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="average"
              stroke="#7c3aed"
              fill="#8b5cf6"
              fillOpacity={0.25}
              strokeWidth={2}
              dot={{ r: 4, stroke: "#fff", strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AreaChartComponent;
