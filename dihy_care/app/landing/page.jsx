import Link from "next/link"
import Navbar from "../components/Navbar"
import GradientText from "../reactbits/gradientext";
import React from "react";
import AreaChartComponentLand from "../components/AreaChartLand";

const Landing = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Navbar />
      <div className="bg-gray-200 flex flex-col">

        {/* HERO */}
        <section className="flex flex-row h-[100vh] w-[100vw]">

          {/* LEFT TEXT */}
          <div className="h-full w-[50%] flex flex-col justify-center items-start ml-20">
            <h1 className="text-black text-5xl font-medium ">
              Monitor your health with
            </h1>

            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={3}
              showBorder={false}
            >
              <h1 className="text-5xl font-medium">DiHy Care</h1>
            </GradientText>

            <p className="text-black text-xl mt-5 max-w-[80%]">
              Advanced diabetes and hypertension management platform with 
              real-time monitoring, comprehensive data analytics, and 
              personalized health insights.
            </p>
          </div>

          {/* RIGHT CHART */}
          <div className="h-full w-[50%] p-10 flex items-center justify-center">
            <GridItem title="Health Data Overview">
              <AreaChartComponentLand />
            </GridItem>
          </div>
        </section>

        {/* NEXT SECTION */}
        <section className="h-[100vh] w-[100vw]">
        </section>
      </div>
    </main>
  );
};

function GridItem({ title, children }) {
  return (
    <div className="p-6 bg-sky-950 text-white rounded-xl shadow-lg w-full h-[80%] flex flex-col">
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
      <div className="flex-1 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

export default Landing;
