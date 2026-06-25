import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/sidebar";
import AppShell from "@/components/layout/app-shell";
import { SidebarProvider } from "@/components/layout/sidebar-context";

export const metadata: Metadata = {
  title: "BPExpress — Print Shop Admin",
  description: "Admin dashboard for managing WhatsApp print shop orders, customers, and payments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SidebarProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <AppShell>{children}</AppShell>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
