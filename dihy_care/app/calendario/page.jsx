"use client";
import { useState, useEffect } from 'react'
import Image from "next/image";
import React from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import {  AiOutlineHeart } from "react-icons/ai";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { FiMessageSquare } from "react-icons/fi";
import { FaWpforms } from "react-icons/fa";
import { GiForkKnifeSpoon } from "react-icons/gi";
import EventCalendar from '../components/Calendario';
import {addDays, subDays, format} from "date-fns"

import Link from 'next/link';
import {ScheduleXCalendar, usCalendarApp} from "@schedule-x/react";

const Calendario = () =>{
const [dataOpen, setDataOpen] = useState(false);

 const menus = [
  {name:"Home", link:"/", icon: MdOutlineDashboard},
  {name:"Messages", link:"/", icon: FiMessageSquare},
  {name:"Graficos", link:"/charts", icon: TbReportAnalytics, margin: true},
  {name:"Alimentacion", link:"/", icon: GiForkKnifeSpoon},
  {name:"Ejercicio", link:"/", icon: AiOutlineHeart, margin: true},
  {name:"Configuracion", link:"/", icon: RiSettings4Line},

 ];
 const [open, setOpen] = useState(true);
return(
  
      <main className="flex gap-6 min-h-screen bg-[#d9d9d9]">
     
     {/* Esto es la sidebar*/} 
        <div className={`bg-[#0e0e0e] min-h-screen rounded-r-3xl text-gray-100 px-4 ${open? 'w-[20vw]': "w-[5vw]"} duration-500 `}>
          <div className='py-3 flex justify-end'>
            <HiMenuAlt3 size={26} className="cursor-pointer"onClick={()=>setOpen(!open)}/>
          </div>
                <div className='flex flex-col mt-4 gap-4 relative'>
          {/* Dropdown Data */}
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

          {/* Otros menús */}
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

       {/*esto es el resto de la pagina*/} 
        <div className='flex flex-1 justify-center items-start text-slate-900 font-bold'>
            <EventCalendar 
            events={[
              {date:subDays(new Date(), 6), title: "Post Video"},
              {date:subDays(new Date(), 1), title: "Edit Video"},
              {date:subDays(new Date(), 3), title: "Code"},
            ]}/>
        </div>
       </main>

  );
}
export default Calendario;
