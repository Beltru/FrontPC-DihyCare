"use client";
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Image from "next/image";
import PieChartComponent from '../components/PieChart';
import BarChartComponent from '../components/BarChart';
import AreaChartComponent from '../components/AreaChart';
import LineChartComponent from '../components/LineChart';
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { RiSettings4Line } from "react-icons/ri";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { FaCalendarAlt } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa";
import { GiForkKnifeSpoon } from "react-icons/gi";

import Link from 'next/link';
import React from "react";


export default function Charts () {
const [dataOpen, setDataOpen] = useState(false);

  const menus = [
    {name:"Home", link:"/", icon: MdOutlineDashboard},
    {name:"Messages", link:"/", icon: FiMessageSquare},
    {name:"Agenda", link:"/calendario", icon: FaCalendarAlt},
    {name:"Alimentacion", link:"/", icon: GiForkKnifeSpoon},
    {name:"Ejercicio", link:"/", icon: AiOutlineHeart, margin: true},
    {name:"Configuracion", link:"/", icon: RiSettings4Line},
  
   ];
   const [open, setOpen] = useState(true);

  return (
    <main className="flex gap-6 min-h-screen bg-radial from-[#254A7F] to-[#140850] ">
  
    {/* Esto es la sidebar*/} 
        <div className={`bg-[#0e0e0e] min-h-screen rounded-r-3xl text-gray-100 px-4 ${open? 'w-[27vw]': "w-[5vw]"} duration-500 `}>
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
     <div className='grid items-center xl:grid-cols-3 lg:grid-cols-2 w-full gap-10 max-w-[1400px] m-10'>
    
    <GridItem title="Area Chart"> <AreaChartComponent/> </GridItem>
    <GridItem title="Bar Chart"><BarChartComponent/></GridItem>
    <GridItem title="Line Chart"><LineChartComponent/></GridItem>

     </div>
    </main>
  );
}

function GridItem({ title, children }) {
  return (
    <div className="p-4 bg-slate-800 text-white rounded-lg shadow-md  h-[350px]">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <div className="h-full w-full flex items-center justify-center">
      {children}
    </div>
 </div>
  );
}