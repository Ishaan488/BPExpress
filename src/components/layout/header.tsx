"use client";

import { Bell, Search, ChevronDown, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/components/theme-provider";

export default function Header() {
  const [searchFocused, setSearchFocused] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-[68px] border-b border-surface-border bg-surface-0/90 backdrop-blur-lg pl-10 pr-8">
      {/* Search */}
      <div className="w-full max-w-3xl ml-10">
        <div
          className={`flex items-center h-10 rounded-xl border transition-all duration-200 ${searchFocused
            ? "border-surface-300 bg-surface-0 ring-1 ring-surface-300/50 shadow-sm"
            : "border-surface-border bg-surface-100/80"
            }`}
        >
          <Search
            size={18}
            className="ml-5 mr-3 text-surface-400 flex-shrink-0"
          />

          <input
            type="text"
            placeholder="Search orders, customers..."
            className="flex-1 bg-transparent pr-3 text-sm text-surface-800 placeholder:text-surface-400 outline-none"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="ml-8 flex items-center gap-3 shrink-0">
        <button
          onClick={toggleTheme}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-surface-500 transition-colors hover:bg-surface-100 hover:text-surface-800"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button className="relative flex h-9 w-9 items-center justify-center rounded-xl text-surface-500 transition-colors hover:bg-surface-100 hover:text-surface-800">
          <Bell size={18} />
          <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-surface-0" />
        </button>

        <button className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-surface-100">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 text-xs font-semibold text-white">
            IB
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium text-surface-800">Ishan</p>
            <p className="text-xs text-surface-400">Admin</p>
          </div>

          <ChevronDown
            size={14}
            className="hidden text-surface-400 sm:block"
          />
        </button>
      </div>
    </header>
  );
}