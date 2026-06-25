"use client";

import { useState } from "react";
import {
  Search,
  Users,
  Phone,
  Mail,
  Calendar,
  ArrowUpRight,
} from "lucide-react";
import { customers, orders } from "@/lib/mock-data";

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = customers.filter(
    (c) =>
      searchQuery === "" ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-6 md:space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-surface-900 tracking-tight">Customers</h1>
          <p className="text-sm text-surface-500 mt-1 font-medium">
            Manage your customer base and order history
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass-card px-4 py-2 flex items-center gap-2 border border-surface-border bg-surface-0 shadow-sm">
            <Users size={16} className="text-primary-500" />
            <span className="text-sm font-bold text-surface-900">
              {customers.length}
            </span>
            <span className="text-xs text-surface-400 font-medium">total</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="glass-card p-4 card-body-inset">
        <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl border border-surface-border bg-surface-0 max-w-md focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/10 transition-all">
          <Search size={15} className="text-surface-400" />
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none text-surface-800 placeholder:text-surface-400"
          />
        </div>
      </div>

      {/* Customer cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((customer, idx) => {
          const customerOrders = orders.filter(
            (o) => o.customerId === customer.id
          );
          const activeOrders = customerOrders.filter(
            (o) => o.status !== "completed" && o.status !== "cancelled"
          );

          return (
            <div
              key={customer.id}
              className="glass-card p-6 hover:translate-y-[-2px] hover:shadow-md transition-all duration-300 animate-fade-in opacity-0 cursor-pointer group"
              style={{ animationDelay: `${idx * 40}ms` }}
            >
              {/* Customer header */}
              <div className="card-header-row mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                    {customer.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-surface-800 group-hover:text-primary-500 transition-colors">
                      {customer.name}
                    </p>
                    <p className="text-xs text-surface-405 flex items-center gap-1.5 mt-1 font-semibold text-surface-400">
                      <Phone size={12} className="text-surface-400" />
                      {customer.phone}
                    </p>
                  </div>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-surface-300 group-hover:text-primary-500 transition-colors"
                />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 card-body-inset">
                <div className="bg-surface-100 rounded-xl p-3 text-center border border-surface-border/50">
                  <p className="text-base font-extrabold text-surface-850">
                    {customer.totalOrders}
                  </p>
                  <p className="text-[9px] text-surface-400 font-bold uppercase tracking-wider mt-1">
                    Orders
                  </p>
                </div>
                <div className="bg-surface-100 rounded-xl p-3 text-center border border-surface-border/50">
                  <p className="text-base font-extrabold text-surface-850">
                    ₹{(customer.totalSpent / 1000).toFixed(1)}K
                  </p>
                  <p className="text-[9px] text-surface-400 font-bold uppercase tracking-wider mt-1">
                    Spent
                  </p>
                </div>
                <div className="bg-surface-100 rounded-xl p-3 text-center border border-surface-border/50">
                  <p className="text-base font-extrabold text-surface-850">
                    {activeOrders.length}
                  </p>
                  <p className="text-[9px] text-surface-400 font-bold uppercase tracking-wider mt-1">
                    Active
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-surface-border/60 card-body-inset">
                <div className="flex items-center gap-1.5 text-xs text-surface-400 font-medium">
                  <Calendar size={12} className="text-surface-300" />
                  Last order:{" "}
                  <span className="font-semibold text-surface-500">
                    {new Date(customer.lastOrderAt).toLocaleDateString(
                      "en-IN",
                      { day: "numeric", month: "short" }
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-surface-400 font-medium truncate max-w-[150px]">
                  <Mail size={11} className="text-surface-300 shrink-0" />
                  <span className="truncate">{customer.email}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="glass-card py-16 flex flex-col items-center justify-center text-surface-400 bg-surface-0">
          <Users size={40} className="mb-3 opacity-30" />
          <p className="text-sm font-semibold text-surface-700">No customers found</p>
        </div>
      )}
    </div>
  );
}
