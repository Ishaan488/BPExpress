"use client";

import { useState } from "react";
import {
  Building2,
  MessageSquare,
  Bell,
  Palette,
  Save,
  Upload,
  Globe,
  Phone,
  Mail,
  MapPin,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";

type SettingsTab = "business" | "whatsapp" | "notifications" | "appearance";

const tabs: { label: string; value: SettingsTab; icon: React.ElementType }[] = [
  { label: "Business Profile", value: "business", icon: Building2 },
  { label: "WhatsApp", value: "whatsapp", icon: MessageSquare },
  { label: "Notifications", value: "notifications", icon: Bell },
  { label: "Appearance", value: "appearance", icon: Palette },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("business");
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6 md:space-y-8 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-surface-900 tracking-tight">Settings</h1>
        <p className="text-sm text-surface-500 mt-1 font-medium">
          Manage your shop configuration and preferences
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Settings navigation */}
        <div className="w-full lg:w-[240px] shrink-0">
          <div className="glass-card p-2 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === tab.value
                    ? "bg-primary-500/10 text-primary-500"
                    : "text-surface-500 hover:bg-surface-100 hover:text-surface-850"
                }`}
              >
                <tab.icon
                  size={16}
                  className={
                    activeTab === tab.value
                      ? "text-primary-500"
                      : "text-surface-400"
                  }
                />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Settings content */}
        <div className="flex-1 w-full">
          {activeTab === "business" && (
            <div className="glass-card p-6 space-y-6 animate-fade-in card-body-inset">
              <div>
                <h2 className="text-sm font-bold text-surface-900 uppercase tracking-wider">
                  Business Profile
                </h2>
                <p className="text-xs text-surface-500 mt-1 font-medium">
                  Your shop information visible to customers
                </p>
              </div>

              {/* Logo upload */}
              <div>
                <label className="block text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2.5">
                  Shop Logo
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-2xl font-bold shadow-sm">
                    BP
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-surface-border bg-surface-0 text-sm font-semibold text-surface-700 hover:bg-surface-100 transition-colors cursor-pointer">
                    <Upload size={14} />
                    Upload new logo
                  </button>
                </div>
              </div>

              {/* Form fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1.5">
                    Business Name
                  </label>
                  <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-surface-border bg-surface-50 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/10 focus-within:bg-surface-0 transition-all">
                    <Building2 size={15} className="text-surface-400" />
                    <input
                      type="text"
                      defaultValue="BPExpress Print Shop"
                      className="flex-1 bg-transparent text-sm outline-none text-surface-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1.5">
                    Phone Number
                  </label>
                  <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-surface-border bg-surface-50 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/10 focus-within:bg-surface-0 transition-all">
                    <Phone size={15} className="text-surface-400" />
                    <input
                      type="text"
                      defaultValue="+91 98765 43210"
                      className="flex-1 bg-transparent text-sm outline-none text-surface-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1.5">
                    Email
                  </label>
                  <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-surface-border bg-surface-50 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/10 focus-within:bg-surface-0 transition-all">
                    <Mail size={15} className="text-surface-400" />
                    <input
                      type="text"
                      defaultValue="admin@bpexpress.in"
                      className="flex-1 bg-transparent text-sm outline-none text-surface-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1.5">
                    Website
                  </label>
                  <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-surface-border bg-surface-50 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/10 focus-within:bg-surface-0 transition-all">
                    <Globe size={15} className="text-surface-400" />
                    <input
                      type="text"
                      defaultValue="www.bpexpress.in"
                      className="flex-1 bg-transparent text-sm outline-none text-surface-800"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1.5">
                  Address
                </label>
                <div className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-xl border border-surface-border bg-surface-50 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/10 focus-within:bg-surface-0 transition-all">
                  <MapPin size={15} className="text-surface-400 mt-0.5" />
                  <textarea
                    rows={2}
                    defaultValue="123 Print Street, Sector 12, Noida, UP 201301"
                    className="flex-1 bg-transparent text-sm outline-none text-surface-800 resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition-colors shadow-sm cursor-pointer">
                  <Save size={15} />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "whatsapp" && (
            <div className="glass-card p-6 space-y-6 animate-fade-in card-body-inset">
              <div>
                <h2 className="text-sm font-bold text-surface-900 uppercase tracking-wider">
                  WhatsApp Configuration
                </h2>
                <p className="text-xs text-surface-500 mt-1 font-medium">
                  Configure your WhatsApp Business API connection
                </p>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3 flex items-start gap-3">
                <MessageSquare size={18} className="text-amber-500 shrink-0 mt-0.5 animate-pulse-soft" />
                <div>
                  <p className="text-xs font-bold text-amber-500 uppercase tracking-wider">
                    WhatsApp API Setup Required
                  </p>
                  <p className="text-xs text-surface-600 mt-1 font-medium">
                    Connect your Twilio or Meta Cloud API credentials to enable
                    WhatsApp messaging. This will be configured in the backend setup phase.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1.5">
                    API Provider
                  </label>
                  <select className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border text-sm text-surface-800 bg-surface-50 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10 focus:bg-surface-0 transition-all cursor-pointer">
                    <option>Twilio (Recommended for MVP)</option>
                    <option>Meta Cloud API</option>
                    <option>Interakt</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1.5">
                    WhatsApp Number
                  </label>
                  <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-surface-border bg-surface-50 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/10 focus-within:bg-surface-0 transition-all">
                    <Phone size={15} className="text-surface-400" />
                    <input
                      type="text"
                      placeholder="+91 XXXXX XXXXX"
                      className="flex-1 bg-transparent text-sm outline-none text-surface-800 placeholder:text-surface-400"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition-colors shadow-sm cursor-pointer">
                  <Save size={15} />
                  Save Configuration
                </button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="glass-card p-6 space-y-6 animate-fade-in card-body-inset">
              <div>
                <h2 className="text-sm font-bold text-surface-900 uppercase tracking-wider">
                  Notification Preferences
                </h2>
                <p className="text-xs text-surface-500 mt-1 font-medium">
                  Choose what notifications you receive
                </p>
              </div>

              <div className="space-y-4 divide-y divide-surface-border/40">
                {[
                  {
                    title: "New Order Alerts",
                    description: "Get notified when a new order is placed via WhatsApp",
                    defaultChecked: true,
                  },
                  {
                    title: "Payment Confirmations",
                    description: "Notify when a payment is received or fails",
                    defaultChecked: true,
                  },
                  {
                    title: "Customer Messages",
                    description: "Alert for new customer messages that need attention",
                    defaultChecked: true,
                  },
                  {
                    title: "Proof Approvals",
                    description: "Notify when a customer approves or rejects a proof",
                    defaultChecked: true,
                  },
                  {
                    title: "Daily Summary",
                    description: "Receive a daily email summary of all orders and revenue",
                    defaultChecked: false,
                  },
                ].map((pref, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-4 first:pt-0"
                  >
                    <div>
                      <p className="text-sm font-semibold text-surface-800">
                        {pref.title}
                      </p>
                      <p className="text-xs text-surface-400 mt-1 font-medium">
                        {pref.description}
                      </p>
                    </div>
                    <label className="relative inline-flex cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={pref.defaultChecked}
                        className="sr-only peer"
                      />
                      <div className="toggle-switch" />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="glass-card p-6 space-y-6 animate-fade-in card-body-inset">
              <div>
                <h2 className="text-sm font-bold text-surface-900 uppercase tracking-wider">
                  Appearance
                </h2>
                <p className="text-xs text-surface-500 mt-1 font-medium">
                  Customize the look and feel of your dashboard
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-surface-500 uppercase tracking-wider mb-3">
                  Theme
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setTheme("light")}
                    className={`flex-1 flex items-center gap-3.5 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      theme === "light"
                        ? "border-primary-500 bg-primary-500/5 text-primary-500 shadow-sm"
                        : "border-surface-border bg-surface-50 hover:border-surface-300"
                    }`}
                  >
                    <Sun
                      size={20}
                      className={
                        theme === "light"
                          ? "text-primary-500"
                          : "text-surface-400"
                      }
                    />
                    <div className="text-left">
                      <p className="text-sm font-bold text-surface-800">
                        Light
                      </p>
                      <p className="text-xs text-surface-400 font-medium mt-0.5">
                        Clean and bright
                      </p>
                    </div>
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={`flex-1 flex items-center gap-3.5 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      theme === "dark"
                        ? "border-primary-500 bg-primary-500/5 text-primary-500 shadow-sm"
                        : "border-surface-border bg-surface-50 hover:border-surface-300"
                    }`}
                  >
                    <Moon
                      size={20}
                      className={
                        theme === "dark"
                          ? "text-primary-500"
                          : "text-surface-400"
                      }
                    />
                    <div className="text-left">
                      <p className="text-sm font-bold text-surface-800">
                        Dark
                      </p>
                      <p className="text-xs text-surface-400 font-medium mt-0.5">
                        Easy on the eyes
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-surface-500 uppercase tracking-wider mb-3">
                  Accent Color
                </label>
                <div className="flex gap-4 flex-wrap">
                  {[
                    { name: "Indigo", color: "bg-indigo-500" },
                    { name: "Blue", color: "bg-blue-500" },
                    { name: "Violet", color: "bg-violet-500" },
                    { name: "Emerald", color: "bg-emerald-500" },
                    { name: "Rose", color: "bg-rose-500" },
                  ].map((c) => (
                    <button
                      key={c.name}
                      className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl hover:bg-surface-100 transition-colors cursor-pointer"
                    >
                      <div
                        className={`w-7 h-7 rounded-full ${c.color} ring-2 ring-offset-2 ring-offset-surface-0 ${
                          c.name === "Indigo"
                            ? "ring-primary-500"
                            : "ring-transparent"
                        }`}
                      />
                      <span className="text-[10px] font-bold text-surface-400 uppercase tracking-wider mt-1">
                        {c.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
