"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Squares from "../reactbits/squares";
import Particles from "../reactbits/particles";
import Aurora from "../reactbits/aurora";
import GlareHover from "../reactbits/glare";
import GooeyNav from "../reactbits/gooey";
import GradientText from "../reactbits/gradientext";
import AreaChartComponentLand from "../components/AreaChartLand";
export default function Landing2() {
  const footerRef = useRef(null);

  const items = [
    { label: "Login", href: "/login" },
    { label: "Sign Up", href: "/register" },
    { label: "Contact", href: "#" },
  ];

  return (
    <div>
      
      {/* FONDO GENERAL: se mantiene solo para el main */}
      <div className="absolute max-w-screen inset-0 z-[-20] bg-gradient-to-b from-[#07df9b] via-[#07a49c] to-[#069bd6] overflow-x-hidden" />
       {/*<header>
          
           <div style={{  position: 'relative' }}>
             <GooeyNav items={items} particleCount={15} particleDistances={[90, 10]} particleR={100} initialActiveIndex={0} animationTime={600} timeVariance={300} colors={[1, 2, 3, 1, 2, 3, 1, 4]}/>
           </div>
        </header> */} 
      {/* PARTICULAS EN TODA LA PÁGINA */}
      {/* MAIN */}
      <main className="relative z-10 flex min-h-screen flex-col bg-gradient-to-b from-[#07df9b] via-[#07a49c] to-[#069bd6]">
        {/* HERO */}<div className="absolute inset-0 z-[-10] pointer-events-none">
        <Particles particleColors={["#ffffff", "#ffffff"]} particleCount={200} particleSpread={10} speed={0.3} particleBaseSize={80} moveParticlesOnHover={true} alphaParticles={false} disableRotation={true} />
      </div>
        <section className="mt-10 w-full h-[70vh] flex items-center flex-col mb-[10vw]">
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-5xl text-white font-bold mb-4">Welcome to Dihy Care</h1>
            <p className="text-xl text-gray-300 mb-8">Your health, our priority.</p>
            <div>
              <GlareHover glareColor="#ffffff" glareOpacity={0.3} glareAngle={-30} glareSize={300} transitionDuration={800}playOnce={false}>
                  <Link href="/register">
                    <button className="px-6 py-3 bg-[#066ccc] text-white rounded-lg hover:cursor-pointer">
                      Get Started
                    </button>
                  </Link>
              </GlareHover>
            </div>
          </div>
        </section>
          <section className="w-full flex items-center justify-center">
            <div className="w-[50vw] h-[20vw] flex items-center justify-center bg-slate-800 p-5 rounded-xl">
              <AreaChartComponentLand/>
            </div>
          </section>


        {/* TRANSICIÓN SUAVE ENTRE MAIN Y FOOTER */}
        <div className="w-full h-[12vh] bg-gradient-to-b from-transparent to-[#069bd6]" />
      </main>

      {/* FOOTER */}
      <footer
        ref={footerRef}
        className="relative flex flex-row items-center justify-center w-full bg-slate-900 h-[100vh] px-[4%] py-[10%] overflow-hidden"
      >
        {/* AURORA VISUAL DESDE DENTRO DEL FOOTER */}
        <div className="absolute top-0 left-0 w-full h-[40vh] z-0">
          <Aurora colorStops={["#069bd6", "#07a49c", "#07df9b"]} blend={1.2} amplitude={0.5} speed={0.8}/>
        </div>

        {/* PARTICULAS EN FOOTER */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           <Particles particleColors={["#ffffff", "#ffffff"]} particleCount={200} particleSpread={10} speed={0.3} particleBaseSize={80} moveParticlesOnHover={true} alphaParticles={false} disableRotation={true} />
        </div>

        {/* CONTENIDO */}
        <div className="relative z-10 m-4 w-[70%] h-[75vh] rounded-md p-10">
          <GradientText colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]} animationSpeed={3} showBorder={false} className="custom-class">
            <p className="text-[4.1vw] leading-[0.7] flex flex-row items-center justify-center">
                        The best way to track
                        </p>
            <p className="text-[4.1vw]">Your health</p>
          </GradientText>         
          
          <div className="flex items-center justify-around mt-28 border border-gray-600 hover:border-gray-400 duration-300 h-[30%]">
            <p className="text-3xl">Start here</p>
            <Link href="./register">
              <button className="px-6 py-4 border border-neutral-900 bg-neutral-900 rounded-full text-xl hover:bg-neutral-700 transition-all duration-300">
                Create your account ➞
              </button>
            </Link>
          </div>
        </div>
        <div className="relative z-10 m-4 flex items-center justify-center w-[45%] h-[70vh] rounded-md p-10">
          <Image src={"/CorazonClaro.png"} alt="" width={500} height={500} />
        </div>
      </footer>
    </div>
  );
}
