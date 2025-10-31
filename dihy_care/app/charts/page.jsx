"use client";
import { useState } from "react";
import AreaChartComponent from "../components/AreaChart";
import LineChartComponent from "../components/LineChart";
import React from "react";
import { FiActivity, FiDroplet, FiHeart, FiThermometer } from "react-icons/fi";

export default function Charts() {
  const [open, setOpen] = useState(true);

  return (
    <main className="flex min-h-screen bg-radial from-[#254A7F] to-[#140850]">
      <div className="grid items-center xl:grid-cols-3 lg:grid-cols-2 w-full gap-10 max-w-[1400px] m-10">
        <GridItem title="Glucosa en Sangre">
          <AreaChartComponent />
        </GridItem>

        <GridItem title="Presión">
          <LineChartComponent />
        </GridItem>

        <GridItem title="Resumen Diario">
          <SummaryMenu />
        </GridItem>
      </div>
    </main>
  );
}

function GridItem({ title, children }) {
  return (
    <div className="p-4 bg-slate-800 text-white rounded-lg shadow-md w-full h-[350px] flex flex-col">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <div className="flex-1 flex items-center justify-center">{children}</div>
    </div>
  );
}

function SummaryMenu() {
  const resumen = [
    { icon: <FiDroplet size={22} />, label: "Glucosa", value: "108 mg/dL", status: "Normal" },
    { icon: <FiHeart size={22} />, label: "Presión", value: "118/75 mmHg", status: "Estable" },
    { icon: <FiThermometer size={22} />, label: "Temperatura", value: "36.6 °C", status: "Normal" },
    { icon: <FiActivity size={22} />, label: "Actividad", value: "6,230 pasos", status: "Buena" },
  ];

  return (
    <div className="flex flex-col gap-2 w-full h-full justify-between text-slate-300">
      <div className="grid grid-cols-2 gap-3 text-center">
        {resumen.map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center bg-slate-700/40 rounded-lg p-3 hover:bg-slate-700/60 transition hover:cursor-default">
            <div className="text-blue-300">{item.icon}</div>
            <p className="text-sm font-medium">{item.label}</p>
            <p className="text-base font-semibold text-white">{item.value}</p>
            <p className="text-xs text-slate-400">{item.status}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-700/30 rounded-lg py-2 text-sm text-center border border-slate-600">
        <p className="text-slate-400 ">
          Última actualización: <span className="text-blue-300">hace 10 min</span>
        </p>
      </div>
    </div>
  );
}
