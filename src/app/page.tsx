"use client";

import {
  ShoppingBag,
  TrendingUp,
  Users,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Printer,
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
import { useTheme } from "@/components/theme-provider";

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
  const iconColors: Record<string, string> = {
    indigo: "text-surface-500 bg-surface-100",
    emerald: "text-emerald-500 bg-emerald-500/10",
    violet: "text-blue-500 bg-blue-500/10",
    amber: "text-amber-500 bg-amber-500/10",
  };

  return (
    <div
      className={`glass-card p-7 sm:p-8 flex flex-col animate-fade-in opacity-0 ${delay}`}
    >
      <div className="card-header-row">
        <div className="min-w-0">
          <p className="section-label">{title}</p>
          <p className="text-3xl md:text-4xl font-bold text-surface-900 tracking-tight mt-4">{value}</p>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-3">
            {trend === "up" && (
              <span className="flex items-center gap-0.5 text-xs font-medium text-emerald-500">
                <ArrowUpRight size={14} className="stroke-[2.5]" />
                {trendValue}
              </span>
            )}
            {trend === "down" && (
              <span className="flex items-center gap-0.5 text-xs font-medium text-red-500">
                <ArrowDownRight size={14} className="stroke-[2.5]" />
                {trendValue}
              </span>
            )}
            <span className="text-sm text-surface-500">{subtitle}</span>
          </div>
        </div>
        <div className={`w-10 h-10 rounded-xl ${iconColors[color]} flex items-center justify-center shrink-0`}>
          <Icon size={18} className="stroke-[2]" />
        </div>
      </div>
    </div>
  );
}

// ---- Status badge ----
function StatusBadge({ status }: { status: string }) {
  return <span className={`status-badge status-${status}`}>{status}</span>;
}

// ---- Priority badge ----
function PriorityDot({ priority }: { priority: string }) {
  const colors: Record<string, string> = {
    low: "bg-surface-400",
    medium: "bg-blue-400",
    high: "bg-amber-400",
    urgent: "bg-red-500",
  };
  return (
    <span className="flex items-center gap-1.5 text-xs text-surface-500 capitalize">
      <span className={`w-1.5 h-1.5 rounded-full ${colors[priority]}`} />
      {priority}
    </span>
  );
}

// ---- Custom Tooltip for charts ----
function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="glass-card px-3.5 py-2.5 rounded-xl text-xs shadow-md">
      <p className="font-medium text-surface-600 mb-0.5">{label}</p>
      <p className="font-semibold text-surface-900">₹{payload[0].value.toLocaleString("en-IN")}</p>
    </div>
  );
}

// ---- Custom Tooltip for Order count chart ----
function OrderChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="glass-card px-3.5 py-2.5 rounded-xl text-xs shadow-md">
      <p className="font-medium text-surface-600 mb-0.5">{label}</p>
      <p className="font-semibold text-surface-900">{payload[0].value} Orders</p>
    </div>
  );
}

