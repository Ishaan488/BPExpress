"use client";

import {
  ShoppingBag,
  TrendingUp,
  Users,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Printer,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { dashboardStats, weeklyOrderData, monthlyRevenue, orders, ordersByStatus } from "@/lib/mock-data";
import Link from "next/link";

// ---- KPI Card ----
function KpiCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  color,
  delay,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ElementType;
  trend?: "up" | "down";
  trendValue?: string;
  color: string;
  delay: string;
}) {
  const colorMap: Record<string, string> = {
    indigo: "from-primary-500 to-primary-700",
    emerald: "from-emerald-500 to-emerald-700",
    violet: "from-violet-500 to-violet-700",
    amber: "from-amber-500 to-amber-700",
  };
  const bgMap: Record<string, string> = {
    indigo: "bg-primary-50",
    emerald: "bg-emerald-50",
    violet: "bg-violet-50",
    amber: "bg-amber-50",
  };

  return (
    <div
      className={`glass-card p-5 animate-fade-in opacity-0 ${delay}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-surface-500">{title}</p>
          <p className="text-2xl font-bold text-surface-900 mt-1">{value}</p>
          <div className="flex items-center gap-1.5 mt-2">
            {trend === "up" && (
              <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald-600">
                <ArrowUpRight size={14} />
                {trendValue}
              </span>
            )}
            {trend === "down" && (
              <span className="flex items-center gap-0.5 text-xs font-semibold text-red-500">
                <ArrowDownRight size={14} />
                {trendValue}
              </span>
            )}
            <span className="text-xs text-surface-400">{subtitle}</span>
          </div>
        </div>
        <div className={`w-11 h-11 rounded-2xl ${bgMap[color]} flex items-center justify-center`}>
          <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${colorMap[color]} flex items-center justify-center text-white`}>
            <Icon size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Status dot ----
function StatusBadge({ status }: { status: string }) {
  return <span className={`status-badge status-${status}`}>{status}</span>;
}

// ---- Priority badge ----
function PriorityDot({ priority }: { priority: string }) {
  const colors: Record<string, string> = {
    low: "bg-surface-300",
    medium: "bg-blue-400",
    high: "bg-amber-400",
    urgent: "bg-red-500",
  };
  return (
    <span className="flex items-center gap-1.5 text-xs text-surface-500 capitalize">
      <span className={`w-2 h-2 rounded-full ${colors[priority]}`} />
      {priority}
    </span>
  );
}

// ---- Custom Tooltip for charts ----
function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload) return null;
  return (
    <div className="bg-surface-900 text-white px-3 py-2 rounded-lg text-xs shadow-lg">
      <p className="font-semibold">{label}</p>
      <p>₹{payload[0].value.toLocaleString("en-IN")}</p>
    </div>
  );
}

