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
import MiniCalendar from './components/MiniCalendario';

import RightSideBar from './components/RightSidebar';
import { subDays } from 'date-fns';

const Home = () => {
  const [open, setOpen] = useState(true);
  const [dataOpen, setDataOpen] = useState(false);
  const [events, setEvents] = useState([]);

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
      <div className={`bg-[#0e0e0e] min-h-full rounded-r-3xl text-gray-100 px-4 ${open ? 'w-[20vw]' : 'w-[5vw]' } duration-500`}>
        <div className="py-3 flex justify-between items-center">
          <img src="/sidedihy.svg" className="cursor-pointer" onClick={() => setOpen(!open)}/>
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
      <div className="flex flex-grow overflow-hidden ml-6 p-2 w-[50vw]">
        {/* LEFT CONTENT */}
        <div className="flex flex-col flex-1 gap-6 overflow-hidden">
          <h1 className="text-3xl text-black font-bold">Welcome!</h1>

          {/* Main Graph */}
        <div className='flex flex-wrap gap-4 justify-center items-center w-[90%]'>
          <div className="bg-[#5bbec3] rounded-xl flex items-center justify-center h-[40vh] w-full">
            <div className="w-full h-full px-2 py-2">
              <AreaChartComponent />
            </div>
          </div>

         <div className="bg-[#5bbec3] rounded-xl flex items-center justify-center h-[40vh] w-full">
            <div className="w-full h-full px-2 py-2">
              <BarChartComponent />
            </div>
          </div>
      </div>
        </div>
        {/* RIGHT CONTENT: AGENDA */}
        <div className="flex flex-col bg-gradient-to-b from-[#9fd1d1] to-[#b8e0df] rounded-xl p-4 w-[55%] overflow-y-auto gap-0">
          <MiniCalendar/>
        </div>

      </div>
    </main>
  );
};

export default Home;
