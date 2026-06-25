"use client";

import { useSidebar } from "./sidebar-context";
import Header from "./header";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();

  return (
    <div
      className={`flex-1 transition-all duration-300 flex flex-col min-h-screen ${
        collapsed ? "ml-[72px]" : "ml-[260px]"
      }`}
    >
      <Header />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
