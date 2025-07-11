import { NextResponse } from "next/server";

const salesData = [
  { name: "Jan", revenue: 4000, profit: 3000 },
  { name: "Feb", revenue: 5000, profit: 2000 },
  { name: "Mar", revenue: 2000, profit: 1000 },
  { name: "Apr", revenue: 2000, profit: 6000 },
  { name: "May", revenue: 7800, profit: 9500 },
  { name: "Jun", revenue: 2900, profit: 8300 },
];

export async function GET() {
  return NextResponse.json(salesData);
}
