"use client";

import { useState } from "react";
import {
  Search,
  Users,
  Phone,
  Mail,
  ShoppingBag,
  Calendar,
  ArrowUpRight,
  TrendingUp,
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Customers</h1>
          <p className="text-sm text-surface-500 mt-0.5">
            Manage your customer base and order history
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass-card px-4 py-2 flex items-center gap-2">
            <Users size={16} className="text-primary-500" />
            <span className="text-sm font-semibold text-surface-700">
              {customers.length}
            </span>
            <span className="text-xs text-surface-400">total</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-surface-200 bg-white max-w-md">
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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
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
              className="glass-card p-5 hover:shadow-lg hover:shadow-primary-100/50 transition-all duration-300 animate-fade-in opacity-0 cursor-pointer group"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              {/* Customer header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-bold">
                    {customer.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-surface-800 group-hover:text-primary-600 transition-colors">
                      {customer.name}
                    </p>
                    <p className="text-xs text-surface-400 flex items-center gap-1 mt-0.5">
                      <Phone size={11} />
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
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-surface-50 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-surface-800">
                    {customer.totalOrders}
                  </p>
                  <p className="text-[10px] text-surface-400 font-medium uppercase tracking-wider">
                    Orders
                  </p>
                </div>
                <div className="bg-surface-50 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-surface-800">
                    ₹{(customer.totalSpent / 1000).toFixed(1)}K
                  </p>
                  <p className="text-[10px] text-surface-400 font-medium uppercase tracking-wider">
                    Spent
                  </p>
                </div>
                <div className="bg-surface-50 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-surface-800">
                    {activeOrders.length}
                  </p>
                  <p className="text-[10px] text-surface-400 font-medium uppercase tracking-wider">
                    Active
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-surface-100">
                <div className="flex items-center gap-1.5 text-xs text-surface-400">
                  <Calendar size={12} />
                  Last order:{" "}
                  {new Date(customer.lastOrderAt).toLocaleDateString(
                    "en-IN",
                    { day: "numeric", month: "short" }
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs text-surface-400">
                  <Mail size={11} />
                  {customer.email}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="glass-card py-16 flex flex-col items-center justify-center text-surface-400">
          <Users size={40} className="mb-3 opacity-30" />
          <p className="text-sm font-medium">No customers found</p>
        </div>
      )}
    </div>
  );
}
