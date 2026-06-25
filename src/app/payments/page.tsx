"use client";

import { useState } from "react";
import {
  Search,
  CreditCard,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  RotateCcw,
  IndianRupee,
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Payments</h1>
        <p className="text-sm text-surface-500 mt-0.5">
          Track all payment transactions and revenue
        </p>
      </div>

      {/* Revenue summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-5 animate-fade-in opacity-0 delay-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-surface-500 font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-surface-900 mt-1">
                ₹{totalRevenue.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 flex items-center justify-center">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white">
                <TrendingUp size={16} />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs text-emerald-600 font-semibold">
            <ArrowUpRight size={14} />
            12.5% from last month
          </div>
        </div>

        <div className="glass-card p-5 animate-fade-in opacity-0 delay-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-surface-500 font-medium">Pending</p>
              <p className="text-2xl font-bold text-surface-900 mt-1">
                ₹{pendingAmount.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-amber-50 flex items-center justify-center">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white">
                <Clock size={16} />
              </div>
            </div>
          </div>
          <p className="text-xs text-surface-400 mt-2">
            {payments.filter((p) => p.status === "pending").length} transactions pending
          </p>
        </div>

        <div className="glass-card p-5 animate-fade-in opacity-0 delay-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-surface-500 font-medium">Transactions</p>
              <p className="text-2xl font-bold text-surface-900 mt-1">
                {totalTransactions}
              </p>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-primary-50 flex items-center justify-center">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white">
                <CreditCard size={16} />
              </div>
            </div>
          </div>
          <p className="text-xs text-surface-400 mt-2">Successful payments this month</p>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-1 bg-surface-100 rounded-xl p-1">
          {statusTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.value
                  ? "bg-white text-surface-800 shadow-sm"
                  : "text-surface-500 hover:text-surface-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-surface-200 bg-white flex-1 max-w-sm ml-auto">
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
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-100 bg-surface-50/50">
                <th className="text-left text-xs font-semibold text-surface-400 uppercase tracking-wider px-5 py-3">
                  Transaction
                </th>
                <th className="text-left text-xs font-semibold text-surface-400 uppercase tracking-wider px-5 py-3">
                  Customer
                </th>
                <th className="text-left text-xs font-semibold text-surface-400 uppercase tracking-wider px-5 py-3">
                  Order
                </th>
                <th className="text-left text-xs font-semibold text-surface-400 uppercase tracking-wider px-5 py-3">
                  Method
                </th>
                <th className="text-right text-xs font-semibold text-surface-400 uppercase tracking-wider px-5 py-3">
                  Amount
                </th>
                <th className="text-left text-xs font-semibold text-surface-400 uppercase tracking-wider px-5 py-3">
                  Status
                </th>
                <th className="text-left text-xs font-semibold text-surface-400 uppercase tracking-wider px-5 py-3">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((payment, idx) => (
                <tr
                  key={payment.id}
                  className="border-b border-surface-50 hover:bg-primary-50/30 transition-colors animate-fade-in opacity-0"
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  <td className="px-5 py-3.5">
                    <p className="text-sm font-medium text-surface-700 font-mono">
                      {payment.transactionId || "—"}
                    </p>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm text-surface-700">
                      {payment.customerName}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm text-primary-600 font-medium">
                      {payment.orderNumber}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm text-surface-600">
                      {payment.method || "—"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <span className="text-sm font-semibold text-surface-800">
                      ₹{payment.amount.toLocaleString("en-IN")}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={payment.status} />
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm text-surface-500">
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
