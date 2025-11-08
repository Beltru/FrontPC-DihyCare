"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "../src/api"; // usa la instancia con interceptores/autorización
import {
    AreaChart, Area, ResponsiveContainer, YAxis, XAxis, CartesianGrid, Tooltip, Legend
} from "recharts";

const mockData = [
  { name: "00:00", glucosatisular: 40, plasmaglucosa: 30 },
  { name: "01:00", glucosatisular: 50, plasmaglucosa: 20 },
  { name: "02:00", glucosatisular: 20, plasmaglucosa: 10 },
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
            console.log("datos recibidos /data/glucoseGraphic:", res.data);
            if (mounted) setData(res.data);
        } catch (err) {
            // logs detallados para depuración
            console.error("Error cargando datos del gráfico:", err);
            console.error("err.message:", err?.message);
            console.error("err.config:", err?.config);
            console.error("err.request:", err?.request);
            console.error("err.response?.status:", err?.response?.status);
            console.error("err.response?.data:", err?.response?.data);

            // Mensaje de error amigable para mostrar en UI
            const status = err?.response?.status;
            const serverMsg = err?.response?.data?.message || err?.response?.data || err?.message;
            setError({ status, serverMsg });

            // fallback para seguir mostrando algo en el chart
            setData(mockData);
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

    if (error) {
        return (
            <div className="w-full h-64 flex flex-col items-center justify-center gap-4 bg-slate-800 rounded-md p-4">
                <p className="text-red-400 text-sm">Error cargando datos ({error.status}): {String(error.serverMsg)}</p>
                <div className="flex gap-2">
                    <button
                        className="px-3 py-1 bg-indigo-600 text-white rounded"
                        onClick={() => { setError(null); fetchData(); }}
                    >
                        Reintentar
                    </button>
                    <button
                        className="px-3 py-1 bg-gray-600 text-white rounded"
                        onClick={() => setData(mockData)}
                    >
                        Usar datos de prueba
                    </button>
                </div>
                <p className="text-xs text-slate-400 mt-2">Revisa consola y logs del backend si el error persiste.</p>
            </div>
        );
    }

    return (
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
