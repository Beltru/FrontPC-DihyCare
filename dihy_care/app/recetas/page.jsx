"use client";
import { useState, useEffect } from 'react';
import React from "react";
import Link from 'next/link';
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineHeart } from "react-icons/ai";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { FiMessageSquare } from "react-icons/fi";
import { FaCalendarAlt, FaWpforms } from "react-icons/fa";
import { GiForkKnifeSpoon } from "react-icons/gi";
import {MdOutlineDashboard} from "react-icons/md";
import Pasos from '../components/Pasos';
import Uptime from '../components/Uptime';
import Image from "next/image";


const Home = () => {
  const [open, setOpen] = useState(true);
  const [dataOpen, setDataOpen] = useState(false);
  const [events, setEvents] = useState([]);

  const recipes = [
    { id: 1, name: "Sandwich Caprese", kcal: "374Kcal", img: "/food.png" },
    { id: 2, name: "Granola sin azúcar", kcal: "239Kcal", img: "/food.png" },
    { id: 3, name: "Yogurt de Frutas", kcal: "198Kcal", img: "/food.png" },
    { id: 4, name: "Muffins de Lentejas", kcal: "105Kcal", img: "/food.png" },
    { id: 5, name: "Batido de plátano", kcal: "278Kcal", img: "/food.png" },
    { id: 6, name: "Pudin de Chía", kcal: "367Kcal", img: "/food.png" },
    { id: 7, name: "Ensalada de Huevo", kcal: "198Kcal", img: "/food.png" },
    { id: 8, name: "Falafel Casero", kcal: "332Kcal", img: "/food.png" },
    { id: 9, name: "Wrap Vegetariano", kcal: "478Kcal", img: "/food.png" },
    { id: 10, name: "Lasaña de Espinaca", kcal: "339Kcal", img: "/food.png" },
  ];

  return (
    <main className="flex h-screen overflow-hidden bg-[#AACBC4]">
      {/* Main Content */}
      <div className="flex-1 p-6 space-y-10 overflow-y-auto">
        {/* Sección Recipes */}
        <section>
          <h2 className="text-2xl text-black font-bold mb-4">Recipes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recipes.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="bg-gray-300 rounded-xl shadow-md overflow-hidden flex flex-col items-center"
              >
                <div className="w-full h-28 relative">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw,
                          (max-width: 1200px) 50vw,
                          25vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex justify-between w-full px-3 py-2 bg-gray-500">
                  <p className="text-sm text-black font-bold">{item.name}</p>
                  <span className="text-sm text-black">{item.kcal}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sección Sweet */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl text-black font-semibold">Sweet</h2>
            <Link href="/sweet" className="text-sm text-blue-700 hover:underline">
              See all
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {recipes.slice(1, 6).map((item) => (
              <div
                key={item.id}
                className="bg-gray-300 rounded-xl shadow-md overflow-hidden flex flex-col items-center"
              >
                <div className="w-full h-24 relative">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw,
                          (max-width: 1200px) 50vw,
                          25vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex justify-between w-full px-3 py-2 bg-gray-500">
                  <p className="text-sm text-black font-bold">{item.name}</p>
                  <span className="text-sm text-black">{item.kcal}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sección Salty */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl text-black font-semibold">Salty</h2>
            <Link href="/salty" className="text-sm text-blue-700 hover:underline">
              See all
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {recipes.slice(6, 10).map((item) => (
              <div
                key={item.id}
                className="bg-gray-300 rounded-xl shadow-md overflow-hidden flex flex-col items-center"
              >
                <div className="w-full h-24 relative">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw,
                          (max-width: 1200px) 50vw,
                          25vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex justify-between w-full px-3 py-2 bg-gray-500">
                  <p className="text-sm text-black font-bold">{item.name}</p>
                  <span className="text-sm text-black">{item.kcal}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};
export default Home;
