"use client"

import { useState, useEffect, useRef } from "react";

import Link from "next/link";
import Image from "next/image";
import Squares from '../reactbits/squares';
import Particles from '../reactbits/particles';

export default function Landing2() {
  const [isFooterVisible, setFooterVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) observer.observe(footerRef.current);

    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);

  return (
    <div className="h-[532vh] bg-gradient-to-r from-[#0e0511] via-[#292d47] to-[#0e0511] overflow-hidden">
      
      <main className="flex min-h-screen flex-col relative">
  {/* Fondo de cuadrados */}
  <div className="absolute top-0 left-0 w-full h-full z-0">
  <Particles particleColors={['#ffffff', '#ffffff']} particleCount={200} particleSpread={10} speed={0.1} particleBaseSize={100}moveParticlesOnHover={true} alphaParticles={false} disableRotation={false}/>
  </div>

  {/* Contenido encima del fondo */}
  <div className="relative z-10">
    <section className="mt-10 w-[100vw] h-[70vh] flex items-center flex-col mb-[10vw]">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-5xl text-white font-bold mb-4">Welcome to Dihy Care</h1>
        <p className="text-xl text-gray-300 mb-8">Your health, our priority.</p>
        <Link href="/register">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
            Get Started
          </button>
        </Link>
      </div>
    </section>

    <section className="w-[100vw] h-[20vw] my-[10vw] flex items-start" />

    <footer
      ref={footerRef}
      className="flex flex-row items-center justify-center w-full bg-neutral-900 h-[100vh] px-[4%] py-[10%]"
    >
      <div className="m-4 w-[70%] h-[75vh] rounded-md p-10">
        <div className="text-[4.1vw] text-[#c2c1c1] leading-[0.7] flex flex-row items-center justify-center">
          The best way
          <p className="font-[300] text-[1.5rem] mx-2 mr-4 text-neutral-500 w-[6vw]">
            ――――
          </p>
          To track
        </div>
        <div className="text-[4.1vw] ml-24 text-[#c2c1c1]">Your finances</div>
        <div className="flex items-center justify-around mt-28 border border-gray-600 hover:border-gray-400 duration-300 h-[30%]">
          <p className="text-3xl">Start here</p>
          <Link href="./register">
            <button className="px-6 py-4 border border-neutral-900 bg-neutral-800 rounded-full text-xl hover:bg-neutral-700 transition-all duration-300">
              Create your account ➞
            </button>
          </Link>
        </div>
      </div>
      <div className="m-4 flex items-center justify-center w-[45%] h-[70vh] rounded-md p-10">
        <Image src={"/mbn.png"} alt="" width={500} height={500} />
      </div>
    </footer>
  </div>
</main>

    </div>
  );
}