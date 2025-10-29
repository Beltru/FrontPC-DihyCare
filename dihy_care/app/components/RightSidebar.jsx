"use client";
import { format, isToday } from "date-fns";
import clsx from "clsx";

const RightSideBar = ({ events }) => {
  const todayEvents = events.filter((event) => isToday(event.date));

  return (
    <div className="w-[260px] ml-6 p-4 rounded-xl bg-white shadow-md">
      <h3 className="text-lg font-bold mb-4 text-black">Eventos de hoy</h3>

      {todayEvents.length === 0 ? (
        <p className="text-gray-500 text-sm">No hay eventos</p>
      ) : (
        todayEvents.map((event, idx) => (
          <div
            key={idx}
            className={clsx(
              "mb-3 p-3 rounded-lg shadow-sm text-sm font-medium text-white",
              event.color
            )}
          >
            <p className="font-semibold">{event.title}</p>
            <p className="text-xs opacity-90">
              🕓 {event.time} • {event.type}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default RightSideBar;
