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
    <aside className="fixed top-0 left-0 z-40 h-screen flex flex-col border-r border-surface-200 bg-white transition-all duration-300 w-20 hover:w-64 group/sidebar overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary-100/50">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-surface-200 shrink-0 min-w-[256px]">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-600 text-white shrink-0">
          <Printer size={20} />
        </div>
        <div className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          <h1 className="text-lg font-bold text-surface-900 tracking-tight leading-none">
            BPExpress
          </h1>
          <p className="text-[11px] text-surface-400 font-medium">
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
              className={`group flex items-center gap-3 p-2 rounded-xl text-sm font-medium transition-all duration-200 min-w-[230px] ${
                isActive
                  ? "bg-primary-50 text-primary-700 shadow-sm"
                  : "text-surface-500 hover:bg-surface-100 hover:text-surface-800"
              }`}
            >
              <div className="flex items-center justify-center w-10 h-10 shrink-0">
                <item.icon
                  size={22}
                  className={`transition-colors ${
                    isActive
                      ? "text-primary-600"
                      : "text-surface-400 group-hover:text-surface-600"
                  }`}
                />
              </div>
              <span className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {item.label}
              </span>
              {isActive && (
                <div className="ml-auto mr-12 w-1.5 h-1.5 rounded-full bg-primary-500 opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300" />
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
