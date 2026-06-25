"use client";

import { Bell, Search, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-lg border-b border-surface-200 flex items-center justify-between px-6 gap-4">
      {/* Search */}
      <div className="flex-1 max-w-lg">
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-200 ${
            searchFocused
              ? "border-primary-400 bg-white shadow-sm ring-2 ring-primary-100"
              : "border-surface-200 bg-surface-50"
          }`}
        >
          <Search size={16} className="text-surface-400 shrink-0" />
          <input
            type="text"
            placeholder="Search orders, customers..."
            className="flex-1 bg-transparent text-sm text-surface-800 placeholder:text-surface-400 outline-none"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium text-surface-400 bg-surface-100 border border-surface-200">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative p-2 rounded-xl text-surface-500 hover:bg-surface-100 hover:text-surface-700 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>

        {/* User avatar */}
        <button className="flex items-center gap-2.5 pl-3 pr-2 py-1.5 rounded-xl hover:bg-surface-100 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-xs font-bold">
            IB
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold text-surface-800 leading-none">Ishan</p>
            <p className="text-[11px] text-surface-400">Admin</p>
          </div>
          <ChevronDown size={14} className="text-surface-400 hidden sm:block" />
        </button>
      </div>
    </header>
  );
}
