// app/api/login/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Validación simple simulada (reemplazá con tu lógica real o base de datos)
    if (email === "test@example.com" && password === "123456") {
      return NextResponse.json({ message: "Login exitoso" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Credenciales inválidas" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
  }
}
