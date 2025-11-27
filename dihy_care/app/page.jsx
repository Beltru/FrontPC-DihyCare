"use client";
import Link from "next/link";
import Navbar from "./components/Navbar";
import GradientText from "./reactbits/gradientext";
import React from "react";
import AreaChartComponentLand from "./components/AreaChartLand";

const Landing = () => {
  return (
    <main className="bg-white flex flex-col items-center justify-center">
      <Navbar />

      {/* ========================= HERO ========================= */}
      <section className="w-full bg-white py-24 flex flex-col lg:flex-row items-center justify-between px-10 lg:px-32">
        
        {/* LEFT TEXT */}
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-5xl lg:text-6xl font-semibold text-gray-900 leading-tight">
            Monitor Your Health with
          </h1>

          <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={3}
            showBorder={false}
          >
            <h1 className="text-5xl lg:text-6xl font-semibold">DiHy Care</h1>
          </GradientText>

          <p className="text-gray-700 text-lg lg:text-xl max-w-xl">
            Advanced diabetes and hypertension management platform with
            real-time monitoring, data analytics, and personalized insights.
          </p>

          <div className="flex gap-4 mt-4">
            <Link
              href="register"
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Start Free
            </Link>

            <Link
              href="login"
              className="px-6 py-3 rounded-xl border border-gray-300 text-blue-600 font-semibold hover:bg-gray-100 transition"
            >
              Login
            </Link>
          </div>
        </div>

        {/* RIGHT CHART */}
        <div className="flex-1 mt-12 lg:mt-0 w-full flex justify-center">
          <div className="bg-slate-800 shadow-xl border border-gray-200 rounded-2xl p-6 w-[420px]">
            <h2 className="text-gray-200 font-semibold mb-4">
              Health Data Overview
            </h2>
            <AreaChartComponentLand />
          </div>
        </div>
      </section>

      {/* ========================= FEATURES ========================= */}
      <section className="w-full bg-gray-50 py-24 px-8 lg:px-32 text-center">
        <h2 className="text-3xl font-semibold text-gray-900">
          Powerful Health Management Features
        </h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Developed from medical experience, designed for diabetes and hypertension.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
          <FeatureItem
            title="Real-time Analytics"
            description="Monitor glucose, blood pressure, and trends instantly."
            icon="📊"
          />
          <FeatureItem
            title="Easy Upload"
            description="Store lab reports, prescriptions, and medical documents."
            icon="📁"
          />
          <FeatureItem
            title="Smart Alerts"
            description="Receive critical notifications instantly."
            icon="🔔"
          />
        </div>
      </section>

      {/* ========================= METRICS ========================= */}
      <section className="w-full bg-gradient-to-r from-[#12ed8b] to-[#4079ff] text-white py-24 px-8 lg:px-32">
        <div className="grid grid-cols-1 md:grid-cols-4 text-center gap-12">
          <Metric number="50K+" label="Active Users" />
          <Metric number="2M+" label="Records Uploaded" />
          <Metric number="98%" label="Accuracy" />
          <Metric number="24/7" label="Monitoring" />
        </div>
      </section>

      {/* ========================= HEALTHCARE PRO SECTION ========================= */}
      <section className="w-full bg-white py-24 px-8 lg:px-32 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1">
          <h2 className="text-3xl font-semibold text-gray-900">
            Designed for Healthcare Professionals
          </h2>
          <p className="text-gray-600 mt-4 max-w-lg">
            Provide better patient care through advanced monitoring tools,
            medical-grade analytics, and centralized history tracking.
          </p>

          <ul className="mt-6 space-y-3 text-gray-700">
            <li>• Patient dashboards</li>
            <li>• Automatic report generation</li>
            <li>• Early detection alerts</li>
          </ul>
        </div>

        <div className="flex-1 flex justify-center">
          <img
            src="/doctor.png"
            className="rounded-xl shadow-xl w-[420px]"
            alt="Doctor"
          />
        </div>
      </section>

      {/* ========================= CTA ========================= */}
      <section className="w-full bg-gray-50 py-24 text-center px-8 lg:px-32">
        <h2 className="text-3xl font-semibold text-gray-900">
          Ready to Transform Your Health Management?
        </h2>

        <p className="text-gray-600 mt-2">
          Start improving your health today with DiHy Care.
        </p>

        <Link
          href="register"
          className="mt-8 inline-block px-8 py-4 bg-gradient-to-r from-[#07df9b] to-teal-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Start Free
        </Link>
      </section>

      {/* ========================= FOOTER ========================= */}
      <footer className="w-full bg-gray-900 text-gray-300 py-12 px-8 lg:px-32">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <FooterSection title="DiHy Care">
            <p>Advanced health monitoring for chronic conditions.</p>
          </FooterSection>

          <FooterSection title="Product">
            <p>Features</p>
            <p>Analytics</p>
            <p>Monitoring</p>
          </FooterSection>

          <FooterSection title="Company">
            <p>About</p>
            <p>Blog</p>
            <p>Careers</p>
          </FooterSection>

          <FooterSection title="Support">
            <p>Help Center</p>
            <p>Contact</p>
            <p>Terms</p>
          </FooterSection>
        </div>

        <p className="text-center text-gray-500 mt-10 text-sm">
          © 2025 DiHy Care — All Rights Reserved.
        </p>
      </footer>
    </main>
  );
};

function FeatureItem({ title, description, icon }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-8 border hover:shadow-lg transition">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  );
}

function Metric({ number, label }) {
  return (
    <div>
      <h3 className="text-4xl font-bold">{number}</h3>
      <p className="text-gray-200 mt-1">{label}</p>
    </div>
  );
}

function FooterSection({ title, children }) {
  return (
    <div>
      <h4 className="text-white font-semibold mb-3">{title}</h4>
      <div className="space-y-2 text-gray-400">{children}</div>
    </div>
  );
}

export default Landing;
