"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const BACKEND_URL = "https://dihycare-backend.vercel.app";

const DatosHipertension = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [sistolica, setSistolica] = useState("");
  const [diastolica, setDiastolica] = useState("");
  const [frecuencia, setFrecuencia] = useState("");

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
        { dataType: "PAS", value: parseFloat(sistolica) },
        { dataType: "PAD", value: parseFloat(diastolica) },
        { dataType: "HEART_RATE", value: parseFloat(frecuencia) },
      ];

      console.log("📤 Datos listos para enviar al backend:");
      console.table(dataToSend);

      for (const dataItem of dataToSend) {
        console.log(`➡️ Enviando al backend:`, dataItem);

        const response = await fetch(`${BACKEND_URL}/data`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataItem),
        });

        const responseData = await response.json();

        console.log("⬅️ Respuesta del backend:", responseData);

        if (!response.ok) {
          console.error("❌ Error del servidor:", responseData);
          setError(responseData.error || "Error al guardar los datos");
          if (response.status === 401) {
            localStorage.removeItem("token");
            router.push("/login");
          }
          return;
        }
      }

      setSuccess("¡Datos guardados exitosamente!");
      console.log("✅ Todos los datos se enviaron correctamente.");
      setTimeout(() => handleReset(), 2000);
    } catch (err) {
      console.error("💥 Error al guardar:", err);
      setError("Error de conexión. Por favor intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSistolica("");
    setDiastolica("");
    setFrecuencia("");
    setError("");
    setSuccess("");
  };

  return (
    <main className="flex min-h-screen bg-[#AACBC4] justify-center items-center">
      <div className="flex flex-col items-center w-full max-w-2xl text-slate-900">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Datos de Presión Arterial
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 w-full text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 w-full text-center">
            {success}
          </div>
        )}

        <form
          onSubmit={handleForm}
          className="flex flex-col gap-5 w-full items-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <input
              id="sistolica"
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-center focus:outline-none focus:ring-2 focus:ring-[#3b8494]"
              placeholder="Presión Sistólica (mmHg)"
              type="number"
              value={sistolica}
              onChange={(e) => setSistolica(e.target.value)}
              required
            />

            <input
              id="diastolica"
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-center focus:outline-none focus:ring-2 focus:ring-[#3b8494]"
              placeholder="Presión Diastólica (mmHg)"
              type="number"
              value={diastolica}
              onChange={(e) => setDiastolica(e.target.value)}
              required
            />

            <input
              id="frecuencia"
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-center focus:outline-none focus:ring-2 focus:ring-[#3b8494]"
              placeholder="Frecuencia Cardíaca (bpm)"
              type="number"
              value={frecuencia}
              onChange={(e) => setFrecuencia(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-4 mt-6 justify-center w-full">
            <button
              type="submit"
              className="bg-[#3b8494] text-white font-semibold px-6 py-2 rounded-full hover:bg-[#2f6c79] transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-[#8baaa1] text-white font-semibold px-6 py-2 rounded-full hover:bg-[#78968d] transition"
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
