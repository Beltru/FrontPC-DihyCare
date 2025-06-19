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
import BarChartComponent from './components/BarChart';
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
    <main className="flex h-screen overflow-hidden bg-[#d9d9d9]">
      {/* Sidebar */}
      <div className={`bg-[#0e0e0e] min-h-full rounded-r-3xl text-gray-100 px-4 ${open ? 'w-[20vw]' : "w-[5vw]"} duration-500`}>
        <div className="py-3 flex justify-end">
          <HiMenuAlt3 size={26} className="cursor-pointer" onClick={() => setOpen(!open)} />
        </div>

        <div className="flex flex-col mt-4 gap-4">
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

      {/* Main Content */}
      <div className="flex flex-grow overflow-hidden p-2 w-[50vw]">
        {/* LEFT CONTENT */}
        <div className="flex flex-col flex-1 gap-2 overflow-hidden">
          <h1 className="text-3xl text-black font-bold">Welcome!</h1>

          {/* Main Graph */}
          <div className="bg-[#5bbec3] text-black rounded-xl flex items-center justify-center h-[30vh] w-[30vw]">
            <div className="w-full h-full px-2 py-2">
              <AreaChartComponent />
            </div>
          </div>

         <div className="bg-[#5bbec3] text-black rounded-xl flex items-center justify-center w-[30vw]">
            <div className="w-full h-full px-2 py-2">
              <BarChartComponent />
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT: AGENDA */}
        <div className="bg-gradient-to-b from-[#9fd1d1] to-[#b8e0df] rounded-xl p-4 w-[60%] h-full overflow-y-auto">
          <EventCalendar
            events={[
              { date: subDays(new Date(), 6), title: "Pill 1 (hs)" },
              { date: subDays(new Date(), 1), title: "Insulin (hs)" },
              { date: subDays(new Date(), 0), title: "Exercise (hs)" },
            ]}
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
