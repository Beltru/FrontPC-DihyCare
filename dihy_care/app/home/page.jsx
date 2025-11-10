"use client";
import { useState } from 'react';
import React from "react";
import AreaChartComponent from '../components/GlucosaChart';
import LineChartComponent from '../components/PresionChart';
import MiniCalendar from '../components/MiniCalendario';

const Home = () => {
  const [open, setOpen] = useState(true);
  const [dataOpen, setDataOpen] = useState(false);
  const [events, setEvents] = useState([]);

  return (
    <main className="h-screen bg-[#d9d9d9] p-6">
      <div className="h-full flex gap-6">
        {/* COLUMNA IZQUIERDA - GRÁFICOS */}
        <div className="flex-1 flex flex-col h-full">
          {/* Título */}
          <h1 className="text-2xl text-black font-bold mb-4">Welcome!</h1>
          
          {/* Contenedor de gráficos con altura controlada */}
          <div className="flex-1 flex flex-col gap-4 max-h-[calc(100vh-120px)]">
            {/* Gráfico 1 */}
            <div className="bg-[#5bbec3] rounded-xl flex-1 min-h-0">
              <div className="w-full h-full p-4">
                <AreaChartComponent/>
              </div>
            </div>

            {/* Gráfico 2 */}
            <div className="bg-[#5bbec3] rounded-xl flex-1 min-h-0">
              <div className="w-full h-full p-4">
                <LineChartComponent />
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA - CALENDARIO */}
        <div className="bg-[#AACBC4] rounded-xl p-6 w-[400px] flex-shrink-0 overflow-y-auto">
          <MiniCalendar/>
        </div>
      </div>
    </main>
  );
};

export default Home;