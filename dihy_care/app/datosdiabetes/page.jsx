"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

const BACKEND_URL = "https://dihycare-backend.vercel.app";

const DatosDiabetes = () => {
  const router = useRouter();

  // ============================================
  // STEP 1: States for each input
  // ============================================
  const [glucosa, setGlucosa] = useState("");
  const [carbohidratos, setCarbohidratos] = useState("");
  const [insulina, setInsulina] = useState("");

  // ============================================
  // STEP 2: States for feedback and loading
  // ============================================
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ============================================
  // STEP 3: Submit handler
  // ============================================
  const handleForm = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
  
    try {
      // Token del usuario
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Por favor, inicia sesión primero.");
        router.push("/login");
        return;
      }
  
      const dataToSend = [
        { dataType: "GLUCOSE", value: parseFloat(glucosa) },
        { dataType: "INSULIN", value: parseFloat(insulina) },
        { dataType: "CARBS", value: parseFloat(carbohidratos) },
      ];
  
      console.log("Enviando:", dataToSend);
  
      for (const dataItem of dataToSend) {
        const response = await fetch(`${BACKEND_URL}/data`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataItem),
        });
  
        const responseData = await response.json();
  
        if (!response.ok) {
          console.error("Error del servidor:", responseData);
          setError(responseData.error || "Error al guardar los datos");
          if (response.status === 401) {
            localStorage.removeItem("token");
            router.push("/login");
          }
          return; // detener si uno falla
        }
      }
  
      // Si todos los fetch salieron bien:
      setSuccess("¡Datos guardados exitosamente!");
      setTimeout(() => handleReset(), 2000);
    } catch (err) {
      console.error("Error al guardar:", err);
      setError("Error de conexión. Por favor intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };
  

  // ============================================
  // STEP 4: Reset form
  // ============================================
  const handleReset = () => {
    setGlucosa("");
    setCarbohidratos("");
    setInsulina("");
    setError("");
    setSuccess("");
  };

  // ============================================
  // STEP 5: Render UI
  // ============================================
  return (
    <main className="flex gap-6 min-h-screen bg-[#AACBC4]">
      <div className="flex flex-col m-3 text-slate-900 items-center justify-center min-h-screen w-full overflow-hidden">
        <h1 className="text-2xl font-bold mb-4">Datos Diabetes</h1>

        {/* Mensajes de error o éxito */}
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
            {/* Glucosa */}
            <input
              id="glucosa"
              className="bg-gray-200 border-2 border-black rounded px-2 py-1"
              placeholder="Glucosa"
              type="number"
              value={glucosa}
              onChange={(e) => setGlucosa(e.target.value)}
              required
            />

            {/* Carbohidratos */}
            <input
              id="carbohidratos"
              className="bg-gray-200 border-2 border-black rounded px-2 py-1"
              placeholder="Carbohidratos"
              type="number"
              value={carbohidratos}
              onChange={(e) => setCarbohidratos(e.target.value)}
            />

            {/* Insulina */}
            <input
              id="insulina"
              className="bg-gray-200 border-2 border-black rounded px-2 py-1"
              placeholder="Insulina"
              type="number"
              value={insulina}
              onChange={(e) => setInsulina(e.target.value)}
            />
          </div>

          {/* Botones */}
          <div className="flex gap-4 mt-6 justify-center w-full">
            <button
              type="submit"
              className="bg-[#3b8494] text-black px-6 py-2 rounded-full font-bold hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar"}
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
