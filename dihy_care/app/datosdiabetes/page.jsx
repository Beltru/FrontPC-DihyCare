"use client";
import React, { useState, useMemo } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { Button } from "@nextui-org/react";

const DatosDiabetes = () => {
  const [values, setValues] = useState({
    glucosa: "",
    carbohidratos: "",
    insulina: "",
    password: "",
    peso: "",
    genero: "",
  });

  // manejador genérico para dropdowns
  const handleSelect = (field, keys) => {
    const selected = Array.from(keys)[0];
    setValues((prev) => ({ ...prev, [field]: selected }));
  };

  const [selectedKeys, setSelectedKeys] = useState({
    glucosa: new Set([]),
    carbohidratos: new Set([]),
    insulina: new Set([]),
    password: new Set([]),
    peso: new Set([]),
    genero: new Set([]),
  });

  const getSelectedValue = (field) =>
    Array.from(selectedKeys[field]).join(", ").replace(/_/g, " ");

  const handleForm = (event) => {
    event.preventDefault();
    console.log(values);
  };

  const handleReset = () => {
    setValues({
      glucosa: "",
      carbohidratos: "",
      insulina: "",
      password: "",
      peso: "",
      genero: "",
    });
    setSelectedKeys({
      glucosa: new Set([]),
      carbohidratos: new Set([]),
      insulina: new Set([]),
      password: new Set([]),
      peso: new Set([]),
      genero: new Set([]),
    });
  };

  return (
    <main className="flex gap-6 min-h-screen bg-[#AACBC4]">
      <div className="flex flex-col m-3 text-slate-900 items-center justify-center min-h-screen w-full overflow-hidden">
        <h1 className="text-2xl font-bold mb-4">Datos Diabetes</h1>

        <form onSubmit={handleForm} className="flex flex-col gap-4 max-w-md mx-auto mt-10 w-full items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">

            {/* Glucosa */}
            <Dropdown>
              <DropdownTrigger>
                <Button className="border border-black rounded-xl w-full text-left" variant="bordered">
                  {getSelectedValue("glucosa") || "Nivel de Glucosa"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Glucosa"
                selectionMode="single"
                selectedKeys={selectedKeys.glucosa}
                onSelectionChange={(keys) => {
                  setSelectedKeys((prev) => ({ ...prev, glucosa: keys }));
                  handleSelect("glucosa", keys);
                }}
                className="text-slate-200 bg-stone-950 rounded-xl p-2"
              >
                <DropdownItem key="Bajo">Bajo (70-90 mg/dL)</DropdownItem>
                <DropdownItem key="Normal">Normal (90-130 mg/dL)</DropdownItem>
                <DropdownItem key="Alto">Alto (130+ mg/dL)</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            {/* Carbohidratos */}
            <Dropdown>
              <DropdownTrigger>
                <Button className="border border-black rounded-xl w-full text-left" variant="bordered">
                  {getSelectedValue("carbohidratos") || "Carbohidratos ingeridos"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Carbohidratos"
                selectionMode="single"
                selectedKeys={selectedKeys.carbohidratos}
                onSelectionChange={(keys) => {
                  setSelectedKeys((prev) => ({ ...prev, carbohidratos: keys }));
                  handleSelect("carbohidratos", keys);
                }}
                className="text-slate-200 bg-stone-950 rounded-xl p-2"
              >
                <DropdownItem key="Bajo">Bajo (0-20g)</DropdownItem>
                <DropdownItem key="Moderado">Moderado (20-50g)</DropdownItem>
                <DropdownItem key="Alto">Alto (50+g)</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            {/* Insulina */}
            <Dropdown>
              <DropdownTrigger>
                <Button className="border border-black rounded-xl w-full text-left" variant="bordered">
                  {getSelectedValue("insulina") || "Tipo de Insulina"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Insulina"
                selectionMode="single"
                selectedKeys={selectedKeys.insulina}
                onSelectionChange={(keys) => {
                  setSelectedKeys((prev) => ({ ...prev, insulina: keys }));
                  handleSelect("insulina", keys);
                }}
                className="text-slate-200 bg-stone-950 rounded-xl p-2"
              >
                <DropdownItem key="Rápida">Rápida</DropdownItem>
                <DropdownItem key="Corta">Corta</DropdownItem>
                <DropdownItem key="Intermedia">Intermedia</DropdownItem>
                <DropdownItem key="Larga">Larga</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            {/* Password */}
            <Dropdown>
              <DropdownTrigger>
                <Button className="border border-black rounded-xl w-full text-left" variant="bordered">
                  {getSelectedValue("password") || "Frecuencia de inyecciones"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Password"
                selectionMode="single"
                selectedKeys={selectedKeys.password}
                onSelectionChange={(keys) => {
                  setSelectedKeys((prev) => ({ ...prev, password: keys }));
                  handleSelect("password", keys);
                }}
                className="text-slate-200 bg-stone-950 rounded-xl p-2"
              >
                <DropdownItem key="1 diaria">1 diaria</DropdownItem>
                <DropdownItem key="2 diarias">2 diarias</DropdownItem>
                <DropdownItem key="Más de 2">Más de 2</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            {/* Peso */}
            <Dropdown>
              <DropdownTrigger>
                <Button className="border border-black rounded-xl w-full text-left" variant="bordered">
                  {getSelectedValue("peso") || "Rango de Peso"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Peso"
                selectionMode="single"
                selectedKeys={selectedKeys.peso}
                onSelectionChange={(keys) => {
                  setSelectedKeys((prev) => ({ ...prev, peso: keys }));
                  handleSelect("peso", keys);
                }}
                className="text-slate-200 bg-stone-950 rounded-xl p-2"
              >
                <DropdownItem key="Menos de 60kg">Menos de 60kg</DropdownItem>
                <DropdownItem key="60-80kg">60-80kg</DropdownItem>
                <DropdownItem key="Más de 80kg">Más de 80kg</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            {/* Género */}
            <Dropdown>
              <DropdownTrigger>
                <Button className="border border-black rounded-xl w-full text-left" variant="bordered">
                  {getSelectedValue("genero") || "Género"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Género"
                selectionMode="single"
                selectedKeys={selectedKeys.genero}
                onSelectionChange={(keys) => {
                  setSelectedKeys((prev) => ({ ...prev, genero: keys }));
                  handleSelect("genero", keys);
                }}
                className="text-slate-200 bg-stone-950 rounded-xl p-2"
              >
                <DropdownItem key="Masculino">Masculino</DropdownItem>
                <DropdownItem key="Femenino">Femenino</DropdownItem>
                <DropdownItem key="Otro">Otro</DropdownItem>
              </DropdownMenu>
            </Dropdown>

          </div>

          {/* Botones */}
          <div className="flex gap-4 mt-6 justify-center w-full">
            <button
              type="submit"
              className="bg-[#3b8494] text-black px-6 py-2 rounded-full font-bold hover:cursor-pointer"
            >
              Guardar
            </button>
            <button
              type="button"
              className="bg-[#3b8494] text-black px-6 py-2 rounded-full font-bold hover:cursor-pointer"
              onClick={handleReset}
            >
              Limpiar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default DatosDiabetes;
