"use client";
import RightSideBar from "./RightSidebar";
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

const colors = ["bg-yellow-200", "bg-purple-200", "bg-blue-200"];

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [activeDate, setActiveDate] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const calendarRef = useRef(null);

  const handleDayClick = (day) => {
    setActiveDate(day);
    setEventTitle("");
  };

  const handleDeleteEvent = (date, title) => {
    setEvents((prevEvents) =>
      prevEvents.filter(
        (event) => !(isSameDay(event.date, date) && event.title === title)
      )
    );
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    if (!eventTitle || !activeDate) return;
    const color = colors[Math.floor(Math.random() * colors.length)];
    setEvents([...events, { date: activeDate, title: eventTitle, color }]);
    setActiveDate(null);
    setEventTitle("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setActiveDate(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const todayEvents = events.filter((event) => isToday(event.date));

  return (
    <div className="min-h-screen w-full px-4 py-4 text-gray-800 overflow-hidden box-border flex">
      {/* MAIN WRAPPER */}
      <div className="flex flex-col flex-1 max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">Agenda</h2>
          <span className="text-lg font-semibold">{format(currentDate, "MMMM yyyy")}</span>
        </div>

        {/* Calendar Grid */}
        <div
          ref={calendarRef}
          className="grid grid-cols-7 gap-3 flex-grow overflow-hidden"
        >
          {WEEKDAYS.map((day) => (
            <div key={day} className="text-center text-base font-semibold text-gray-500">
              {day}
            </div>
          ))}

          {Array.from({ length: startingDayIndex }).map((_, index) => (
            <div key={`empty-${index}`} />
          ))}

          {daysInMonth.map((day, index) => {
            const dayEvents = events.filter((event) => isSameDay(event.date, day));
            const isActive = activeDate && isSameDay(day, activeDate);

            return (
              <div
                key={index}
                onClick={() => handleDayClick(day)}
                className={clsx(
                  "border rounded-xl p-4 min-h-[120px] cursor-pointer transition hover:ring-2 hover:ring-emerald-500 relative bg-gray-100",
                  {
                    "bg-green-500 text-black": isToday(day),
                  }
                )}
              >
                <div className="absolute top-3 right-4 text-sm font-semibold">
                  {format(day, "d")}
                </div>

                <div className="flex flex-col gap-2 mt-6">
                  {dayEvents.map((event, idx) => (
                    <div
                      key={idx}
                      className={clsx(
                        "text-xs px-2 py-1 rounded-md truncate font-medium flex justify-between items-center gap-2",
                        event.color
                      )}
                    >
                      <span className="truncate">{event.title}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteEvent(day, event.title);
                        }}
                        className="text-red-600 font-bold text-xs hover:text-red-800"
                        title="Eliminar"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                {isActive && (
                  <form
                    onClick={(e) => e.stopPropagation()}
                    onSubmit={handleEventSubmit}
                    className="absolute inset-0 bg-white bg-opacity-95 p-4 rounded-xl flex flex-col justify-center"
                  >
                    <input
                      type="text"
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                      autoFocus
                      placeholder="Nuevo evento"
                      className="text-sm border rounded px-3 py-2 mb-2"
                    />
                    <button
                      type="submit"
                      className="text-sm bg-black text-white rounded px-3 py-2 hover:bg-gray-800"
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

      {/* RIGHT SIDEBAR */}
      <RightSideBar events={events} />
      </div>
  );
};

export default EventCalendar;
