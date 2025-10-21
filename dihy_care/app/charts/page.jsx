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


   const [open, setOpen] = useState(true);

  return (
    <main className="flex gap-6 min-h-screen bg-radial from-[#254A7F] to-[#140850] ">   
        {/*esto es el resto de la pagina*/} 
     <div className='grid items-center xl:grid-cols-3 lg:grid-cols-2 w-full gap-10 max-w-[1400px] m-10'>
    <GridItem title="Glucosa en Sangre"> <AreaChartComponent/> </GridItem>
    <GridItem title="Bar Chart"><BarChartComponent/></GridItem>
    <GridItem title="Presión"><LineChartComponent/></GridItem>
     </div>
    </main>
  );
}

function GridItem({ title, children }) {
  return (
    <div className="p-4 bg-slate-800 text-white rounded-lg shadow-md w-full h-[350px]">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <div className="h-full w-full flex items-center justify-center">
      {children}
    </div>
 </div>
  );
}