// app/api/area-chart/route.js
import { NextResponse } from "next/server";

// Base de datos temporal (en memoria)
const glucosa = [
  { name: "00:00", glucosatisular: 40, plasmaglucosa: 30 },
  { name: "01:00", glucosatisular: 50, plasmaglucosa: 20 },
  { name: "02:00", glucosatisular: 20, plasmaglucosa: 10 },
  { name: "03:00", glucosatisular: 37, plasmaglucosa: 24 },
  { name: "04:00", glucosatisular: 78, plasmaglucosa: 95 },
  { name: "05:00", glucosatisular: 29, plasmaglucosa: 83 },
  { name: "06:00", glucosatisular: 40, plasmaglucosa: 30 },
  { name: "07:00", glucosatisular: 50, plasmaglucosa: 20 },
  { name: "08:00", glucosatisular: 20, plasmaglucosa: 10 },
  { name: "09:00", glucosatisular: 37, plasmaglucosa: 24 },
  { name: "10:00", glucosatisular: 78, plasmaglucosa: 95 },
  { name: "11:00", glucosatisular: 29, plasmaglucosa: 83 },
];

export async function GET() {
  return NextResponse.json(glucosa);
}