export default function DashboardPage() {
  const { theme } = useTheme();
  const recentOrders = orders.slice(0, 8);
  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const printingCount = orders.filter((o) => o.status === "printing").length;

  const statusProgressColors: Record<string, string> = {
    Pending: "bg-amber-500",
    Approved: "bg-blue-500",
    Printing: "bg-violet-500",
    Completed: "bg-emerald-500",
  };

  const gridStroke = "var(--chart-grid)";
  const tickFill = "var(--chart-tick)";
  const chartLine = "var(--chart-line)";
  const isDark = theme === "dark";
  const cursorStroke = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";

  return (
    <div className="dashboard-page">
      {/* Page header */}
      <div className="dashboard-section flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold text-surface-900 tracking-tight">Dashboard</h1>
        <p className="text-sm text-surface-500">
          Overview of your print shop performance
        </p>
      </div>

      {/* KPI Grid Structure */}
      <div className="dashboard-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8">
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

      {/* Charts row — minmax(0,…) prevents Recharts from blowing out the grid column */}
      <div className="dashboard-section grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-8 lg:gap-10 items-start">
        {/* Revenue chart */}
        <div className="glass-card p-7 sm:p-8 lg:p-9 flex flex-col animate-fade-in opacity-0 delay-200 min-w-0 overflow-hidden">
          <div className="card-header-row mb-8 lg:mb-10">
            <div>
              <h2 className="section-label">Revenue Overview</h2>
              <p className="text-sm text-surface-500 mt-2">Monthly revenue trend</p>
            </div>
            <span className="text-xs font-medium text-surface-500 bg-surface-100 px-2.5 py-1 rounded-lg border border-surface-border shrink-0 ml-4">
              2026
            </span>
          </div>
          <div className="h-[280px] w-full min-w-0 chart-grid card-body-inset">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-line)" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="var(--chart-line)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: tickFill }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: tickFill }}
                  tickFormatter={(v: number) => `₹${v / 1000}K`}
                />
                <Tooltip content={<ChartTooltip />} cursor={{ stroke: cursorStroke, strokeWidth: 1 }} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke={chartLine}
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                  dot={false}
                  activeDot={{ r: 4, strokeWidth: 0, fill: chartLine }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order status breakdown */}
        <div className="glass-card p-7 sm:p-8 lg:p-9 flex flex-col justify-between animate-fade-in opacity-0 delay-300 min-w-0 overflow-hidden">
          <div className="card-body-inset">
            <h2 className="section-label mb-7">Active Orders</h2>
            <div className="space-y-6">
              {ordersByStatus.map((item) => {
                const total = ordersByStatus.reduce((s, i) => s + i.count, 0);
                const pct = Math.round((item.count / total) * 100);
                return (
                  <div key={item.status}>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-surface-500">{item.status}</span>
                      <span className="text-surface-800 font-medium tabular-nums">{item.count}</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${statusProgressColors[item.status] || "bg-surface-400"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick actions */}
          <div className="mt-10 pt-7 border-t border-surface-border card-body-inset">
            <h3 className="section-label mb-5">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link
                href="/orders"
                className="flex items-center gap-3 text-sm text-surface-500 hover:text-surface-800 hover:bg-surface-100/50 transition-colors py-3 px-3 -mx-3 rounded-lg"
              >
                <AlertCircle size={14} className="text-amber-500 shrink-0" />
                <span>{pendingCount} orders need proofs</span>
              </Link>
              <Link
                href="/orders"
                className="flex items-center gap-3 text-sm text-surface-500 hover:text-surface-800 hover:bg-surface-100/50 transition-colors py-3 px-3 -mx-3 rounded-lg"
              >
                <Printer size={14} className="text-violet-500 shrink-0" />
                <span>{printingCount} orders in printing</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly orders bar chart */}
      <div className="dashboard-section glass-card p-7 sm:p-8 lg:p-9 flex flex-col animate-fade-in opacity-0 delay-300 min-w-0 overflow-hidden">
        <div className="card-header-row mb-8 lg:mb-10">
          <div>
            <h2 className="section-label">Weekly Orders</h2>
            <p className="text-sm text-surface-500 mt-2">Orders received this week</p>
          </div>
        </div>
        <div className="h-[240px] w-full min-w-0 chart-grid card-body-inset">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyOrderData} barCategoryGap="30%" margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--chart-bar-start)" />
                  <stop offset="100%" stopColor="var(--chart-bar-end)" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: tickFill }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: tickFill }}
              />
              <Tooltip
                cursor={{ fill: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}
                content={<OrderChartTooltip />}
              />
              <Bar
                dataKey="orders"
                fill="url(#barGradient)"
                radius={[6, 6, 0, 0]}
                activeBar={{ fill: "var(--chart-line)", opacity: 0.8 }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="dashboard-section glass-card p-7 sm:p-8 lg:p-9 flex flex-col animate-fade-in opacity-0 delay-400 overflow-hidden">
        <div className="card-header-row pb-7 mb-6 border-b border-surface-border">
          <div>
            <h2 className="section-label">Recent Orders</h2>
            <p className="text-sm text-surface-500 mt-2">Latest orders across all statuses</p>
          </div>
          <Link
            href="/orders"
            className="text-xs font-medium text-primary-500 hover:text-primary-600 transition-colors flex items-center gap-1 shrink-0 ml-4"
          >
            View all
            <ArrowUpRight size={14} className="stroke-[2.5]" />
          </Link>
        </div>
        <div className="overflow-x-auto card-body-inset">
          <table className="w-full text-left min-w-[720px]">
            <thead className="sticky top-0 z-10 bg-surface-0">
              <tr className="border-b border-surface-border">
                <th className="section-label pb-4 pt-2 pr-8 text-left">
                  Order
                </th>
                <th className="section-label pb-4 pt-2 px-8 text-left">
                  Customer
                </th>
                <th className="section-label pb-4 pt-2 px-8 text-left">
                  Status
                </th>
                <th className="section-label pb-4 pt-2 px-8 text-left">
                  Priority
                </th>
                <th className="section-label pb-4 pt-2 pl-8 text-right">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, index) => (
                <tr
                  key={order.id}
                  className={`border-b border-surface-border/50 last:border-b-0 transition-colors hover:bg-surface-100/40 ${
                    index % 2 === 1 ? "bg-surface-100/20" : ""
                  }`}
                >
                  <td className="py-5 pr-8">
                    <Link
                      href={`/orders/${order.id}`}
                      className="text-sm font-medium text-surface-800 hover:text-primary-500 transition-colors"
                    >
                      {order.orderNumber}
                    </Link>
                    <p className="text-xs text-surface-400 mt-0.5">{order.title}</p>
                  </td>
                  <td className="py-5 px-8">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-surface-100 flex items-center justify-center text-[10px] font-medium text-surface-500 border border-surface-border">
                        {order.customerName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="text-sm text-surface-700">{order.customerName}</span>
                    </div>
                  </td>
                  <td className="py-5 px-8">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="py-5 px-8">
                    <PriorityDot priority={order.priority} />
                  </td>
                  <td className="py-5 pl-8 text-right">
                    <span className="text-sm font-medium text-surface-800 tabular-nums">
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
