"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // ADD THIS!
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { Button } from "@nextui-org/react";

const BACKEND_URL = 'https://dihycare-backend.vercel.app';

const DatosHipertension = () => {
  const router = useRouter(); // ADD THIS!
  
  // State variables INSIDE the component
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
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

  // Make this function ASYNC and put the try/catch INSIDE it
  const handleForm = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Get the authentication token
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Please login first');
        router.push('/login');
        return;
      }

      // Prepare the data to send
      const dataToSend = {
        dataType: 'hipertension', // Changed from 'diabetes' to 'hipertension'
        value: JSON.stringify(values),
      };

      console.log('Sending data:', dataToSend);

      // Make the HTTP request
      const response = await fetch(`${BACKEND_URL}/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend)
      });

      // Handle the response
      const responseData = await response.json();

      if (response.ok) {
        // Success!
        console.log('Data saved successfully:', responseData);
        setSuccess('¡Datos guardados exitosamente!');
        
        // Optional: Clear form after successful save
        setTimeout(() => {
          handleReset();
        }, 2000);
        
      } else {
        // Error from server
        console.error('Server error:', responseData);
        setError(responseData.error || 'Error al guardar los datos');
        
        // If unauthorized, redirect to login
        if (response.status === 401) {
          localStorage.removeItem('token');
          router.push('/login');
        }
      }

    } catch (err) {
      // Network error or other unexpected error
      console.error('Error saving data:', err);
      setError('Error de conexión. Por favor intenta de nuevo.');
    } finally {
      // Always stop loading, whether success or error
      setLoading(false);
    }
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
    setSuccess('');
    setError('');
  };

  return (
    <main className="flex gap-6 min-h-screen bg-[#AACBC4]">
      <div className="flex flex-col m-3 text-slate-900 items-center justify-center min-h-screen w-full overflow-hidden">
        <h1 className="text-2xl font-bold mb-4">Datos Hipertensión</h1>

        {/* Show error/success messages */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 max-w-md">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 max-w-md">
            {success}
          </div>
        )}

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

          </div>

          {/* Botones */}
          <div className="flex gap-4 mt-6 justify-center w-full">
            <button
              type="submit"
              className="bg-[#3b8494] text-black px-6 py-2 rounded-full font-bold hover:cursor-pointer disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
            <button
              type="button"
              className="bg-[#3b8494] text-black px-6 py-2 rounded-full font-bold hover:cursor-pointer"
              onClick={handleReset}
              disabled={loading}
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