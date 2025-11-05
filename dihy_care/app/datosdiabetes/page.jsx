"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { Button } from "@nextui-org/react";

// ============================================
// STEP 1: Define your backend URL
// ============================================
const BACKEND_URL = 'https://dihycare-backend.vercel.app';

const DatosDiabetes = () => {
  const router = useRouter();
  
  // ============================================
  // STEP 2: State for form data
  // ============================================
  const [values, setValues] = useState({
    glucosa: "",
    carbohidratos: "",
    insulina: "",
    password: "",
  });

  // ============================================
  // STEP 3: State for UI feedback
  // ============================================
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [selectedKeys, setSelectedKeys] = useState({
    glucosa: new Set([]),
    carbohidratos: new Set([]),
    insulina: new Set([]),
    password: new Set([]),
    peso: new Set([]),
    genero: new Set([]),
  });

  // Manejador genérico para dropdowns
  const handleSelect = (field, keys) => {
    const selected = Array.from(keys)[0];
    setValues((prev) => ({ ...prev, [field]: selected }));
  };

  const getSelectedValue = (field) =>
    Array.from(selectedKeys[field]).join(", ").replace(/_/g, " ");

  // ============================================
  // STEP 4: Function to save data to backend
  // ============================================
  const handleForm = async (event) => {
    event.preventDefault();
    
    // Clear previous messages
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // ============================================
      // STEP 4A: Get the authentication token
      // ============================================
      // The token proves who the user is
      const token = localStorage.getItem('token');
      
      if (!token) {
        // If no token, user is not logged in
        setError('Please login first');
        router.push('/login');
        return;
      }

      // ============================================
      // STEP 4B: Prepare the data to send
      // ============================================
      // Your backend expects specific field names
      // Look at data.controller.ts - it expects a "Data" object
      const dataToSend = {
        dataType: 'diabetes', // Type of data (you can customize this)
        value: JSON.stringify(values), // Convert form data to string
        // The backend will automatically add userId from the token
      };

      console.log('Sending data:', dataToSend);

      // ============================================
      // STEP 4C: Make the HTTP request
      // ============================================
      // POST = Create new data
      // URL: /data endpoint
      // Headers: Tell server what format we're sending + authentication
      // Body: The actual data
      const response = await fetch(`${BACKEND_URL}/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // We're sending JSON
          'Authorization': `Bearer ${token}` // Proof of who we are
        },
        body: JSON.stringify(dataToSend) // Convert JS object to JSON string
      });

      // ============================================
      // STEP 4D: Handle the response
      // ============================================
      const responseData = await response.json();

      if (response.ok) {
        // Success! (status 200-299)
        console.log('Data saved successfully:', responseData);
        setSuccess('¡Datos guardados exitosamente!');
        
        // Optional: Clear form after successful save
        setTimeout(() => {
          handleReset();
        }, 2000);
        
      } else {
        // Error from server (status 400-599)
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
    setSuccess('');
    setError('');
  };

  return (
    <main className="flex gap-6 min-h-screen bg-[#AACBC4]">
      <div className="flex flex-col m-3 text-slate-900 items-center justify-center min-h-screen w-full overflow-hidden">
        <h1 className="text-2xl font-bold mb-4">Datos Diabetes</h1>

        {/* ============================================ */}
        {/* STEP 5: Show feedback messages to user */}
        {/* ============================================ */}
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
          </div>

          {/* Botones */}
          <div className="flex gap-4 mt-6 justify-center w-full">
            <button
              type="submit"
              className="bg-[#3b8494] text-black px-6 py-2 rounded-full font-bold hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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

export default DatosDiabetes;

/*
============================================
SUMMARY: How to Connect Any Form to Backend
============================================

1. DEFINE BACKEND URL
   const BACKEND_URL = 'your-backend-url';

2. ADD STATE FOR FEEDBACK
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');
   const [success, setSuccess] = useState('');

3. IN YOUR SUBMIT HANDLER:
   a) Get token: const token = localStorage.getItem('token');
   b) Check if logged in: if (!token) redirect to login
   c) Prepare data: const dataToSend = { your data };
   d) Make request:
      const response = await fetch(`${BACKEND_URL}/endpoint`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend)
      });
   e) Handle response:
      if (response.ok) { success }
      else { error }

4. SHOW FEEDBACK TO USER
   Display error/success messages

5. HANDLE LOADING STATE
   Disable button while loading

THAT'S IT! You can apply this pattern to ANY form.
*/