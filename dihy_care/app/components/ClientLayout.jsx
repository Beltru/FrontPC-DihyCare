"use client";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  // rutas donde NO debe aparecer la landing
  const hideSidebarPaths = ["/", "/login", "/register", "/form"];
  const hideSidebar = hideSidebarPaths.includes(pathname);

  return (
    <div
      className={`${
        hideSidebar
          ? "bg-white flex justify-center items-center min-h-screen"
          : "flex bg-[#d9d9d9] h-screen overflow-hidden"
      }`}
    >
      {!hideSidebar && <Sidebar />}

      <main
        className={`${
          hideSidebar ? "w-full h-full" : "flex-1 overflow-y-auto p-4"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
