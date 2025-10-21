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
