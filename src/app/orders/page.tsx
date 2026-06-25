"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
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
    low: "bg-surface-200 text-surface-600",
    medium: "bg-blue-500/10 text-blue-500",
    high: "bg-amber-500/10 text-amber-500",
    urgent: "bg-red-500/10 text-red-500",
  };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md capitalize ${styles[priority]}`}>
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
    <div className="space-y-6 md:space-y-8 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-surface-900 tracking-tight">Orders</h1>
          <p className="text-sm text-surface-500 mt-1 font-medium">
            Manage all print orders and their status
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition-colors shadow-sm cursor-pointer">
          <Plus size={16} />
          New Order
        </button>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 card-body-inset">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
          {/* Status tabs */}
          <div className="flex items-center gap-1 bg-surface-100 rounded-xl p-1 overflow-x-auto">
            {statusTabs.map((tab) => {
              const count =
                tab.value === "all"
                  ? orders.length
                  : orders.filter((o) => o.status === tab.value).length;
              return (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                    activeTab === tab.value
                      ? "bg-surface-0 text-surface-900 shadow-sm"
                      : "text-surface-500 hover:text-surface-800"
                  }`}
                >
                  {tab.label}
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                      activeTab === tab.value
                        ? "bg-primary-500/10 text-primary-500"
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
          <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl border border-surface-border bg-surface-0 flex-1 max-w-sm md:ml-auto focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/10 transition-all">
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
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-surface-border bg-surface-50/50">
                <th className="text-[10px] font-bold text-surface-400 uppercase tracking-wider px-6 py-3.5">
                  Order
                </th>
                <th className="text-[10px] font-bold text-surface-400 uppercase tracking-wider px-6 py-3.5">
                  Customer
                </th>
                <th className="text-[10px] font-bold text-surface-400 uppercase tracking-wider px-6 py-3.5">
                  Category
                </th>
                <th className="text-[10px] font-bold text-surface-400 uppercase tracking-wider px-6 py-3.5">
                  Status
                </th>
                <th className="text-[10px] font-bold text-surface-400 uppercase tracking-wider px-6 py-3.5">
                  Priority
                </th>
                <th className="text-[10px] font-bold text-surface-400 uppercase tracking-wider px-6 py-3.5">
                  Due Date
                </th>
                <th className="text-right text-[10px] font-bold text-surface-400 uppercase tracking-wider px-6 py-3.5">
                  Amount
                </th>
                <th className="text-[10px] font-bold text-surface-400 uppercase tracking-wider px-6 py-3.5">
                  Payment
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order, idx) => (
                <tr
                  key={order.id}
                  className="border-b border-surface-border hover:bg-surface-100/30 transition-colors animate-fade-in opacity-0"
                  style={{ animationDelay: `${idx * 25}ms` }}
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/orders/${order.id}`}
                      className="flex items-center gap-2.5 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-surface-100 flex items-center justify-center border border-surface-border shrink-0">
                        <FileText size={14} className="text-surface-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-surface-800 group-hover:text-primary-500 transition-colors">
                          {order.orderNumber}
                        </p>
                        <p className="text-xs text-surface-400 max-w-[180px] truncate mt-0.5 font-medium">
                          {order.title}
                        </p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-surface-100 flex items-center justify-center text-[10px] font-bold text-surface-500 border border-surface-border shrink-0">
                        {order.customerName.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm text-surface-700 font-medium">{order.customerName}</p>
                        <p className="text-[10px] text-surface-400 mt-0.5 font-medium">{order.customerPhone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-surface-600 font-medium">{order.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4">
                    <PriorityBadge priority={order.priority} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-surface-600 font-medium">
                      <Calendar size={13} className="text-surface-400" />
                      {new Date(order.dueDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-bold text-surface-800">
                      ₹{order.totalAmount.toLocaleString("en-IN")}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.paymentStatus} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-surface-400 bg-surface-0">
            <Search size={40} className="mb-3 opacity-30" />
            <p className="text-sm font-semibold text-surface-700">No orders found</p>
            <p className="text-xs text-surface-400 mt-1 font-medium">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
    </div>
  );
}
