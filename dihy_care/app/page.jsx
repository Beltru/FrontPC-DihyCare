"use client";
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Image from "next/image";
import React from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { FaCalendarAlt } from "react-icons/fa";

import Link from 'next/link';


const Home = () =>{
 const menus = [
  {name:"Dashboard", link:"/", icon: MdOutlineDashboard},
  {name:"Datos", link:"/datos", icon: AiOutlineUser},
  {name:"Messages", link:"/", icon: FiMessageSquare},
  {name:"Graficos", link:"/charts", icon: TbReportAnalytics, margin: true},
  {name:"Agenda", link:"/calendario", icon: FaCalendarAlt},
  {name:"Alimentacion", link:"/", icon: FiShoppingCart},
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
        <div className='m-3 text-xl text-gray-900 font-semibold'>
          REACT TAILWIND
        </div>
       </main>

  );
}
export default Home;
