"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "../src/api"; // usa la instancia con interceptors/autorización
import {
    AreaChart, Area, ResponsiveContainer, YAxis, XAxis, CartesianGrid, Tooltip, Legend
} from "recharts";

const mockData = [
  { name: "00:00", plasmaglucosa: 30 },
  { name: "01:00", plasmaglucosa: 20 },
  { name: "02:00", plasmaglucosa: 10 },
];

const normalize = (raw) => {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => {
      const name = item.name ?? item.time ?? item.date ?? item.label ?? "";
      const plasmaglucosa = Number(item.plasmaglucosa ?? item.plasma_glucose ?? item.value ?? item.glucosa ?? NaN);
      return { name, plasmaglucosa };
    })
    .filter((p) => p.name && !Number.isNaN(p.plasmaglucosa));
};

const AreaChartComponent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        let mounted = true;
        setLoading(true);
        setError(null);

        try {
            console.log("axios.baseURL:", axios.defaults?.baseURL);
            const res = await axios.get("/data/glucoseGraphic");
            const normalized = normalize(res.data);
            console.log("datos normalizados:", normalized);
            if (mounted) setData(normalized.length ? normalized : mockData);
        } catch (err) {
            console.error("Error cargando datos del gráfico:", err);
            const status = err?.response?.status;
            const serverMsg = err?.response?.data?.message || err?.response?.data || err?.message;
            setError({ status, serverMsg });
            if (mounted) setData(mockData);
        } finally {
            setLoading(false);
        }

        return () => { mounted = false; };
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (loading) {
        return (
            <div className="w-full h-64 flex items-center justify-center">
                <span className="text-sm text-slate-500">Cargando gráfico...</span>
            </div>
        );
    }

    // Mostrar barra de error con acciones (si hay error) y siempre renderizar el chart con plasmaglucosa
    return (
        <div>
            {error && (
                <div className="w-full mb-4 p-3 rounded-md bg-slate-800 flex items-center justify-between">
                    <div className="text-sm text-red-300">
                        Error cargando datos ({error.status}): {String(error.serverMsg)}
                    </div>
                    <div className="flex gap-2">
                        <button
                            className="px-3 py-1 bg-indigo-600 text-white rounded"
                            onClick={() => { setError(null); fetchData(); }}
                        >
                            Reintentar
                        </button>
                        <button
                            className="px-3 py-1 bg-gray-600 text-white rounded"
                            onClick={() => { setData(mockData); setError(null); }}
                        >
                            Usar datos de prueba
                        </button>
                    </div>
                </div>
            )}

            <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart width={500} height={400} data={data} margin={{ right: 30 }}>
                        <YAxis />
                        <XAxis dataKey="name" />
                        <CartesianGrid strokeDasharray="5 5" />
                        <Tooltip content={CustomToolTip} />
                        <Legend />
                        <Area type="monotone" dataKey="plasmaglucosa" stroke="#7c3aed" fill="#8b5cf6" stackId="1" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const CustomToolTip = ({ active, payload, label }) => {
    if (!(active && payload && payload.length)) return null;

    const point = payload[0]?.payload || {};
    const value = point.plasmaglucosa ?? payload[0]?.value ?? "-";

    return (
        <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
            <p className="text-medium text-lg">{label}</p>
            <p className="text-sm text-blue-400">
                Plasma-Glucosa: <span className="ml-2">{value} g/dl</span>
            </p>
        </div>
    );
};

export default AreaChartComponent;
