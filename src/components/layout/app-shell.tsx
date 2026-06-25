"use client";

import Header from "./header";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-surface-50" style={{ marginLeft: '80px' }}>
      <Header />
      <main className="flex-1 p-6 max-w-[1600px] mx-auto w-full">{children}</main>
    </div>
  );
}
