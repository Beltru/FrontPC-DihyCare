"use client";
import { useState } from 'react';
import React from "react";
import Link from 'next/link';
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineHeart } from "react-icons/ai";
import { TbReportAnalytics } from "react-icons/tb";
import { FiMessageSquare } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import { FaCalendarAlt, FaWpforms } from "react-icons/fa";
import { GiForkKnifeSpoon } from "react-icons/gi";

const Configuracion = () => {
  const [open, setOpen] = useState(true);
  const [dataOpen, setDataOpen] = useState(false);
  const [events, setEvents] = useState([]);

  const menus = [
    { name:"Home", link:"/", icon: MdOutlineDashboard},
    { name: "Charts", link: "/charts", icon: TbReportAnalytics, margin: true },
    { name: "Calendar", link: "/calendario", icon: FaCalendarAlt },
    { name: "Nutrition", link: "/recetas", icon: GiForkKnifeSpoon },
    { name: "Exercise", link: "/ejercicio", icon: AiOutlineHeart, margin: true },
  ];

  return (
    <main className="flex h-screen overflow-hidden bg-[#AACBC4]">
      {/* Main Content */}
      <div className="flex flex-grow overflow-hidden ml-6 p-2 w-[50vw]">
        
      </div>

    </main>
  );
};

export default Configuracion;