export default function DashboardPage() {
  const recentOrders = orders.slice(0, 8);
  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const printingCount = orders.filter((o) => o.status === "printing").length;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Dashboard</h1>
        <p className="text-sm text-surface-500 mt-0.5">
          Overview of your print shop performance
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Orders"
          value={dashboardStats.totalOrders.toString()}
          subtitle="this month"
          icon={ShoppingBag}
          trend="up"
          trendValue="8.2%"
          color="indigo"
          delay="delay-100"
        />
        <KpiCard
          title="Revenue"
          value={`₹${(dashboardStats.revenue / 1000).toFixed(1)}K`}
          subtitle="this month"
          icon={TrendingUp}
          trend="up"
          trendValue={`${dashboardStats.revenueGrowth}%`}
          color="emerald"
          delay="delay-200"
        />
        <KpiCard
          title="Customers"
          value={dashboardStats.totalCustomers.toString()}
          subtitle={`+${dashboardStats.newCustomersThisMonth} new`}
          icon={Users}
          trend="up"
          trendValue="14%"
          color="violet"
          delay="delay-300"
        />
        <KpiCard
          title="Pending Approvals"
          value={dashboardStats.pendingApprovals.toString()}
          subtitle="need attention"
          icon={Clock}
          color="amber"
          delay="delay-400"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue chart */}
        <div className="lg:col-span-2 glass-card p-5 animate-fade-in opacity-0 delay-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-surface-800">Revenue Overview</h2>
              <p className="text-xs text-surface-400">Monthly revenue trend</p>
            </div>
            <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2.5 py-1 rounded-lg">
              2026
            </span>
          </div>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#94a3b8" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#94a3b8" }}
                  tickFormatter={(v: number) => `₹${v / 1000}K`}
                />
                <Tooltip content={<ChartTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order status breakdown */}
        <div className="glass-card p-5 animate-fade-in opacity-0 delay-300">
          <h2 className="text-base font-semibold text-surface-800 mb-4">Active Orders</h2>
          <div className="space-y-4">
            {ordersByStatus.map((item) => {
              const total = ordersByStatus.reduce((s, i) => s + i.count, 0);
              const pct = Math.round((item.count / total) * 100);
              return (
                <div key={item.status}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="text-surface-600 font-medium">{item.status}</span>
                    <span className="text-surface-800 font-semibold">{item.count}</span>
                  </div>
                  <div className="w-full h-2 bg-surface-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick actions */}
          <div className="mt-6 pt-4 border-t border-surface-200">
            <h3 className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <Link
                href="/orders"
                className="flex items-center gap-2 text-sm text-surface-600 hover:text-primary-600 transition-colors py-1"
              >
                <AlertCircle size={14} className="text-amber-500" />
                <span>{pendingCount} orders need proofs</span>
              </Link>
              <Link
                href="/orders"
                className="flex items-center gap-2 text-sm text-surface-600 hover:text-primary-600 transition-colors py-1"
              >
                <Printer size={14} className="text-violet-500" />
                <span>{printingCount} orders in printing</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly orders bar chart */}
      <div className="glass-card p-5 animate-fade-in opacity-0 delay-300">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-surface-800">Weekly Orders</h2>
            <p className="text-xs text-surface-400">Orders received this week</p>
          </div>
        </div>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyOrderData} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#94a3b8" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#94a3b8" }}
              />
              <Tooltip
                cursor={{ fill: "rgba(99,102,241,0.05)" }}
                contentStyle={{
                  background: "#0f172a",
                  border: "none",
                  borderRadius: "8px",
                  color: "white",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="orders" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="glass-card overflow-hidden animate-fade-in opacity-0 delay-400">
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-200">
          <div>
            <h2 className="text-base font-semibold text-surface-800">Recent Orders</h2>
            <p className="text-xs text-surface-400">Latest orders across all statuses</p>
          </div>
          <Link
            href="/orders"
            className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors flex items-center gap-1"
          >
            View all
            <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-100">
                <th className="text-left text-xs font-semibold text-surface-400 uppercase tracking-wider px-5 py-3">
                  Order
                </th>
                <th className="text-left text-xs font-semibold text-surface-400 uppercase tracking-wider px-5 py-3">
                  Customer
                </th>
                <th className="text-left text-xs font-semibold text-surface-400 uppercase tracking-wider px-5 py-3">
                  Status
                </th>
                <th className="text-left text-xs font-semibold text-surface-400 uppercase tracking-wider px-5 py-3">
                  Priority
                </th>
                <th className="text-right text-xs font-semibold text-surface-400 uppercase tracking-wider px-5 py-3">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-surface-50 hover:bg-surface-50/50 transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <Link
                      href={`/orders/${order.id}`}
                      className="text-sm font-semibold text-surface-800 hover:text-primary-600 transition-colors"
                    >
                      {order.orderNumber}
                    </Link>
                    <p className="text-xs text-surface-400 mt-0.5">{order.title}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-surface-200 to-surface-300 flex items-center justify-center text-[10px] font-bold text-surface-600">
                        {order.customerName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="text-sm text-surface-700">{order.customerName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-5 py-3.5">
                    <PriorityDot priority={order.priority} />
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <span className="text-sm font-semibold text-surface-800">
                      ₹{order.totalAmount.toLocaleString("en-IN")}
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
