import { NextResponse } from "next/server";

// Temporal: base de datos en memoria
let events = [];

export async function GET() {
  return NextResponse.json(events);
}

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body?.title || !body?.date)
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });

    const newEvent = {
      id: Date.now(),
      ...body,
      date: new Date(body.date),
    };
    events.push(newEvent);

    return NextResponse.json(newEvent, { status: 200 });
  } catch (err) {
    console.error("Error guardando evento:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
