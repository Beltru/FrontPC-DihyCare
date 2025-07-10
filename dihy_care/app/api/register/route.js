import { NextResponse } from "next/server";

let users = []; // Esto es una "base de datos" en memoria (se reinicia al reiniciar servidor)

export async function POST(req) {
  try {
    const { email, password, name, lastname } = await req.json();

    // Verificar si ya existe
    if (users.find(u => u.email === email)) {
      return NextResponse.json({ message: "El email ya está registrado" }, { status: 400 });
    }

    // Guardar nuevo usuario
    users.push({ email, password, name, lastname });

    return NextResponse.json({ message: "Registro exitoso" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
  }
}
