"use client";
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Image from "next/image";
import chart from "recharts";
import BarChartComponent from './components/BarChart';
import AreaChartComponent from './components/AreaChart';
import LineChartComponent from './components/LineChart';
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 md:px-8 xl:px-10 py-44 bg-radial from-[#254A7F] to-[#140850] ">
     <div className='grid xl:grid-cols-3 lg:grid-cols-2 w-full gap-10 max-w-[1400px]f'>
    
    <GridItem title="AreaChart"> <AreaChartComponent/> </GridItem>
    <GridItem title="Bar Chart"><BarChartComponent/></GridItem>
    <GridItem title="Line Chart"><LineChartComponent/></GridItem>

     </div>
    </main>
  );
}

function GridItem({ title, children }) {
  return (
    <div className="p-4 bg-slate-800 rounded-lg shadow-md  h-[300px]">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      {children}
    </div>
  );
}