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
  const menus = [
    {name:"Home", link:"/", icon: MdOutlineDashboard},
    {name:"Datos Diabetes", link:"/datosdiabetes", icon: FaWpforms},
    {name:"Datos Hipertension", link:"/datoshipertension", icon: FaWpforms},
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
          <div className='mt-4 flex flex-col gap-4 relative'>
            {
              menus?.map((menu,i)=>(
                <Link href={menu?.link} key={i} className={`${menu?.margin && "mt-5"} group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-700 rounded-md`}>
       
            <div>
              {React.createElement(menu?.icon,{size:"20"})}
            </div>
          
             <h2 style={{transitionDelay: `${i + 3}00ms`,}} className={`whitespace-pre duration-500 ${!open && "opacity-0 -translate-x-28 overflow-hidden"}`}>{menu?.name}
             </h2>
             <h2 className={`${open && "hidden"} absolute left-48 bg-white font-semibold  whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}>
              {menu?.name}
             </h2>
            </Link> 
              ))        
}

          </div>
        </div>
        
        {/*esto es el resto de la pagina*/} 
     <div className='grid items-center xl:grid-cols-3 lg:grid-cols-2 w-full gap-10 max-w-[1400px] m-10'>
    
    <GridItem title="Line Chart"> <PieChartComponent/> </GridItem>
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