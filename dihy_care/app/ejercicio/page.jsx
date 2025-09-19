"use client";
import { useState, useEffect } from 'react';
import React from "react";
import Link from 'next/link';
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineHeart } from "react-icons/ai";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { FiMessageSquare } from "react-icons/fi";
import { FaCalendarAlt, FaWpforms } from "react-icons/fa";
import { GiForkKnifeSpoon } from "react-icons/gi";
import {MdOutlineDashboard} from "react-icons/md";
import Pasos from '../components/Pasos';
import Uptime from '../components/Uptime';



const Home = () => {
  const [open, setOpen] = useState(true);
  const [dataOpen, setDataOpen] = useState(false);
  const [events, setEvents] = useState([]);

  const menus = [
    { name: "Home", link: "/", icon: MdOutlineDashboard },
    { name: "Charts", link: "/charts", icon: TbReportAnalytics, margin: true },
    { name: "Calendar", link: "/calendario", icon: FaCalendarAlt },
    { name: "Nutrition", link: "/recetas", icon: GiForkKnifeSpoon },
    { name: "Settings", link: "/configuracion", icon: RiSettings4Line },
  ];

  return (
    <main className="flex h-screen overflow-hidden bg-[#d9d9d9]">
      {/* Sidebar */}
      <div className={`bg-[#0e0e0e] min-h-full rounded-r-3xl text-gray-100 px-4 ${open ? 'w-[20vw]' : 'w-[5vw]' } duration-500`}>
      <div className="py-4 flex items-center justify-between relative">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer transition-all duration-300" onClick={() => setOpen(!open)}>
            <img src="/CorazonClaro.png" alt="Logo" className="w-9 h-8 transition-all duration-300"/>
            <span className={`text-[#5bbec3] text-lg font-semibold transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}>
              DiHy Care
           </span>
          </div>

          {/* Botón de menú siempre visible */}
          <HiMenuAlt3 size={26} className="cursor-pointer transition-transform duration-300 hover:scale-110" onClick={() => setOpen(!open)}/>
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
            <h1 className="text-3xl text-black font-bold">Exercise</h1>
         
          

          {/* Main Graph */}
        <div className='flex flex-col gap-4 justify-center items-center w-[90%]'>
            
          <div className="flex flex-col items-center justify-center">
            <div className='flex flex-row items-center gap-1'>
            <img src="steps.png"/>
            <h1 className='text-black text-2xl font-bold'>Step Counter</h1>
         </div>
            
            <div className="w-full h-full px-2 py-2">
                <Pasos number={6500} maxValue={10000} name="Pasos" />
            </div>
          </div>

         <div className="flex flex-col items-center justify-center">
            <div className='flex flex-row items-center gap-1'>
            <img src="steps.png"/>
            <h1 className='text-black text-2xl font-bold'>Up Time</h1>
         </div>
           
            <div className="w-full h-full px-2 py-2"> 
                <Uptime name="Uptime" number={60} unit="min" secondaryNumber={4.33} secondaryUnit="km"/>
            </div>
          </div>
      </div>
        </div>
        {/* RIGHT CONTENT: AGENDA */}
        <div className="flex flex-col items-center justify-center border-l-2 border-black p-4 w-[45vw]">
          <ul className='flex flex-col gap-5'>
            <li className='bg-blue-300 rounded-xl w-[15vw] h-[12vh] flex flex-row items-center gap-2'><img src="pushups.png" className='p-2 rounded-xl bg-gray-100 w-[5vw] h-[10vh] ml-2'/><p className='text-[85%] font-bold text-black flex flex-col'>Push Up <p className='text-[80%]'>20 push up a day</p></p></li>
            <li className='bg-blue-300 rounded-xl w-[15vw] h-[12vh] flex flex-row items-center gap-2'><img src="pushups.png" className='p-2 rounded-xl bg-gray-100 w-[5vw] h-[10vh] ml-2'/><p className='text-[85%] font-bold text-black flex flex-col'>Squats <p className='text-[80%]'>10 minutes a day</p></p></li>
            <li className='bg-blue-300 rounded-xl w-[15vw] h-[12vh] flex flex-row items-center gap-2'><img src="pushups.png" className='p-2 rounded-xl bg-gray-100 w-[5vw] h-[10vh] ml-2'/><p className='text-[85%] font-bold text-black flex flex-col'>Sit up <p className='text-[80%]'>30 sit up a day</p></p></li>
            <li className='bg-blue-300 rounded-xl w-[15vw] h-[12vh] flex flex-row items-center gap-2'><img src="pushups.png" className='p-2 rounded-xl bg-gray-100 w-[5vw] h-[10vh] ml-2'/><p className='text-[85%] font-bold text-black flex flex-col'>Bridge <p className='text-[80%]'>30 bridge a day</p></p></li>
            <li className='bg-blue-300 rounded-xl w-[15vw] h-[12vh] flex flex-row items-center gap-2'><img src="pushups.png" className='p-2 rounded-xl bg-gray-100 w-[5vw] h-[10vh] ml-2'/><p className='text-[85%] font-bold text-black flex flex-col'>Crab walk <p className='text-[80%]'>7 minutes a day</p></p></li>
          </ul>
        </div>

      </div>
    </main>
  );
};

export default Home;
