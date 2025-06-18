"use client";
import { useState } from 'react';
import React from "react";
import Link from 'next/link';
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineHeart } from "react-icons/ai";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { FiMessageSquare } from "react-icons/fi";
import { FaCalendarAlt, FaWpforms } from "react-icons/fa";
import { GiForkKnifeSpoon } from "react-icons/gi";
import AreaChartComponent from './components/AreaChart';
import EventCalendar from './components/Calendario';
import { subDays } from 'date-fns';
const Home = () => {
  const [open, setOpen] = useState(true);
  const [dataOpen, setDataOpen] = useState(false);

  const menus = [
    { name: "Messages", link: "/", icon: FiMessageSquare },
    { name: "Graficos", link: "/charts", icon: TbReportAnalytics, margin: true },
    { name: "Agenda", link: "/calendario", icon: FaCalendarAlt },
    { name: "Alimentacion", link: "/", icon: GiForkKnifeSpoon },
    { name: "Ejercicio", link: "/", icon: AiOutlineHeart, margin: true },
    { name: "Configuracion", link: "/", icon: RiSettings4Line },
  ];

  return (
    <main className="flex gap-6 min-h-screen bg-[#d9d9d9]">
      {/* Sidebar */}
      <div className={`bg-[#0e0e0e] min-h-screen rounded-r-3xl text-gray-100 px-4 ${open ? 'w-[20vw]' : "w-[5vw]"} duration-500`}>
        <div className='py-3 flex justify-end'>
          <HiMenuAlt3 size={26} className="cursor-pointer" onClick={() => setOpen(!open)} />
        </div>

        <div className='flex flex-col mt-4 gap-4 relative'>
          {/* Dropdown Data */}
          <div onClick={() => setDataOpen(!dataOpen)} className="flex items-center justify-between text-sm gap-3.5 font-medium p-2 hover:bg-gray-700 rounded-md cursor-pointer">
            <div className="flex items-center gap-3">
              <FaWpforms size={20} />
              {open && <span>Data</span>}
            </div>
            {open && <span className="ml-auto">{dataOpen ? "▲" : "▼"}</span>}
          </div>

          {dataOpen && open && (
            <div className="ml-4 flex flex-col gap-1 text-sm">
              <Link href="/datoshipertension" className="hover:bg-slate-800 rounded-md pl-4">↳ Hipertensión</Link>
              <Link href="/datosdiabetes" className="hover:bg-slate-800 rounded-md pl-4">↳ Diabetes</Link>
            </div>
          )}

          {/* Otros menús */}
          {menus.map((menu, i) => (
            <Link
              href={menu.link}
              key={i}
              className={`${menu?.margin && "mt-5"} group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-700 rounded-md`}
            >
              <div>{React.createElement(menu.icon, { size: 20 })}</div>
              {open && <span>{menu.name}</span>}
            </Link>
          ))}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex flex-col lg:flex-row flex-grow p-6 gap-6 w-full text-black bg-[#d9d9d9]">
      {/* IZQUIERDA - Bienvenida y gráficos */}
      <div className="flex flex-col flex-1 gap-6">
        <h1 className="text-3xl font-bold">Welcome!</h1>

        {/* Gráfico principal */}
        <div className="flex items-center justify-center h-[50vh] w-[50vw] rounded-xl">
          <GridItem title="Area Chart"> <AreaChartComponent /> </GridItem>
        </div>

        {/* Calorías y últimos registros */}
        <div className="grid grid-cols-2 gap-4">
          {/* Calorías */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="font-semibold text-lg mb-2">Calories</h3>
            <div className="flex justify-between items-end h-24">
              {[3, 5, 4, 2, 3].map((val, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className="w-4 bg-[#48b4b7] rounded"
                    style={{ height: `${val * 10}px` }}
                  />
                  <span className="text-xs mt-1">txt</span>
                </div>
              ))}
            </div>
          </div>

          {/* Últimos Registros */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="font-semibold text-lg mb-2">Latest Records</h3>
            <div className="grid grid-cols-2 gap-y-1 text-sm">
              <span>txt</span>
              <span>txt</span>
              <span>txt</span>
              <span>txt</span>
              <span>txt</span>
              <span>txt</span>
            </div>
          </div>
        </div>
      </div>

      {/* DERECHA - Agenda */}
      <div className="bg-gradient-to-b from-[#9fd1d1] to-[#b8e0df] rounded-xl p-4 w-[50vw]">
        <EventCalendar 
            events={[
              {date:subDays(new Date(), 6), title: "Post Video"},
              {date:subDays(new Date(), 1), title: "Edit Video"},
              {date:subDays(new Date(), 3), title: "Code"},
            ]}/>
      </div>
    </div>
    </main>
  );
};

function GridItem({ title, children }) {
  return (
    <div className="p-4 bg-slate-800 text-white rounded-lg shadow-md  h-[350px]">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <div className="h-full w-full flex items-center justify-center">
      {children}
    </div>
 </div>
  );
}
export default Home;
