"use client";
import { useState, useEffect } from "react";
import EventCalendar from "../components/Calendario";

const Calendario = () => {
  const [events, setEvents] = useState([]);
  const userId = 1;

  const fetchEvents = async () => {
    try {
      const res = await fetch("https://dihycare-backend.vercel.app/calendar/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if(res.ok) {

        const data = await res.json();
  
        const formatted = data.map((ev) => ({
          date: new Date(ev.date),
          title: ev.event,
          description: ev.description,
          type: ev.type,
          userId: ev.userId,
        }));
  
        setEvents(formatted);
      } else {
        throw new Error("Error fetching events");
      }

    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  // Cargar eventos del backend
  useEffect(() => {
    fetchEvents();
  }, []);

  // Guardar evento nuevo
  const addEvent = async (newEvent) => {
    try {
      const res = await fetch("https://dihycare-backend.vercel.app/calendar/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newEvent,
          userId,
        }),
      });

      if (!res.ok) throw new Error("Error saving event");

      setEvents((prev) => [
        ...prev,
        { ...newEvent, date: new Date(newEvent.date), userId },
      ]);
    } catch (err) {
      console.error("Error adding event:", err);
    }
  };

  return (
    <main className="flex w-full h-screen overflow-x-auto bg-[#AACBC4] text-white">
  <div className="flex flex-row gap-6 p-6 w-full">
        <EventCalendar
          events={events}
          onAddEvent={addEvent}
        />
      </div>
    </main>
  );
};

export default Calendario;
