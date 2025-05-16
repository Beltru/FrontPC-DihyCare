"use client";
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Image from "next/image";
import chart from "recharts";
import React from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import Link from 'next/link';
const Home = () =>{
 const menus = [
  {name:"dashboard", link:"/", icon: MdOutlineDashboard},
  {name:"dashboard", link:"/", icon: MdOutlineDashboard},
  {name:"dashboard", link:"/", icon: MdOutlineDashboard},
  {name:"dashboard", link:"/", icon: MdOutlineDashboard},
  {name:"dashboard", link:"/", icon: MdOutlineDashboard}



 ]
return(
  
      <main className="flex gap-6 min-h-screen bg-[#d9d9d9]">
     
     {/* Esto es la sidebar*/} 
        <div className='bg-[#0e0e0e] min-h-screen w-[20vw] rounded-r-3xl text-gray-100 px-4'>
          <div className='py-3 flex justify-end'>
            <HiMenuAlt3 size={26} className="cursor-pointer"/>
          </div>
          <div className='mt-4 flex flex-col gap-4 relative'>
            <Link href="/Dashboard">
            <div>
              {React.createElement(HiMenuAlt3,{size:"20"})}
            </div>
             <h2>Datos</h2>
            </Link>
             <Link href="/charts">
             <h2>Graficos</h2>
            </Link>
             <Link href="/Dashboard">
             <h2>Agenda</h2>
            </Link>
             <Link href="/Dashboard">
             <h2>Ejercicio</h2>
             </Link>
              <Link href="/Dashboard">
             <h2>Alimentacion</h2>
            </Link>
          </div>
        </div>

       {/*esto es elresto de la pagina*/} 
        <div className='m-3 text-xl text-gray-900 font-semibold'>
          REACT TAILWIND
        </div>
       </main>

  );
}
export default Home;
