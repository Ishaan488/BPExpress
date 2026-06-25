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
  ChevronLeft,
  ChevronRight,
  Printer,
} from "lucide-react";
import { useSidebar } from "./sidebar-context";

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
  const { collapsed, toggle } = useSidebar();

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen flex flex-col border-r border-surface-200 bg-white transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-[260px]"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-surface-200 shrink-0">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary-600 text-white shrink-0">
          <Printer size={20} />
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <h1 className="text-lg font-bold text-surface-900 tracking-tight leading-none">
              BPExpress
            </h1>
            <p className="text-[11px] text-surface-400 font-medium">Print Management</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary-50 text-primary-700 shadow-sm"
                  : "text-surface-500 hover:bg-surface-100 hover:text-surface-800"
              }`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon
                size={20}
                className={`shrink-0 transition-colors ${
                  isActive ? "text-primary-600" : "text-surface-400 group-hover:text-surface-600"
                }`}
              />
              {!collapsed && <span>{item.label}</span>}
              {isActive && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="px-3 py-3 border-t border-surface-200">
        <button
          onClick={toggle}
          className="flex items-center justify-center w-full py-2 rounded-xl text-surface-400 hover:bg-surface-100 hover:text-surface-600 transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!collapsed && <span className="ml-2 text-sm">Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
