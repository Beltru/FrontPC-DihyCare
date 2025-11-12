"use client";
import { useState, useEffect } from "react";
import axios from "../src/api";
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

const BarChartComponent = ({ onDataLoad }) => {
  const [presion, setPresion] = useState([]);

  useEffect(() => {
    axios
      .get("/data/pressureGraphic")
      .then((res) => {
        const payload = Array.isArray(res.data)
          ? res.data
          : res.data?.data ?? [];
        console.log("📊 Datos usados en gráfico de presión:", payload);
        setPresion(payload);
        if (onDataLoad) onDataLoad(payload);
      })
      .catch((err) =>
        console.error("❌ Error cargando datos del gráfico de presión:", err)
      );
  }, [onDataLoad]);

  const maxPAS = Math.max(...presion.map((p) => p.PAS ?? 0));
  const maxPAD = Math.max(...presion.map((p) => p.PAD ?? 0));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={presion}
        margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="5 5" strokeOpacity={0.3} />
        <XAxis
          dataKey="day"
          tickFormatter={(str) =>
            new Date(str).toLocaleDateString("es-AR", {
              day: "2-digit",
              month: "2-digit",
            })
          }
          tick={{ fontSize: 11 }}
          tickMargin={8}
        />
        <YAxis
          tick={{ fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          domain={["auto", "auto"]}
        />
        <Tooltip content={<CustomToolTip />} />
        <Legend wrapperStyle={{ fontSize: "12px" }} />

        <Bar
  dataKey="PAS"
  name="Presión Sistólica (PAS)"
  fill="#7c3aed" // color violeta fijo en la leyenda
>
  {presion.map((entry, index) => (
    <Cell
      key={`pas-cell-${index}`}
      fill={entry.PAS === maxPAS ? "#ff1b82" : "#7c3aed"}
    />
  ))}
</Bar>

<Bar
  dataKey="PAD"
  name="Presión Diastólica (PAD)"
  fill="#0ea5e9" // color celeste fijo en la leyenda
>
  {presion.map((entry, index) => (
    <Cell
      key={`pad-cell-${index}`}
      fill={entry.PAD === maxPAD ? "#00ef81" : "#0ea5e9"}
    />
  ))}
</Bar>

      </BarChart>
    </ResponsiveContainer>
  );
};

const CustomToolTip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const pas = payload.find((p) => p.dataKey === "PAS")?.value;
    const pad = payload.find((p) => p.dataKey === "PAD")?.value;

    return (
      <div className="p-3 bg-slate-900/80 flex flex-col gap-2 rounded-md">
        <p className="text-sm text-gray-200 font-semibold">
          {new Date(label).toLocaleDateString("es-AR", {
            weekday: "short",
            day: "2-digit",
            month: "2-digit",
          })}
        </p>
        <p className="text-sm text-purple-400">
          Sistólica (PAS): <span className="ml-1">{pas?.toFixed(2)} mmHg</span>
        </p>
        <p className="text-sm text-sky-400">
          Diastólica (PAD): <span className="ml-1">{pad?.toFixed(2)} mmHg</span>
        </p>
      </div>
    );
  }
  return null;
};

export default BarChartComponent;
