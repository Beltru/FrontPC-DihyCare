"use client";
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Image from "next/image";
import chart from "recharts";

const AreaChart = dynamic(() => import('./components/AreaChart'), { ssr: false });
export default function Home() {
  return (
    <div className="bg-radial from-[#254A7F] to-[#140850] grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
     <div className='grid xl:grid-cols-3 lg:grid-cols-2 w-full gap-10 max-w-[1400px]f'>
    
    <div title="Area Chart"></div>
    <div title="Bar Chart"></div>
    <div title="Line Chart"></div>

     </div>
     


     
     <AreaChart/>
    </div>
  );
}
