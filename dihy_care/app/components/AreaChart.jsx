"use client";

import { useEffect, useState } from "react";
import axios from "../src/api"; // usa la instancia con interceptores/autorización
import {
    AreaChart, Area, ResponsiveContainer, YAxis, XAxis, CartesianGrid, Tooltip, Legend
} from "recharts";

const AreaChartComponent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        let mounted = true;
        axios.get("/data/glucoseGraphic")
            .then((res) => {
                console.log("datos recibidos /data/glucoseGraphic:", res.data);
                if (mounted) setData(res.data);
            })
            .catch((err) => {
                console.error("Error cargando datos del gráfico:", err);
                if (err?.response?.status === 401) {
                    console.error("No autorizado - token inválido/expirado");
                    // opcional: redirigir a login o disparar flujo de refresh
                    // router.push('/login') o similar según tu app
                }
            });
        return () => { mounted = false; };
    }, []);

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

    // payload[0] corresponde a la serie 'plasmaglucosa'; .payload es el objeto original
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
