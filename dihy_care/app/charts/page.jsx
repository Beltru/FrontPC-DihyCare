"use client";
import { useState, useMemo } from "react";
import AreaChartComponent from "../components/GlucosaChart";
import LineChartComponent from "../components/PresionChart";
import BarChartComponent from "../components/BarChart";

import React from "react";
import { FiActivity, FiDroplet, FiHeart, FiThermometer } from "react-icons/fi";
import { BarChart } from "recharts";

export default function Charts() {
  const [glucoseData, setGlucoseData] = useState([]);
  const [pressureData, setPressureData] = useState([]);

  return (
    <main className="flex min-h-screen bg-radial from-[#254A7F] to-[#140850]">
      <div className="grid items-center xl:grid-cols-3 lg:grid-cols-2 w-full gap-10 max-w-[1400px] m-10">
        <GridItem title="Promedios diarios de glucosa">
          <AreaChartComponent onDataLoad={setGlucoseData} />
        </GridItem>

        <GridItem title="Presión arterial">
          <BarChartComponent onDataLoad={setPressureData} />
        </GridItem>

        <GridItem title="Resumen Diario">
          <SummaryMenu glucoseData={glucoseData} pressureData={pressureData} />
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

function SummaryMenu({ glucoseData = [], pressureData = [] }) {
  // ================================
  // GLUCOSA
  // ================================
  const todayGlucose = useMemo(() => {
    if (!glucoseData.length) return { value: "Sin datos", status: "N/A" };

    const today = new Date();
    const todayData = glucoseData.find(d => {
      const date = new Date(d.day);
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    });

    const data = todayData || glucoseData[glucoseData.length - 1];
    const avg = parseFloat(data?.average ?? data?.value ?? NaN);
    if (isNaN(avg)) return { value: "Sin datos", status: "N/A", isToday: false };

    let status = "Normal";
    if (avg < 70) status = "Bajo";
    else if (avg > 140) status = "Alto";
    else if (avg > 100) status = "Pre-alto";

    return { value: `${avg.toFixed(1)} mg/dL`, status, isToday: !!todayData };
  }, [glucoseData]);

  // ================================
  // PRESIÓN
  // ================================
  const todayPressure = useMemo(() => {
    if (!pressureData.length) return { value: "Sin datos", status: "N/A" };

    const today = new Date();
    const todayData = pressureData.find(d => {
      const date = new Date(d.day);
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    });

    const data = todayData || pressureData[pressureData.length - 1];
    const systolic = data?.PAS;
    const diastolic = data?.PAD;

    if (!systolic || !diastolic)
      return { value: "Sin datos", status: "N/A", isToday: false };

    let status = "Normal";
    if (systolic < 90 || diastolic < 60) status = "Baja";
    else if (systolic >= 140 || diastolic >= 90) status = "Alta";
    else if (systolic >= 120 || diastolic >= 80) status = "Pre-alta";

    return {
      value: `${systolic.toFixed(2)}/${diastolic.toFixed(2)} mmHg`,
      status,
      isToday: !!todayData,
    };
  }, [pressureData]);

  // ================================
  // RESUMEN GENERAL
  // ================================
  const resumen = [
    {
      icon: <FiDroplet size={22} />,
      label: todayGlucose.isToday ? "Glucosa de Hoy" : "Glucosa Reciente",
      value: todayGlucose.value,
      status: todayGlucose.status,
    },
    {
      icon: <FiHeart size={22} />,
      label: todayPressure.isToday ? "Presión de Hoy" : "Presión Reciente",
      value: todayPressure.value,
      status: todayPressure.status,
    },
    {
      icon: <FiThermometer size={22} />,
      label: "Datos disponibles",
      value: `${glucoseData.length} días`,
      status: glucoseData.length > 0 ? "Activo" : "Sin datos",
    },
    {
      icon: <FiActivity size={22} />,
      label: "Tendencia",
      value: glucoseData.length > 1 ? "Monitoreando" : "Inicial",
      status: "En seguimiento",
    },
  ];

  return (
    <div className="flex flex-col gap-2 w-full h-full justify-between text-slate-300">
      <div className="grid grid-cols-2 gap-3 text-center">
        {resumen.map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center bg-slate-700/40 rounded-lg p-3 hover:bg-slate-700/60 transition hover:cursor-default"
          >
            <div className="text-blue-300">{item.icon}</div>
            <p className="text-xs font-medium">{item.label}</p>
            <p className="text-sm font-semibold text-white">{item.value}</p>
            <p className="text-xs text-slate-400">{item.status}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-700/30 rounded-lg py-2 text-sm text-center border border-slate-600">
        <p className="text-slate-400 text-xs">
          Última actualización:{" "}
          <span className="text-blue-300">
            {todayGlucose.isToday || todayPressure.isToday
              ? "hoy"
              : "datos recientes"}
          </span>
        </p>
      </div>
    </div>
  );
}

