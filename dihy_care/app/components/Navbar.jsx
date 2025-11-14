"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* ========== LOGO ========== */}
        <Link
          href="/landing"
          className="flex flex-row items-center gap-2 font-semibold text-gray-900 text-xl"
        >
          <img src="/nav.png" width={40} height={40} alt="logo" />
          <span>DiHy Care</span>
        </Link>

        {/* ========== LINKS DESKTOP ========== */}
        

        {/* ========== BOTONES DERECHA ========== */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-cyan-600 font-medium"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#07df9b] to-teal-600  text-white font-semibold shadow hover:opacity-90 transition"
          >
            Sign Up
          </Link>
        </div>

        {/* ========== BOTON MOBILE ========== */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* ========== MENU MOBILE ========== */}
      {open && (
        <div className="md:hidden bg-white shadow-md px-6 pb-6 flex flex-col gap-4 text-lg text-gray-600">

          <Link href="/" className="hover:text-gray-900 transition">Home</Link>
          <Link href="/features" className="hover:text-gray-900 transition">Features</Link>
          <Link href="/about" className="hover:text-gray-900 transition">About</Link>
          <Link href="/contact" className="hover:text-gray-900 transition">Contact</Link>

          {/* Botones mobile */}
          <hr className="my-2" />
          <Link
            href="/login"
            className="text-blue-600 hover:text-blue-700 transition font-medium"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="w-full text-center px-5 py-2 rounded-lg bg-gradient-to-r from-teal-400 to-green-500 text-white font-semibold shadow hover:opacity-90 transition"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}
