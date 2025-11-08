"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "../src/api";
import {
    AreaChart, Area, ResponsiveContainer, YAxis, XAxis, CartesianGrid, Tooltip, Legend
} from "recharts";

const mockData = [
  { day: "2025-11-02", average: 102.03 },
  { day: "2025-11-03", average: 114.03 },
  { day: "2025-11-04", average: 96.69 },
];

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
            const payload = Array.isArray(res.data) ? res.data : res.data?.data ?? [];
            console.log("datos recibidos (payload):", payload);

            // Asegurar que 'average' sea Number (evita strings/NaN)
            const safe = payload.map(p => ({ ...p, average: Number(p.average) }));
            if (mounted) setData(safe.length ? safe : mockData);
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

            <div className="w-full" style={{ height: 260, minHeight: 260 }}>
                {/* ResponsiveContainer usa 100% de la altura del padre */}
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ right: 30 }}>
                        <YAxis type="number" domain={['dataMin - 10', 'dataMax + 10']} />
                        <XAxis dataKey="day" />
                        <CartesianGrid strokeDasharray="5 5" />
                        <Tooltip content={CustomToolTip} />
                        <Legend />
                        <Area type="monotone" dataKey="average" stroke="#7c3aed" fill="#8b5cf6" strokeWidth={2} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const CustomToolTip = ({ active, payload, label }) => {
    if (!(active && payload && payload.length)) return null;

    const point = payload[0]?.payload || {};
    const value = typeof point.average === "number" ? point.average.toFixed(2) : point.average ?? "-";

    return (
        <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
            <p className="text-medium text-lg">{point.day ?? label}</p>
            <p className="text-sm text-blue-400">
                Promedio: <span className="ml-2">{value} mg/dl</span>
            </p>
        </div>
    );
};

export default AreaChartComponent;
