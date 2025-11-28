"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import api from '../src/api'; 

const DatosDiabetes = () => {
  const router = useRouter();

  const [glucosa, setGlucosa] = useState("");
  const [carbohidratos, setCarbohidratos] = useState("");
  const [insulina, setInsulina] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleForm = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
  
    try {
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
        const response = await api.post('/data', dataItem);
      }
  
      setSuccess("¡Datos guardados exitosamente!");
      setTimeout(() => handleReset(), 2000);
      
    } catch (err) {
      if (err.response) {
        const status = err.response.status;
        const responseData = err.response.data;
        
        setError(responseData.error || `Error ${status} al guardar los datos`);

        if (status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
        }
      } else {
        console.error("Error al guardar:", err);
        setError("Error de conexión. Por favor intenta de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };
  

  const handleReset = () => {
    setGlucosa("");
    setCarbohidratos("");
    setInsulina("");
    setError("");
    setSuccess("");
  };

  return (
    <main className="flex gap-6 min-h-screen bg-[#AACBC4]">
      <div className="flex flex-col m-3 text-slate-900 items-center justify-center min-h-screen w-full overflow-hidden">
        <h1 className="text-2xl font-bold mb-4">Datos Diabetes</h1>

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
            <input
              id="glucosa"
              className="bg-gray-200 border-2 border-black rounded px-2 py-1"
              placeholder="Glucosa"
              type="number"
              value={glucosa}
              onChange={(e) => setGlucosa(e.target.value)}
              required
            />

            <input
              id="carbohidratos"
              className="bg-gray-200 border-2 border-black rounded px-2 py-1"
              placeholder="Carbohidratos"
              type="number"
              value={carbohidratos}
              onChange={(e) => setCarbohidratos(e.target.value)}
            />

            <input
              id="insulina"
              className="bg-gray-200 border-2 border-black rounded px-2 py-1"
              placeholder="Insulina"
              type="number"
              value={insulina}
              onChange={(e) => setInsulina(e.target.value)}
            />
          </div>

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