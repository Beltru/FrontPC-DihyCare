"use client";
import { useState } from "react";
import Link from "next/link";
import { MdOutlineDashboard } from "react-icons/md";
import { usePathname } from "next/navigation";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineHeart } from "react-icons/ai";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { FaCalendarAlt, FaWpforms } from "react-icons/fa";
import { GiForkKnifeSpoon } from "react-icons/gi";
import React from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [dataOpen, setDataOpen] = useState(false);
  const pathname = usePathname();

  // 🔹 Menús principales (sin Dashboard)
  const menus = [
    { name: "Charts", link: "/charts", icon: TbReportAnalytics },
    { name: "Calendar", link: "/calendario", icon: FaCalendarAlt },
    { name: "Nutrition", link: "/recetas", icon: GiForkKnifeSpoon },
    { name: "Exercise", link: "/ejercicio", icon: AiOutlineHeart },
    { name: "Settings", link: "/configuracion", icon: RiSettings4Line },
  ];

  return (
    <div
      className={`bg-[#0e0e0e] min-h-full rounded-r-3xl text-gray-100 px-4 ${
        open ? "w-[20vw]" : "w-[5vw]"
      } duration-500 flex flex-col`}
    >
      {/* 🔹 Header con logo y botón de menú */}
      <div className="py-4 flex items-center justify-between relative">
        <div
          className="flex items-center gap-2 cursor-pointer transition-all duration-300"
          onClick={() => setOpen(!open)}
        >
          <img src="/CorazonClaro.png" alt="Logo" className="w-9 h-8" />
          <span
            className={`text-[#5bbec3] text-lg font-semibold transition-opacity duration-300 ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            DiHy Care
          </span>
        </div>
        <HiMenuAlt3
          size={26}
          className="cursor-pointer hover:scale-110 transition-transform duration-300"
          onClick={() => setOpen(!open)}
        />
      </div>

      {/* 🔹 Dashboard separado arriba */}
      <div className="mt-2 mb-6">
        <Link
          href="/home"
          className={`group flex items-center text-sm gap-3.5 font-medium p-2 rounded-md ${
            pathname === "/"
              ? "bg-gray-700 text-[#5bbec3]"
              : "hover:bg-gray-700"
          }`}
        >
          <MdOutlineDashboard size={20} />
          {open && <span>Dashboard</span>}
        </Link>
      </div>

      {/* 🔹 Dropdown Data */}
      <div className="flex flex-col gap-4">
        <div
          onClick={() => setDataOpen(!dataOpen)}
          className="flex items-center justify-between text-sm gap-3.5 font-medium p-2 hover:bg-gray-700 rounded-md cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <FaWpforms size={20} />
            {open && <span>Data</span>}
          </div>
          {open && <span className="ml-auto">{dataOpen ? "▲" : "▼"}</span>}
        </div>

        {dataOpen && open && (
          <div className="ml-4 flex flex-col gap-1 text-sm">
            <Link
              href="/datoshipertension"
              className={`pl-4 rounded-md hover:bg-slate-800 ${
                pathname === "/datoshipertension"
                  ? "bg-slate-800 text-[#5bbec3]"
                  : ""
              }`}
            >
              ↳ Hipertensión
            </Link>
            <Link
              href="/datosdiabetes"
              className={`pl-4 rounded-md hover:bg-slate-800 ${
                pathname === "/datosdiabetes"
                  ? "bg-slate-800 text-[#5bbec3]"
                  : ""
              }`}
            >
              ↳ Diabetes
            </Link>
          </div>
        )}

        {/* 🔹 Menús restantes */}
        {menus.map((menu, i) => {
          const isActive = pathname === menu.link;
          return (
            <Link
              href={menu.link}
              key={i}
              className={`group flex items-center text-sm gap-3.5 font-medium p-2 rounded-md
                ${isActive ? "bg-gray-700 text-[#5bbec3]" : "hover:bg-gray-700"}`}
            >
              {React.createElement(menu.icon, { size: 20 })}
              {open && <span>{menu.name}</span>}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
