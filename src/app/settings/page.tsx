"use client";

import { useState } from "react";
import {
  Settings as SettingsIcon,
  Building2,
  MessageSquare,
  Bell,
  Palette,
  Shield,
  Save,
  Upload,
  Globe,
  Phone,
  Mail,
  MapPin,
  Sun,
  Moon,
} from "lucide-react";

type SettingsTab = "business" | "whatsapp" | "notifications" | "appearance";

const tabs: { label: string; value: SettingsTab; icon: React.ElementType }[] = [
  { label: "Business Profile", value: "business", icon: Building2 },
  { label: "WhatsApp", value: "whatsapp", icon: MessageSquare },
  { label: "Notifications", value: "notifications", icon: Bell },
  { label: "Appearance", value: "appearance", icon: Palette },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("business");
  const [theme, setTheme] = useState("light");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Settings</h1>
        <p className="text-sm text-surface-500 mt-0.5">
          Manage your shop configuration and preferences
        </p>
      </div>

      <div className="flex gap-6">
        {/* Settings navigation */}
        <div className="w-[240px] shrink-0">
          <div className="glass-card p-2 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.value
                    ? "bg-primary-50 text-primary-700"
                    : "text-surface-500 hover:bg-surface-50 hover:text-surface-700"
                }`}
              >
                <tab.icon
                  size={16}
                  className={
                    activeTab === tab.value
                      ? "text-primary-600"
                      : "text-surface-400"
                  }
                />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Settings content */}
        <div className="flex-1">
          {activeTab === "business" && (
            <div className="glass-card p-6 space-y-6 animate-fade-in">
              <div>
                <h2 className="text-lg font-bold text-surface-800">
                  Business Profile
                </h2>
                <p className="text-sm text-surface-400 mt-0.5">
                  Your shop information visible to customers
                </p>
              </div>

              {/* Logo upload */}
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Shop Logo
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-2xl font-bold">
                    BP
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-surface-200 text-sm font-medium text-surface-600 hover:bg-surface-50 transition-colors">
                    <Upload size={14} />
                    Upload new logo
                  </button>
                </div>
              </div>

              {/* Form fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-1.5">
                    Business Name
                  </label>
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-surface-200 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-100">
                    <Building2 size={15} className="text-surface-400" />
                    <input
                      type="text"
                      defaultValue="BPExpress Print Shop"
                      className="flex-1 bg-transparent text-sm outline-none text-surface-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-1.5">
                    Phone Number
                  </label>
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-surface-200 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-100">
                    <Phone size={15} className="text-surface-400" />
                    <input
                      type="text"
                      defaultValue="+91 98765 43210"
                      className="flex-1 bg-transparent text-sm outline-none text-surface-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-1.5">
                    Email
                  </label>
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-surface-200 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-100">
                    <Mail size={15} className="text-surface-400" />
                    <input
                      type="text"
                      defaultValue="admin@bpexpress.in"
                      className="flex-1 bg-transparent text-sm outline-none text-surface-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-1.5">
                    Website
                  </label>
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-surface-200 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-100">
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
                <label className="block text-sm font-medium text-surface-700 mb-1.5">
                  Address
                </label>
                <div className="flex items-start gap-2 px-4 py-2.5 rounded-xl border border-surface-200 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-100">
                  <MapPin size={15} className="text-surface-400 mt-0.5" />
                  <textarea
                    rows={2}
                    defaultValue="123 Print Street, Sector 12, Noida, UP 201301"
                    className="flex-1 bg-transparent text-sm outline-none text-surface-800 resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors shadow-sm">
                  <Save size={15} />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "whatsapp" && (
            <div className="glass-card p-6 space-y-6 animate-fade-in">
              <div>
                <h2 className="text-lg font-bold text-surface-800">
                  WhatsApp Configuration
                </h2>
                <p className="text-sm text-surface-400 mt-0.5">
                  Configure your WhatsApp Business API connection
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-3">
                <MessageSquare size={18} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-800">
                    WhatsApp API Setup Required
                  </p>
                  <p className="text-xs text-amber-700 mt-0.5">
                    Connect your Twilio or Meta Cloud API credentials to enable
                    WhatsApp messaging. This will be configured in the backend setup phase.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-1.5">
                    API Provider
                  </label>
                  <select className="w-full px-4 py-2.5 rounded-xl border border-surface-200 text-sm text-surface-800 bg-white outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100">
                    <option>Twilio (Recommended for MVP)</option>
                    <option>Meta Cloud API</option>
                    <option>Interakt</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-1.5">
                    WhatsApp Number
                  </label>
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-surface-200">
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
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors shadow-sm">
                  <Save size={15} />
                  Save Configuration
                </button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="glass-card p-6 space-y-6 animate-fade-in">
              <div>
                <h2 className="text-lg font-bold text-surface-800">
                  Notification Preferences
                </h2>
                <p className="text-sm text-surface-400 mt-0.5">
                  Choose what notifications you receive
                </p>
              </div>

              <div className="space-y-4">
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
                    className="flex items-center justify-between py-3 border-b border-surface-100 last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-surface-700">
                        {pref.title}
                      </p>
                      <p className="text-xs text-surface-400 mt-0.5">
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
            <div className="glass-card p-6 space-y-6 animate-fade-in">
              <div>
                <h2 className="text-lg font-bold text-surface-800">
                  Appearance
                </h2>
                <p className="text-sm text-surface-400 mt-0.5">
                  Customize the look and feel of your dashboard
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-3">
                  Theme
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setTheme("light")}
                    className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                      theme === "light"
                        ? "border-primary-500 bg-primary-50/50"
                        : "border-surface-200 hover:border-surface-300"
                    }`}
                  >
                    <Sun
                      size={20}
                      className={
                        theme === "light"
                          ? "text-primary-600"
                          : "text-surface-400"
                      }
                    />
                    <div className="text-left">
                      <p className="text-sm font-semibold text-surface-800">
                        Light
                      </p>
                      <p className="text-xs text-surface-400">
                        Clean and bright
                      </p>
                    </div>
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                      theme === "dark"
                        ? "border-primary-500 bg-primary-50/50"
                        : "border-surface-200 hover:border-surface-300"
                    }`}
                  >
                    <Moon
                      size={20}
                      className={
                        theme === "dark"
                          ? "text-primary-600"
                          : "text-surface-400"
                      }
                    />
                    <div className="text-left">
                      <p className="text-sm font-semibold text-surface-800">
                        Dark
                      </p>
                      <p className="text-xs text-surface-400">
                        Easy on the eyes
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-3">
                  Accent Color
                </label>
                <div className="flex gap-3">
                  {[
                    { name: "Indigo", color: "bg-indigo-500" },
                    { name: "Blue", color: "bg-blue-500" },
                    { name: "Violet", color: "bg-violet-500" },
                    { name: "Emerald", color: "bg-emerald-500" },
                    { name: "Rose", color: "bg-rose-500" },
                  ].map((c) => (
                    <button
                      key={c.name}
                      className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-surface-50 transition-colors"
                    >
                      <div
                        className={`w-8 h-8 rounded-full ${c.color} ring-2 ring-offset-2 ${
                          c.name === "Indigo"
                            ? "ring-primary-500"
                            : "ring-transparent"
                        }`}
                      />
                      <span className="text-[10px] font-medium text-surface-500">
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
