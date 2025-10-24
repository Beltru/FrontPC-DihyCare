"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./components/Sidebar";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // 🔹 Rutas donde NO queremos mostrar la Sidebar
  const exclude = ["/", "/login", "/register", "/form"];
  const hideSidebar = exclude.includes(pathname);

  if (hideSidebar) {
    return <main className="w-screen h-screen m-0 p-0">{children}</main>;
  }

  return (
    <div className="flex min-h-screen w-screen m-0 p-0 overflow-x-hidden">
      <Sidebar />
      <main className="flex-1 m-0 p-0">{children}</main>
    </div>
  );
}
