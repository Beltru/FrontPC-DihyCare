"use client";
import { useState, useEffect, useRef } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isToday,
  isSameDay,
} from "date-fns";
import clsx from "clsx";

const currentDate = new Date();
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const firstDayOfMonth = startOfMonth(currentDate);
const lastDayOfMonth = endOfMonth(currentDate);
const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });
const startingDayIndex = getDay(firstDayOfMonth);

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [activeDate, setActiveDate] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const calendarRef = useRef(null);

  const handleDayClick = (day) => {
    setActiveDate(day);
    setEventTitle("");
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    if (!eventTitle || !activeDate) return;

    setEvents([...events, { date: activeDate, title: eventTitle }]);
    setActiveDate(null);
    setEventTitle("");
  };

  // Detectar clics fuera del calendario
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setActiveDate(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-center text-3xl text- font-semibold mb-4">
        {format(currentDate, "MMMM yyyy")}
      </h2>

      <div ref={calendarRef} className="grid grid-cols-7 gap-2">
        {WEEKDAYS.map((day) => (
          <div key={day} className="font-bold text-xl border text-center px-6 py-1 bg-white rounded-md">
            {day}
          </div>
        ))}

        {Array.from({ length: startingDayIndex }).map((_, index) => (
          <div key={`empty-${index}`} className="border rounded-md p-2" />
        ))}

        {daysInMonth.map((day, index) => {
          const dayEvents = events.filter((event) => isSameDay(event.date, day));
          const isActive = activeDate && isSameDay(day, activeDate);

          return (
            <div
              key={index}
              onClick={() => handleDayClick(day)}
              className={clsx(
                "border rounded-md p-2 text-xl text-left cursor-pointer hover:bg-emerald-500",
                {
                  "bg-emerald-800 text-white": isToday(day),
                }
              )}
            >
              <div className="text-center font-semibold">{format(day, "d")}</div>

              {/* Mostrar eventos */}
              {dayEvents.map((event, idx) => (
                <div key={idx} className="mt-1 text-xs bg-emerald-400 text-slate-800 px-1 rounded">
                  {event.title}
                </div>
              ))}

              {/* Formulario inline si el día está activo */}
              {isActive && (
                <form
                  onClick={(e) => e.stopPropagation()}
                  onSubmit={handleEventSubmit}
                  className="mt-2"
                >
                  <input
                    type="text"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    autoFocus
                    placeholder="Nuevo evento"
                    className="text-xs w-full border rounded px-1 py-0.5"
                  />
                  <button
                    type="submit"
                    className="mt-1 w-full text-xs bg-blue-600 text-white rounded px-1 py-0.5 hover:bg-blue-700"
                  >
                    Guardar
                  </button>
                </form>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventCalendar;
