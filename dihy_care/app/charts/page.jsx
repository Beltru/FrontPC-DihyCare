"use client";
import { useState, useMemo } from "react";
import AreaChartComponent from "../components/GlucosaChart";
import LineChartComponent from "../components/presionChart";
import React from "react";
import { FiActivity, FiDroplet, FiHeart, FiThermometer } from "react-icons/fi";

export default function Charts() {
  const [glucoseData, setGlucoseData] = useState([]);
  const [pressureData, setPressureData] = useState([]);

  return (
    <main className="flex min-h-screen bg-radial from-[#254A7F] to-[#140850]">
      <div className="grid items-center xl:grid-cols-3 lg:grid-cols-2 w-full gap-10 max-w-[1400px] m-10">
        <GridItem title="Promedios diarios de glucosa">
          <AreaChartComponent onDataLoad={setGlucoseData} />
        </GridItem>

        <GridItem title="Presión">
          <LineChartComponent onDataLoad={setPressureData} />
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
  // Obtener la glucosa del día de hoy
  const todayGlucose = useMemo(() => {
    if (glucoseData.length === 0) return { value: "Sin datos", status: "N/A" };

    // Obtener la fecha de hoy sin hora
    const today = new Date();
    const todayDay = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

    console.log("🔍 Buscando datos para hoy:", `${todayDay}/${todayMonth + 1}/${todayYear}`);

    // Buscar el dato de hoy comparando día, mes y año
    const todayData = glucoseData.find(d => {
      const dataDate = new Date(d.day);
      const dataDay = dataDate.getDate();
      const dataMonth = dataDate.getMonth();
      const dataYear = dataDate.getFullYear();
      
      console.log("📅 Comparando con:", `${dataDay}/${dataMonth + 1}/${dataYear}`, "->", d.average);
      
      return dataDay === todayDay && dataMonth === todayMonth && dataYear === todayYear;
    });

    if (!todayData || !todayData.average) {
      console.log("⚠️ No se encontró dato de hoy, usando el más reciente");
      // Si no hay dato de hoy, usar el más reciente
      const latestData = glucoseData[glucoseData.length - 1];
      if (!latestData || !latestData.average) {
        return { value: "Sin datos", status: "N/A" };
      }
      
      const value = latestData.average.toFixed(1);
      let status = "Normal";
      if (value < 70) status = "Bajo";
      else if (value > 140) status = "Alto";
      else if (value > 100) status = "Pre-alto";
      
      return { value: `${value} mg/dL`, status, isToday: false };
    }

    console.log("✅ Dato de hoy encontrado:", todayData.average);
    
    const value = todayData.average.toFixed(1);
    let status = "Normal";
    if (value < 70) status = "Bajo";
    else if (value > 140) status = "Alto";
    else if (value > 100) status = "Pre-alto";

    return { value: `${value} mg/dL`, status, isToday: true };
  }, [glucoseData]);

  const resumen = [
    { 
      icon: <FiDroplet size={22} />, 
      label: todayGlucose.isToday ? "Glucosa de Hoy" : "Glucosa Reciente", 
      value: todayGlucose.value,
      status: todayGlucose.status
    },
    { 
      icon: <FiHeart size={22} />, 
      label: "Presión", 
      value: pressureData.length > 0 ? "Monitoreando" : "Sin datos",
      status: "Normal" 
    },
    { 
      icon: <FiThermometer size={22} />, 
      label: "Datos disponibles", 
      value: `${glucoseData.length} días`, 
      status: glucoseData.length > 0 ? "Activo" : "Sin datos" 
    },
    { 
      icon: <FiActivity size={22} />, 
      label: "Tendencia", 
      value: glucoseData.length > 1 ? "Monitoreando" : "Inicial",
      status: "En seguimiento" 
    },
  ];

  return (
    <div className="flex flex-col gap-2 w-full h-full justify-between text-slate-300">
      <div className="grid grid-cols-2 gap-3 text-center">
        {resumen.map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center bg-slate-700/40 rounded-lg p-3 hover:bg-slate-700/60 transition hover:cursor-default">
            <div className="text-blue-300">{item.icon}</div>
            <p className="text-xs font-medium">{item.label}</p>
            <p className="text-sm font-semibold text-white">{item.value}</p>
            <p className="text-xs text-slate-400">{item.status}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-700/30 rounded-lg py-2 text-sm text-center border border-slate-600">
        <p className="text-slate-400 text-xs">
          Última actualización: <span className="text-blue-300">
            {todayGlucose.isToday ? "hoy" : "datos recientes"}
          </span>
        </p>
      </div>
    </div>
  );
}