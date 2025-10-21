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
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@heroui/dropdown";
import Link from 'next/link';   
import { Button } from "@nextui-org/react";

  const DatosDiabetes = () => {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
    [selectedKeys],
  );

  const [values, setValues] = useState({
    glucosa: '',
    carbohidratos: '',
    insulina: '',
    password: '',
    peso: '',
    genero: '',
    reference: '',
  });

  // ...

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

  
 const [open, setOpen] = useState(true);
return(
  
      <main className="flex gap-6 min-h-screen bg-[#AACBC4]">
        {/*esto es el resto de la pagina*/} 
      <div className='flex flex-col m-3 text-slate-900 items-center justify-center min-h-screen w-full overflow-hidden'>
        <h1 className="text-2xl font-bold mb-4">Datos Diabetes</h1>
        <form onSubmit={handleForm} className="flex flex-col gap-4 max-w-md mx-auto mt-10 w-full items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
           <input
  type="text"
  name="glucosa"
  value={values.glucosa}
  placeholder="Glucosa"
  onChange={handleInputChange}
  className="px-4 py-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#339a89]"

/>

<input
  type="text"
  name="carbohidratos"
  value={values.carbohidratos}
  placeholder="Carbohidratos"
  onChange={handleInputChange}
  className="px-4 py-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#339a89]"

/>
   
<Dropdown className='rounded-xl'>
  <DropdownTrigger>
    <Button className='border border-black rounded-xl w-full text-left' color="primary" variant="bordered">
        {selectedValue !== "text" && selectedValue !== "" ? selectedValue : "Insulina"}
    </Button>
  </DropdownTrigger>

  <DropdownMenu
    disallowEmptySelection
    aria-label="Single selection example"
    selectedKeys={selectedKeys}
    selectionMode="single"
    onSelectionChange={(keys) => {
      setSelectedKeys(keys);

      // ✅ Actualizar también el campo insulina
      const selected = Array.from(keys)[0];
      setValues((prev) => ({
        ...prev,
        insulina: selected,
      }));
    }}
    className='text-slate-200 bg-stone-950 rounded-xl p-2'
    color="primary"
  >
                <DropdownItem className='text-slate-200 hover:bg-gray-800 rounded-md' key="Rapid Acting">Rapid Acting</DropdownItem>
                <DropdownItem className='text-slate-200 hover:bg-gray-800 rounded-md' key="Short Acting">Short Acting</DropdownItem>
                <DropdownItem className='text-slate-200 hover:bg-gray-800 rounded-md' key="Intermediate Acting">Intermediate Acting</DropdownItem>
                <DropdownItem className='text-slate-200 hover:bg-gray-800 rounded-md' key="Long Acting">Long Acting</DropdownItem>
              </DropdownMenu>
            </Dropdown>



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
    glucosa: '',
    carbohidratos: '',
    insulina: '',
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
export default DatosDiabetes;
