"use client";
import React, { useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { Button } from "@nextui-org/react";
import Link from "next/link";


const DatosHipertension = () => {
  const [values, setValues] = useState({
    presionarterial: "",
    frecuenciacardiaca: "",
    ejerciciorealizado: "",
    medicacion: "",
    peso: "",
    genero: "",
  });

  const [selectedKeys, setSelectedKeys] = useState({
    presionarterial: new Set([]),
    frecuenciacardiaca: new Set([]),
    ejerciciorealizado: new Set([]),
    medicacion: new Set([]),
    peso: new Set([]),
    genero: new Set([]),
  });

  const handleSelect = (field, keys) => {
    const selected = Array.from(keys)[0];
    setValues((prev) => ({ ...prev, [field]: selected }));
  };

  const getSelectedValue = (field) =>
    Array.from(selectedKeys[field]).join(", ").replace(/_/g, " ");

  const handleForm = (e) => {
    e.preventDefault();
    console.log(values);
  };

  const handleReset = () => {
    setValues({
      presionarterial: "",
      frecuenciacardiaca: "",
      ejerciciorealizado: "",
      medicacion: "",
      peso: "",
      genero: "",
    });
    setSelectedKeys({
      presionarterial: new Set([]),
      frecuenciacardiaca: new Set([]),
      ejerciciorealizado: new Set([]),
      medicacion: new Set([]),
      peso: new Set([]),
      genero: new Set([]),
    });
  };

  return (
    <main className="flex gap-6 min-h-screen bg-[#AACBC4]">
      <div className="flex flex-col m-3 text-slate-900 items-center justify-center min-h-screen w-full overflow-hidden">
        <h1 className="text-2xl font-bold mb-4">Datos Hipertensión</h1>

        <form
          onSubmit={handleForm}
          className="flex flex-col gap-4 max-w-md mx-auto mt-10 w-full items-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">

            {/* Presión Arterial */}
            <Dropdown>
              <DropdownTrigger>
                <Button className="border border-black rounded-xl w-full text-left" variant="bordered">
                  {getSelectedValue("presionarterial") || "Presión arterial"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Presión Arterial"
                selectionMode="single"
                selectedKeys={selectedKeys.presionarterial}
                onSelectionChange={(keys) => {
                  setSelectedKeys((prev) => ({ ...prev, presionarterial: keys }));
                  handleSelect("presionarterial", keys);
                }}
                className="text-slate-200 bg-stone-950 rounded-xl p-2"
              >
                <DropdownItem key="Normal (120/80)">Normal (120/80)</DropdownItem>
                <DropdownItem key="Elevada (130/85)">Elevada (130/85)</DropdownItem>
                <DropdownItem key="Alta (140/90+)">Alta (140/90+)</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            {/* Frecuencia Cardíaca */}
            <Dropdown>
              <DropdownTrigger>
                <Button className="border border-black rounded-xl w-full text-left" variant="bordered">
                  {getSelectedValue("frecuenciacardiaca") || "Frecuencia cardíaca"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Frecuencia Cardíaca"
                selectionMode="single"
                selectedKeys={selectedKeys.frecuenciacardiaca}
                onSelectionChange={(keys) => {
                  setSelectedKeys((prev) => ({ ...prev, frecuenciacardiaca: keys }));
                  handleSelect("frecuenciacardiaca", keys);
                }}
                className="text-slate-200 bg-stone-950 rounded-xl p-2"
              >
                <DropdownItem key="Baja (60 bpm o menos)">Baja (≤60 bpm)</DropdownItem>
                <DropdownItem key="Normal (60-90 bpm)">Normal (60–90 bpm)</DropdownItem>
                <DropdownItem key="Alta (90+ bpm)">Alta (90+ bpm)</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            {/* Ejercicio Realizado */}
            <Dropdown>
              <DropdownTrigger>
                <Button className="border border-black rounded-xl w-full text-left" variant="bordered">
                  {getSelectedValue("ejerciciorealizado") || "Ejercicio realizado"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Ejercicio Realizado"
                selectionMode="single"
                selectedKeys={selectedKeys.ejerciciorealizado}
                onSelectionChange={(keys) => {
                  setSelectedKeys((prev) => ({ ...prev, ejerciciorealizado: keys }));
                  handleSelect("ejerciciorealizado", keys);
                }}
                className="text-slate-200 bg-stone-950 rounded-xl p-2"
              >
                <DropdownItem key="Sedentario">Sedentario</DropdownItem>
                <DropdownItem key="Ligero (1-2 días)">Ligero (1–2 días/sem)</DropdownItem>
                <DropdownItem key="Moderado (3-4 días)">Moderado (3–4 días/sem)</DropdownItem>
                <DropdownItem key="Intenso (5+ días)">Intenso (5+ días/sem)</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            {/* Medicación */}
            <Dropdown>
              <DropdownTrigger>
                <Button className="border border-black rounded-xl w-full text-left" variant="bordered">
                  {getSelectedValue("medicacion") || "Medicación antihipertensiva"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Medicación"
                selectionMode="single"
                selectedKeys={selectedKeys.medicacion}
                onSelectionChange={(keys) => {
                  setSelectedKeys((prev) => ({ ...prev, medicacion: keys }));
                  handleSelect("medicacion", keys);
                }}
                className="text-slate-200 bg-stone-950 rounded-xl p-2"
              >
                <DropdownItem key="IECA">IECA (ej. Enalapril)</DropdownItem>
                <DropdownItem key="ARA II">ARA II (ej. Losartán)</DropdownItem>
                <DropdownItem key="Betabloqueante">Betabloqueante</DropdownItem>
                <DropdownItem key="Diurético">Diurético</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            {/* Peso */}
            <Dropdown>
              <DropdownTrigger>
                <Button className="border border-black rounded-xl w-full text-left" variant="bordered">
                  {getSelectedValue("peso") || "Rango de peso"}
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
                <DropdownItem key="<60kg">Menos de 60kg</DropdownItem>
                <DropdownItem key="60-80kg">60–80kg</DropdownItem>
                <DropdownItem key=">80kg">Más de 80kg</DropdownItem>
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

export default DatosHipertension;
