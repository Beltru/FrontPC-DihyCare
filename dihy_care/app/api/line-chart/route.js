import { NextResponse } from "next/server";

const presion = [
  { name: "00:00", presion: 40, },
  { name: "01:00", presion: 50, },
  { name: "02:00", presion: 20, },
  { name: "03:00", presion: 20, },
  { name: "04:00", presion: 78, },
  { name: "05:00", presion: 29, },
  { name: "06:00", presion: 40, },
  { name: "07:00", presion: 50, },
  { name: "08:00", presion: 20, },
  { name: "09:00", presion: 20, },
  { name: "10:00", presion: 78, },
  { name: "11:00", presion: 29, },
];

export async function GET() {
  return NextResponse.json(presion);
}
