"use client";

import { useState } from "react";
import {
  Search,
  CreditCard,
  TrendingUp,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { payments } from "@/lib/mock-data";
import type { PaymentStatus } from "@/lib/mock-data";

function StatusBadge({ status }: { status: string }) {
  return <span className={`status-badge status-${status}`}>{status}</span>;
}

const statusTabs: { label: string; value: PaymentStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Paid", value: "paid" },
  { label: "Pending", value: "pending" },
  { label: "Failed", value: "failed" },
];

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState<PaymentStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = payments.filter((p) => {
    const matchesStatus = activeTab === "all" || p.status === activeTab;
    const matchesSearch =
      searchQuery === "" ||
      p.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.orderNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalRevenue = payments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);
  const totalTransactions = payments.filter((p) => p.status === "paid").length;

  return (
    <div className="space-y-6 md:space-y-8 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-surface-900 tracking-tight">Payments</h1>
          <p className="text-sm text-surface-500 mt-1 font-medium">
            Track all payment transactions and revenue
          </p>
        </div>
      </div>

      {/* Revenue summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card p-6 animate-fade-in opacity-0 delay-100">
          <div className="card-header-row">
            <div>
              <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider">Total Revenue</p>
              <p className="text-2xl font-extrabold text-surface-900 tracking-tight mt-1.5">
                ₹{totalRevenue.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
              <TrendingUp size={18} className="text-emerald-500" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3 text-xs text-emerald-500 font-semibold card-body-inset">
            <ArrowUpRight size={14} className="stroke-[2.5]" />
            12.5% from last month
          </div>
        </div>

        <div className="glass-card p-6 animate-fade-in opacity-0 delay-200">
          <div className="card-header-row">
            <div>
              <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider">Pending</p>
              <p className="text-2xl font-extrabold text-surface-900 tracking-tight mt-1.5">
                ₹{pendingAmount.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
              <Clock size={18} className="text-amber-500" />
            </div>
          </div>
          <p className="text-xs text-surface-400 mt-3 font-semibold card-body-inset">
            {payments.filter((p) => p.status === "pending").length} transactions pending
          </p>
        </div>

        <div className="glass-card p-6 animate-fade-in opacity-0 delay-300">
          <div className="card-header-row">
            <div>
              <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider">Transactions</p>
              <p className="text-2xl font-extrabold text-surface-900 tracking-tight mt-1.5">
                {totalTransactions}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center shrink-0">
              <CreditCard size={18} className="text-primary-500" />
            </div>
          </div>
          <p className="text-xs text-surface-400 mt-3 font-semibold card-body-inset">Successful payments this month</p>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 flex flex-col md:flex-row items-stretch md:items-center gap-4 card-body-inset">
        <div className="flex items-center gap-1 bg-surface-100 rounded-xl p-1 overflow-x-auto shrink-0">
          {statusTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === tab.value
                  ? "bg-surface-0 text-surface-900 shadow-sm"
                  : "text-surface-500 hover:text-surface-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl border border-surface-border bg-surface-0 flex-1 max-w-sm md:ml-auto focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/10 transition-all">
          <Search size={15} className="text-surface-400" />
          <input
            type="text"
            placeholder="Search payments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none text-surface-800 placeholder:text-surface-400"
          />
        </div>
      </div>

      {/* Payments table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-surface-border bg-surface-50/50">
                <th className="text-[10px] font-bold text-surface-400 uppercase tracking-wider px-6 py-3.5">
                  Transaction
                </th>
                <th className="text-[10px] font-bold text-surface-400 uppercase tracking-wider px-6 py-3.5">
                  Customer
                </th>
                <th className="text-[10px] font-bold text-surface-400 uppercase tracking-wider px-6 py-3.5">
                  Order
                </th>
                <th className="text-[10px] font-bold text-surface-400 uppercase tracking-wider px-6 py-3.5">
                  Method
                </th>
                <th className="text-right text-[10px] font-bold text-surface-400 uppercase tracking-wider px-6 py-3.5">
                  Amount
                </th>
                <th className="text-[10px] font-bold text-surface-400 uppercase tracking-wider px-6 py-3.5">
                  Status
                </th>
                <th className="text-[10px] font-bold text-surface-400 uppercase tracking-wider px-6 py-3.5">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((payment, idx) => (
                <tr
                  key={payment.id}
                  className="border-b border-surface-border hover:bg-surface-100/30 transition-colors animate-fade-in opacity-0"
                  style={{ animationDelay: `${idx * 25}ms` }}
                >
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-surface-800 font-mono">
                      {payment.transactionId || "—"}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-surface-700 font-medium">
                      {payment.customerName}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-primary-500 font-bold">
                      {payment.orderNumber}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-surface-600 font-medium">
                      {payment.method || "—"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-bold text-surface-800">
                      ₹{payment.amount.toLocaleString("en-IN")}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={payment.status} />
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-surface-500 font-semibold">
                      {new Date(payment.createdAt).toLocaleDateString(
                        "en-IN",
                        { day: "numeric", month: "short", year: "numeric" }
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
