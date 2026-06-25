"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  CreditCard,
  MessageSquare,
  Settings,
  Printer,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Orders", href: "/orders", icon: ShoppingBag },
  { label: "Customers", href: "/customers", icon: Users },
  { label: "Payments", href: "/payments", icon: CreditCard },
  { label: "Messages", href: "/messages", icon: MessageSquare },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 z-40 h-screen flex flex-col border-r border-surface-border bg-surface-0 transition-all duration-300 w-20 hover:w-64 group/sidebar overflow-hidden shadow-md hover:shadow-xl py-6">
      {/* Logo */}
      <div className="flex items-center h-16 border-b border-surface-border shrink-0 overflow-hidden">
        <div className="w-20 h-16 flex items-center justify-center shrink-0">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-500 text-white shadow-sm">
            <Printer size={20} />
          </div>
        </div>
        <div className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          <h1 className="text-sm font-bold text-surface-900 tracking-tight leading-none">
            BPExpress
          </h1>
          <p className="text-[11px] text-surface-400 font-medium mt-0.5">
            Print Management
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-x-hidden overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center h-11 rounded-xl text-sm font-medium transition-all duration-200 overflow-hidden ${
                isActive
                  ? "bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400"
                  : "text-surface-500 hover:bg-surface-100 hover:text-surface-900"
              }`}
            >
              <div className="w-[56px] h-11 flex items-center justify-center shrink-0">
                <item.icon
                  size={20}
                  className={`transition-colors duration-200 ${
                    isActive
                      ? "text-primary-500 dark:text-primary-400"
                      : "text-surface-400 group-hover:text-surface-600 dark:group-hover:text-surface-300"
                  }`}
                />
              </div>
              <span className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
