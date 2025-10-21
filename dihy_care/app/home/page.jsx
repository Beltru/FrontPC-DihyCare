"use client";
import { useState } from 'react';
import React from "react";
import Link from 'next/link';
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineHeart } from "react-icons/ai";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { FiMessageSquare } from "react-icons/fi";
import { FaCalendarAlt, FaWpforms } from "react-icons/fa";
import { GiForkKnifeSpoon } from "react-icons/gi";
import AreaChartComponent from '../components/AreaChart';
import LineChartComponent from '../components/LineChart';
import BarChartComponent from '../components/BarChart';
import MiniCalendar from '../components/MiniCalendario';

import RightSideBar from '../components/RightSidebar';
import { subDays } from 'date-fns';

const Home = () => {
  const [open, setOpen] = useState(true);
  const [dataOpen, setDataOpen] = useState(false);
  const [events, setEvents] = useState([]);

 

  return (
    <main className="flex h-screen overflow-hidden bg-[#d9d9d9]">
     
      {/* Main Content */}
      <div className="flex flex-grow overflow-hidden ml-6 p-2 w-[50vw]">
        {/* LEFT CONTENT */}
        <div className="flex flex-col flex-1 gap-6 overflow-hidden">
          <h1 className="text-3xl text-black font-bold">Welcome!</h1>

          {/* Main Graph */}
        <div className='flex flex-wrap gap-4 justify-center items-center w-[90%]'>
          <div className="bg-[#5bbec3] rounded-xl flex items-center justify-center h-[40vh] w-full">
            <div className="w-full h-full px-2 py-2">
              <AreaChartComponent />
            </div>
          </div>

         <div className="bg-[#5bbec3] rounded-xl flex items-center justify-center h-[40vh] w-full">
            <div className="w-full h-full px-2 py-2">
              <LineChartComponent />
            </div>
          </div>
      </div>
        </div>
        {/* RIGHT CONTENT: AGENDA */}
        <div className="flex flex-col bg-gradient-to-b bg-[#AACBC4] rounded-xl p-4 w-[55%] overflow-y-auto gap-0">
          <MiniCalendar/>
        </div>

      </div>
    </main>
  );
};

export default Home;
