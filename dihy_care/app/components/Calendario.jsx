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
const WEEKDAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const firstDayOfMonth = startOfMonth(currentDate);
const lastDayOfMonth = endOfMonth(currentDate);
const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });
const startingDayIndex = getDay(firstDayOfMonth);

// 🎨 Colores actualizados con contraste adecuado
const EVENT_TYPES = {
  "Cita médica": { bg: "bg-[#F4C20B]", text: "text-black" },
  "Reunión": { bg: "bg-[#377A95]", text: "text-white" },
  "Ejercicio": { bg: "bg-[#B081E9]", text: "text-white" },
  "Otro": { bg: "bg-[#7DD87D]", text: "text-black" },
};

const EventCalendar = ({ events: externalEvents = [], onAddEvent }) => {
  const [events, setEvents] = useState(() =>
    (externalEvents || []).map((e) => ({
      ...e,
      date: e.date instanceof Date ? e.date : new Date(e.date),
    }))
  );
  useEffect(() => {
    setEvents(
      (externalEvents || []).map((e) => ({
        ...e,
        date: e.date instanceof Date ? e.date : new Date(e.date),
      }))
    );
  }, [externalEvents]);

  const [activeDate, setActiveDate] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventType, setEventType] = useState("Cita médica");
  const [showModal, setShowModal] = useState(false);

  const calendarRef = useRef(null);

  const handleDayClick = (day) => {
    setActiveDate(day);
    setEventTitle("");
    setEventTime("");
    setEventType("Cita médica");
    setShowModal(true);
  };

  const handleDeleteEvent = (date, title, time) => {
    setEvents((prev) =>
      prev.filter(
        (event) =>
          !(
            isSameDay(event.date, date) &&
            event.title === title &&
            event.time === time
          )
      )
    );
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    if (!eventTitle || !eventTime || !activeDate) return;
    const { bg, text } = EVENT_TYPES[eventType] || { bg: "bg-gray-300", text: "text-black" };

    const newEvt = { date: activeDate, title: eventTitle, time: eventTime, type: eventType, color: bg, textColor: text };
    setEvents((prev) => [...prev, newEvt]);
    if (typeof onAddEvent === "function") {
      try {
        onAddEvent({ ...newEvt, date: newEvt.date.toISOString() });
      } catch {}
    }
    setShowModal(false);
  };

  const todayEvents = events
    .filter((event) => isToday(event.date))
    .sort((a, b) => (a.time || "").localeCompare(b.time || ""));

  return (
    <div className="h-full w-full flex gap-6 p-6 box-border text-gray-900">
      {/* Calendario principal */}
      <div className="flex-1 min-h-0 flex flex-col rounded-xl overflow-hidden bg-white shadow-md p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-gray-900">Agenda</h2>
          <span className="text-lg font-semibold text-gray-700">
            {format(currentDate, "MMMM yyyy")}
          </span>
        </div>

        {/* Grid de días */}
        <div ref={calendarRef} className="flex-1 min-h-0 flex gap-3 overflow-hidden">
          <div className="flex-1 min-h-0 overflow-auto">
            <div className="grid grid-cols-7 gap-3">
              {WEEKDAYS.map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-semibold text-gray-600 bg-[#F5F5F5] rounded-md py-2"
                >
                  {day}
                </div>
              ))}

              {Array.from({ length: startingDayIndex }).map((_, index) => (
                <div key={`empty-${index}`} className="p-2" />
              ))}

              {daysInMonth.map((day, index) => {
                const dayEvents = events
                  .filter((event) => isSameDay(event.date, day))
                  .sort((a, b) => (a.time || "").localeCompare(b.time || ""));

                return (
                  <div
                    key={index}
                    onClick={() => handleDayClick(day)}
                    className={clsx(
                      "border rounded-xl p-4 min-h-[120px] cursor-pointer transition hover:ring-2 hover:ring-emerald-500 relative bg-gray-50 flex flex-col",
                      {
                        "bg-green-400 ring-1 ring-green-400": isToday(day),
                      }
                    )}
                  >
                    <div className="absolute top-3 right-4 text-sm font-semibold text-gray-700">
                      {format(day, "d")}
                    </div>

                    <div className="mt-6 flex-1 overflow-auto flex flex-col gap-2">
                      {dayEvents.map((event, idx) => (
                        <div
                          key={idx}
                          className={clsx(
                            "text-xs px-2 py-1 rounded-md truncate font-medium flex justify-between items-center gap-2 shadow-sm",
                            event.color,
                            event.textColor
                          )}
                        >
                          <span className="truncate">
                            {(event.time ? `${event.time} - ` : "") + event.title}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteEvent(day, event.title, event.time);
                            }}
                            className="text-black/50 hover:text-black"
                            title="Eliminar"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar derecha */}
          <aside className="w-[300px] bg-white rounded-xl p-4 shadow-sm overflow-auto border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Eventos de hoy
            </h3>

            {todayEvents.length === 0 ? (
              <p className="text-gray-500 text-sm">No hay eventos para hoy</p>
            ) : (
              <div className="flex flex-col gap-3">
                {todayEvents.map((event, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span
                      className={clsx("w-3 h-3 rounded-full mt-2", event.color)}
                    />
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-900">
                        {event.title}
                      </div>
                      <div className="text-xs text-gray-600">
                        {event.time || format(event.date, "HH:mm")} • {event.type}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 border-t border-gray-100 pt-4 text-center text-xs text-gray-400">
              {format(new Date(), "EEEE dd 'de' MMMM yyyy")}
            </div>
          </aside>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600/30 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative text-gray-900">
            <button
              onClick={() => {
                setShowModal(false);
                setActiveDate(null);
              }}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>

            <h3 className="text-xl font-semibold mb-4 text-center">
              Nuevo evento - {activeDate && format(activeDate, "dd/MM/yyyy")}
            </h3>

            <form onSubmit={handleEventSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                autoFocus
                placeholder="Título del evento"
                className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400 outline-none"
              />

              <input
                type="time"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400 outline-none"
              />

              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400 outline-none"
              >
                {Object.keys(EVENT_TYPES).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 text-white rounded-lg px-4 py-2 hover:bg-emerald-700 transition"
                >
                  Guardar evento
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setActiveDate(null);
                  }}
                  className="flex-1 border rounded-lg px-4 py-2 hover:bg-gray-100"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCalendar;
