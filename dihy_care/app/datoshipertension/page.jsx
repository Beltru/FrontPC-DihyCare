"use client";
import { useState, useEffect } from 'react'
import React from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { FaCalendarAlt } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa";
import { GiForkKnifeSpoon } from "react-icons/gi";

import Link from 'next/link';   

const DatosHipertension = () => {
  const [values, setValues] = useState({
  presionarterial: '',
  frecuanciacardiaca: '',
  ejerciciorealizado: '',
  password: '',
  peso: '',
  genero: '',
  reference: '',
});

const handleInputChange = (event)=> {
  const{name, value} = event.target;
  setValues({
    ...values,
    [name]:value,
  })
};

const handleForm = (event) => {
  event.preventDefault()
  console.log(values)
};

     const menus = [

  {name:"Home", link:"/", icon: MdOutlineDashboard},
  {name:"Charts", link:"/charts", icon: TbReportAnalytics, margin: true},
  {name:"Diabetes Data", link:"/datosdiabetes", icon: FaWpforms},
  {name:"Agenda", link:"/calendario", icon: FaCalendarAlt},
  {name:"Nutrition", link:"/recetas", icon: GiForkKnifeSpoon},
  {name:"Exercise", link:"/ejercicio", icon: AiOutlineHeart, margin: true},
  {name:"Settings", link:"/configuracion", icon: RiSettings4Line},

 ];
 const [open, setOpen] = useState(true);
return(
  
      <main className="flex gap-6 min-h-screen bg-[#AACBC4]">
        {/*esto es el resto de la pagina*/} 
      <div className='flex flex-col m-3 text-slate-900 items-center justify-center min-h-screen w-full overflow-hidden'>
        <h1 className="text-2xl font-bold mb-4">Datos Hipertensión</h1>
        <form onSubmit={handleForm} className="flex flex-col gap-4 max-w-md mx-auto mt-10 w-full items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <input
        type="text"
        name="presionarterial"
        value={values.name}
        placeholder="Presion arterial"
        onChange={handleInputChange}
        className="px-4 py-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#339a89]"
            />

            <input
        type="text"
        name="frecuanciacardiaca"
        value={values.lastName}
        placeholder="Frecuenacia cardiaca"
        onChange={handleInputChange}
        className="px-4 py-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#339a89]"
            />

            <input
        type="text"
        name="ejerciciorealizado"
        value={values.email}
        placeholder="Ejerciocio realizado"
        onChange={handleInputChange}
        className="px-4 py-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#339a89]"
            />

            <input
        type="password"
        name="password"
        value={values.password}
        placeholder=""
        onChange={handleInputChange}
        className="px-4 py-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#339a89]"
            />

            <input
        type="number"
        name="peso"
        value={values.peso}
        placeholder=""
        onChange={handleInputChange}
        className="px-4 py-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#339a89]"
            />

            <input
        type="text"
        name="genero"
        value={values.genero}
        placeholder=""
        onChange={handleInputChange}
        className="px-4 py-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#339a89]"
            />
          </div>
          {/* Botones */}
          <div className="flex gap-4 mt-4 justify-center w-full">
            <button
        type="submit"
        className="bg-[#3b8494] text-black px-6 py-2 rounded-full font-bold hover:cursor-pointer"
            >
        Guardar
            </button>
            <button
        type="button" 
        className="bg-[#3b8494] text-black px-6 py-2 rounded-full font-bold hover:cursor-pointer"
        onClick={() =>
          setValues({
            name: '',
            lastName: '',
            email: '',
            password: '',
            peso: '',
            genero: '',
            reference: '',
          })
        }
            >
        Limpiar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
export default DatosHipertension;
