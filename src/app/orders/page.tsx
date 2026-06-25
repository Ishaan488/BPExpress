"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Plus,
  ArrowUpRight,
  Calendar,
  FileText,
} from "lucide-react";
import { orders, type OrderStatus } from "@/lib/mock-data";

const statusTabs: { label: string; value: OrderStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Printing", value: "printing" },
  { label: "Completed", value: "completed" },
];

function StatusBadge({ status }: { status: string }) {
  return <span className={`status-badge status-${status}`}>{status}</span>;
}

function PriorityBadge({ priority }: { priority: string }) {
  const styles: Record<string, string> = {
    low: "bg-surface-100 text-surface-500",
    medium: "bg-blue-50 text-blue-600",
    high: "bg-amber-50 text-amber-600",
    urgent: "bg-red-50 text-red-600",
  };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-md capitalize ${styles[priority]}`}>
      {priority}
    </span>
  );
}

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<OrderStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = orders.filter((order) => {
    const matchesStatus = activeTab === "all" || order.status === activeTab;
    const matchesSearch =
      searchQuery === "" ||
      order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Orders</h1>
          <p className="text-sm text-surface-500 mt-0.5">
            Manage all print orders and their status
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors shadow-sm">
          <Plus size={16} />
          New Order
        </button>
      </div>

      {/* Filters */}
      <div className="glass-card p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Status tabs */}
          <div className="flex items-center gap-1 bg-surface-100 rounded-xl p-1">
            {statusTabs.map((tab) => {
              const count =
                tab.value === "all"
                  ? orders.length
                  : orders.filter((o) => o.status === tab.value).length;
              return (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.value
                      ? "bg-white text-surface-800 shadow-sm"
                      : "text-surface-500 hover:text-surface-700"
                  }`}
                >
                  {tab.label}
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      activeTab === tab.value
                        ? "bg-primary-100 text-primary-700"
                        : "bg-surface-200 text-surface-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-surface-200 bg-white flex-1 max-w-sm ml-auto">
            <Search size={15} className="text-surface-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none text-surface-800 placeholder:text-surface-400"
            />
          </div>
        </div>
      </div>

      {/* Orders table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-100 bg-surface-50/50">
                <th className="text-left text-xs font-semibold text-surface-400 uppercase tracking-wider px-5 py-3">
                  Order
                </th>
                <th className="text-left text-xs font-semibold text-surface-400 uppercase tracking-wider px-5 py-3">
                  Customer
                </th>
                <th className="text-left text-xs font-semibold text-surface-400 uppercase tracking-wider px-5 py-3">
                  Category
                </th>
                <th className="text-left text-xs font-semibold text-surface-400 uppercase tracking-wider px-5 py-3">
                  Status
                </th>
                <th className="text-left text-xs font-semibold text-surface-400 uppercase tracking-wider px-5 py-3">
                  Priority
                </th>
                <th className="text-left text-xs font-semibold text-surface-400 uppercase tracking-wider px-5 py-3">
                  Due Date
                </th>
                <th className="text-right text-xs font-semibold text-surface-400 uppercase tracking-wider px-5 py-3">
                  Amount
                </th>
                <th className="text-left text-xs font-semibold text-surface-400 uppercase tracking-wider px-5 py-3">
                  Payment
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order, idx) => (
                <tr
                  key={order.id}
                  className="border-b border-surface-50 hover:bg-primary-50/30 transition-colors animate-fade-in opacity-0"
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  <td className="px-5 py-3.5">
                    <Link
                      href={`/orders/${order.id}`}
                      className="flex items-center gap-2 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-surface-100 flex items-center justify-center">
                        <FileText size={14} className="text-surface-500" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-surface-800 group-hover:text-primary-600 transition-colors">
                          {order.orderNumber}
                        </p>
                        <p className="text-xs text-surface-400 max-w-[180px] truncate">
                          {order.title}
                        </p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-surface-200 to-surface-300 flex items-center justify-center text-[10px] font-bold text-surface-600">
                        {order.customerName.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm text-surface-700">{order.customerName}</p>
                        <p className="text-[11px] text-surface-400">{order.customerPhone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm text-surface-600">{order.category}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-5 py-3.5">
                    <PriorityBadge priority={order.priority} />
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5 text-sm text-surface-600">
                      <Calendar size={13} className="text-surface-400" />
                      {new Date(order.dueDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <span className="text-sm font-semibold text-surface-800">
                      ₹{order.totalAmount.toLocaleString("en-IN")}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={order.paymentStatus} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-surface-400">
            <Search size={40} className="mb-3 opacity-30" />
            <p className="text-sm font-medium">No orders found</p>
            <p className="text-xs mt-1">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
    </div>
  );
}
