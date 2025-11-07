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
import { es } from "date-fns/locale";
import clsx from "clsx";

const currentDate = new Date();
const WEEKDAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const firstDayOfMonth = startOfMonth(currentDate);
const lastDayOfMonth = endOfMonth(currentDate);
const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });
const startingDayIndex = getDay(firstDayOfMonth);

// 🎨 Mapeo de tipos del enum de la DB
const EVENT_TYPE_MAP = {
  DIABETES: "Diabetes",
  HYPERTENSION: "Hipertensión",
  EXERCISE: "Ejercicio",
  MEDICATION: "Medicación",
  OTHER: "Otro",
};

// 🎨 Colores por tipo
const EVENT_COLORS = {
  DIABETES: { bg: "bg-[#F4C20B]", text: "text-black" },
  HYPERTENSION: { bg: "bg-[#E74C3C]", text: "text-white" },
  EXERCISE: { bg: "bg-[#B081E9]", text: "text-white" },
  MEDICATION: { bg: "bg-[#3498DB]", text: "text-white" },
  OTHER: { bg: "bg-[#7DD87D]", text: "text-black" },
};

const EventCalendar = ({ 
  events: externalEvents = [], 
  onAddEvent, 
  onUpdateEvent, 
  onDeleteEvent 
}) => {
  const [events, setEvents] = useState([]);
  const [activeDate, setActiveDate] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventType, setEventType] = useState("DIABETES");
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calendarRef = useRef(null);

  // ✅ Sincronizar eventos externos con estado local
  useEffect(() => {
    console.log('📊 Eventos recibidos del padre:', externalEvents);
    setEvents(
      (externalEvents || []).map((e) => ({
        ...e,
        date: e.date instanceof Date ? e.date : new Date(e.date),
      }))
    );
  }, [externalEvents]);

  // ✅ Abrir modal para crear evento
  const handleDayClick = (day) => {
    setActiveDate(day);
    setEventTitle("");
    setEventDescription("");
    setEventTime("");
    setEventType("DIABETES");
    setEditingEvent(null);
    setShowModal(true);
  };

  // ✅ Abrir modal para editar evento
  const handleEditEvent = (event, day) => {
    // Solo permitir editar eventos que tienen ID válido
    if (!event.id) {
      alert('Este evento no se puede editar porque no está guardado en el servidor');
      return;
    }

    setActiveDate(day);
    setEventTitle(event.title);
    setEventDescription(event.description || "");
    setEventTime(event.time || format(event.date, "HH:mm"));
    setEventType(event.type || "OTHER");
    setEditingEvent(event);
    setShowModal(true);
  };

  // ✅ Eliminar evento - CON VALIDACIÓN DE ID
  const handleDeleteEvent = async (event, e) => {
    e?.stopPropagation();
    
    // ✅ VALIDACIÓN CRÍTICA: Verificar que el evento tiene un ID válido
    if (!event.id) {
      console.error('❌ No se puede eliminar: evento sin ID válido', event);
      alert('Este evento no se puede eliminar porque no tiene un ID válido. Intenta recargar la página.');
      return;
    }

    if (!window.confirm(`¿Eliminar "${event.title}"?`)) {
      return;
    }

    try {
      console.log('🗑️ Intentando eliminar evento:', event);
      
      if (onDeleteEvent) {
        await onDeleteEvent(event.id);
        console.log('✅ Evento eliminado exitosamente');
      }
    } catch (error) {
      console.error('❌ Error al eliminar evento:', error);
      alert(`Error al eliminar el evento: ${error.message}`);
    }
  };

  // ✅ Guardar o actualizar evento
  const handleEventSubmit = async (e) => {
    e.preventDefault();
    
    if (!eventTitle || !activeDate) {
      alert('Por favor completa el título del evento');
      return;
    }

    if (isSubmitting) {
      return; // Prevenir doble click
    }

    setIsSubmitting(true);

    try {
      // Combinar fecha con hora
      let eventDateTime = new Date(activeDate);
      if (eventTime) {
        const [hours, minutes] = eventTime.split(':');
        eventDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      } else {
        eventDateTime.setHours(0, 0, 0, 0);
      }

      const eventData = {
        title: eventTitle,
        description: eventDescription,
        date: eventDateTime.toISOString(),
        time: eventTime,
        type: eventType,
      };

      if (editingEvent && editingEvent.id) {
        // ✅ Actualizar evento existente
        console.log('✏️ Actualizando evento:', editingEvent.id);
        if (onUpdateEvent) {
          await onUpdateEvent(editingEvent.id, eventData);
          console.log('✅ Evento actualizado');
        }
      } else {
        // ✅ Crear nuevo evento
        console.log('➕ Creando nuevo evento');
        if (onAddEvent) {
          const savedEvent = await onAddEvent(eventData);
          console.log('✅ Evento creado con ID:', savedEvent?.id);
        }
      }

      setShowModal(false);
      setEditingEvent(null);
      
    } catch (error) {
      console.error('❌ Error al guardar evento:', error);
      alert(`Error al guardar el evento: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Obtener color del evento
  const getEventColor = (type) => {
    return EVENT_COLORS[type] || EVENT_COLORS.OTHER;
  };

  const todayEvents = events
    .filter((event) => isToday(event.date))
    .sort((a, b) => {
      const timeA = a.time || format(a.date, "HH:mm");
      const timeB = b.time || format(b.date, "HH:mm");
      return timeA.localeCompare(timeB);
    });

  return (
    <div className="h-full w-full flex gap-6 p-6 box-border text-gray-900">
      {/* Calendario principal */}
      <div className="flex-1 min-h-0 flex flex-col rounded-xl overflow-hidden bg-white shadow-md p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-gray-900">Agenda</h2>
          <span className="text-lg font-semibold text-gray-700">
            {format(currentDate, "MMMM yyyy", { locale: es })}
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
                  .sort((a, b) => {
                    const timeA = a.time || format(a.date, "HH:mm");
                    const timeB = b.time || format(b.date, "HH:mm");
                    return timeA.localeCompare(timeB);
                  });

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
                      {dayEvents.map((event, idx) => {
                        const colors = getEventColor(event.type);
                        const displayTime = event.time || format(event.date, "HH:mm");
                        
                        return (
                          <div
                            key={event.id || idx}
                            className={clsx(
                              "text-xs px-2 py-1 rounded-md font-medium flex justify-between items-center gap-2 shadow-sm group",
                              colors.bg,
                              colors.text
                            )}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditEvent(event, day);
                            }}
                          >
                            <span className="truncate flex-1">
                              {`${displayTime} - ${event.title}`}
                            </span>
                            {/* ✅ Solo mostrar botón de eliminar si tiene ID válido */}
                            {event.id && (
                              <button
                                onClick={(e) => handleDeleteEvent(event, e)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity text-black/50 hover:text-black text-lg leading-none flex-shrink-0"
                                title="Eliminar"
                              >
                                ×
                              </button>
                            )}
                          </div>
                        );
                      })}
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
                {todayEvents.map((event, idx) => {
                  const colors = getEventColor(event.type);
                  const displayTime = event.time || format(event.date, "HH:mm");
                  
                  return (
                    <div key={event.id || idx} className="flex items-start gap-3">
                      <span
                        className={clsx("w-3 h-3 rounded-full mt-2 flex-shrink-0", colors.bg)}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-900 truncate">
                          {event.title}
                        </div>
                        <div className="text-xs text-gray-600">
                          {displayTime} • {EVENT_TYPE_MAP[event.type] || event.type}
                        </div>
                        {event.description && (
                          <div className="text-xs text-gray-500 mt-1">
                            {event.description}
                          </div>
                        )}
                        {/* Indicador visual si no tiene ID */}
                        {!event.id && (
                          <div className="text-xs text-orange-500 mt-1">
                            ⚠️ Sin sincronizar
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-6 border-t border-gray-100 pt-4 text-center text-xs text-gray-400">
              {format(new Date(), "EEEE dd 'de' MMMM yyyy", { locale: es })}
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
                if (!isSubmitting) {
                  setShowModal(false);
                  setActiveDate(null);
                  setEditingEvent(null);
                }
              }}
              disabled={isSubmitting}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl disabled:opacity-50"
            >
              ×
            </button>

            <h3 className="text-xl font-semibold mb-4 text-center">
              {editingEvent ? 'Editar evento' : 'Nuevo evento'} - {activeDate && format(activeDate, "dd/MM/yyyy")}
            </h3>

            <form onSubmit={handleEventSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                autoFocus
                placeholder="Título del evento"
                required
                disabled={isSubmitting}
                className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400 outline-none disabled:opacity-50"
              />

              <textarea
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                placeholder="Descripción (opcional)"
                rows={2}
                disabled={isSubmitting}
                className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400 outline-none resize-none disabled:opacity-50"
              />

              <input
                type="time"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                disabled={isSubmitting}
                className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400 outline-none disabled:opacity-50"
              />

              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                disabled={isSubmitting}
                className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400 outline-none disabled:opacity-50"
              >
                {Object.entries(EVENT_TYPE_MAP).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>

              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-emerald-600 text-white rounded-lg px-4 py-2 hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Guardando...' : (editingEvent ? 'Actualizar' : 'Guardar evento')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!isSubmitting) {
                      setShowModal(false);
                      setActiveDate(null);
                      setEditingEvent(null);
                    }
                  }}
                  disabled={isSubmitting}
                  className="flex-1 border rounded-lg px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
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