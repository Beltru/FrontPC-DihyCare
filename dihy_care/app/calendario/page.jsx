"use client";
import { useState, useEffect } from 'react'
import Image from "next/image";
import React from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { FaWpforms } from "react-icons/fa";
import { GiForkKnifeSpoon } from "react-icons/gi";
import EventCalendar from '../components/Calendario';
import Link from 'next/link';

const Calendario = () => {
  const [dataOpen, setDataOpen] = useState(false);
  const [open, setOpen] = useState(true);
  const [events, setEvents] = useState([]);

  const userId = 1;

  const menus = [
    {name:"Home", link:"/", icon: MdOutlineDashboard},
    {name:"Charts", link:"/charts", icon: TbReportAnalytics, margin: true},
    {name:"Nutrition", link:"/recetas", icon: GiForkKnifeSpoon},
    {name:"Exercise", link:"/ejercicio", icon: AiOutlineHeart, margin: true},
    {name:"Settings", link:"/configuracion", icon: RiSettings4Line},
  ];

  //  Cargar eventos del backend filtrados por userId
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("https://dihycare-backend.vercel.app/calendar/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId })
        });

        const data = await res.json();

        // Adaptar al formato que usa tu calendario
        const formatted = data.map(ev => ({
          date: new Date(ev.date),
          title: ev.event,
          description: ev.description,
          type: ev.type,
          userId: ev.userId
        }));

        setEvents(formatted);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    fetchEvents();
  }, []);

  // 🔹 Guardar evento nuevo
  const addEvent = async (newEvent) => {
    try {
      const res = await fetch("https://dihycare-backend.vercel.app/calendar/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          ...newEvent,
          userId
        })
      });

      if (!res.ok) throw new Error("Error saving event");

      // añadir al estado local
      setEvents([...events, { ...newEvent, date: new Date(newEvent.date), userId }]);
    } catch (err) {
      console.error("Error adding event:", err);
    }
  };

  return (
    <main className="flex gap-6 min-h-screen bg-[#AACBC4]">
      {/* Sidebar */}
      <div className={`bg-[#0e0e0e] min-h-screen rounded-r-3xl text-gray-100 px-4 ${open? 'w-[20vw]': "w-[5vw]"} duration-500 `}>
        <div className="py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer transition-all duration-300" onClick={() => setOpen(!open)}>
            <img src="/CorazonClaro.png" alt="Logo" className="w-9 h-8 transition-all duration-300"/>
            <span className={`text-[#5bbec3] text-lg font-semibold transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}>
              DiHy Care
            </span>
          </div>
          <HiMenuAlt3 size={26} className="cursor-pointer transition-transform duration-300 hover:scale-110" onClick={() => setOpen(!open)}/>
        </div>

        {/* Menu */}
        <div className='flex flex-col mt-4 gap-4 relative'>
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

      {/* Contenido */}
      <div className='flex flex-1 justify-center items-start text-slate-900 font-bold'>
        <EventCalendar 
          events={events}
          onAddEvent={addEvent} // 👈 para que el calendario pueda agregar
        />
      </div>
    </main>
  );
}

export default Calendario;
