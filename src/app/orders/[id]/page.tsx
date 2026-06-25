"use client";

import { use } from "react";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  FileText,
  Upload,
  Send,
  CheckCircle2,
  XCircle,
  Clock,
  CreditCard,
  Phone,
  Calendar,
  Download,
  MessageSquare,
  Printer,
  ChevronDown,
  Eye,
} from "lucide-react";
import { orders } from "@/lib/mock-data";

function StatusBadge({ status }: { status: string }) {
  return <span className={`status-badge status-${status}`}>{status}</span>;
}

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const order = orders.find((o) => o.id === id);
  const [newComment, setNewComment] = useState("");
  const [activeProof, setActiveProof] = useState(
    order?.proofVersions.length ? order.proofVersions.length - 1 : -1
  );

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-surface-400">
        <FileText size={48} className="mb-3 opacity-30" />
        <p className="text-lg font-semibold">Order not found</p>
        <Link
          href="/orders"
          className="mt-3 text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
        >
          <ArrowLeft size={14} /> Back to orders
        </Link>
      </div>
    );
  }

  const currentProof =
    activeProof >= 0 ? order.proofVersions[activeProof] : null;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Breadcrumb + Back */}
      <div className="flex items-center gap-3">
        <Link
          href="/orders"
          className="flex items-center gap-1.5 text-sm text-surface-500 hover:text-primary-600 transition-colors"
        >
          <ArrowLeft size={16} />
          Orders
        </Link>
        <span className="text-surface-300">/</span>
        <span className="text-sm font-medium text-surface-700">
          {order.orderNumber}
        </span>
      </div>

      {/* Order header card */}
      <div className="glass-card p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center shrink-0">
              <FileText size={22} className="text-primary-600" />
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-xl font-bold text-surface-900">
                  {order.title}
                </h1>
                <StatusBadge status={order.status} />
              </div>
              <p className="text-sm text-surface-500 mt-1">
                {order.description}
              </p>
              <div className="flex items-center gap-4 mt-3 flex-wrap">
                <div className="flex items-center gap-1.5 text-sm text-surface-500">
                  <Phone size={13} />
                  {order.customerName} · {order.customerPhone}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-surface-500">
                  <Calendar size={13} />
                  Due:{" "}
                  {new Date(order.dueDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-surface-500">
                  <CreditCard size={13} />
                  ₹{order.totalAmount.toLocaleString("en-IN")}
                  <StatusBadge status={order.paymentStatus} />
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {order.status === "pending" && (
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors">
                <Upload size={15} />
                Upload Proof
              </button>
            )}
            {order.status === "approved" && (
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-colors">
                <Printer size={15} />
                Start Printing
              </button>
            )}
            {order.status === "printing" && (
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors">
                <CheckCircle2 size={15} />
                Mark as Ready
              </button>
            )}
            {order.paymentStatus === "pending" && (
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-surface-200 text-surface-700 text-sm font-semibold hover:bg-surface-50 transition-colors">
                <CreditCard size={15} />
                Generate Payment Link
              </button>
            )}
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-surface-200 text-surface-700 text-sm font-semibold hover:bg-surface-50 transition-colors">
              <Send size={15} />
              Send to WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Split screen: Proof viewer + Comments */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Left: Proof viewer (3/5) */}
        <div className="lg:col-span-3 glass-card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-surface-200 bg-surface-50/50">
            <h2 className="text-sm font-semibold text-surface-700">
              Proof Viewer
            </h2>
            <div className="flex items-center gap-2">
              {order.proofVersions.map((proof, idx) => (
                <button
                  key={proof.id}
                  onClick={() => setActiveProof(idx)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    activeProof === idx
                      ? "bg-primary-100 text-primary-700"
                      : "bg-surface-100 text-surface-500 hover:bg-surface-200"
                  }`}
                >
                  V{proof.version}
                </button>
              ))}
            </div>
          </div>

          {/* Proof content */}
          <div className="p-6">
            {currentProof ? (
              <div className="space-y-4">
                {/* Mock PDF preview */}
                <div className="aspect-[4/3] bg-surface-100 rounded-2xl border-2 border-dashed border-surface-200 flex flex-col items-center justify-center">
                  <FileText
                    size={48}
                    className="text-surface-300 mb-3"
                  />
                  <p className="text-sm font-medium text-surface-500">
                    {currentProof.fileName}
                  </p>
                  <p className="text-xs text-surface-400 mt-1">
                    Uploaded{" "}
                    {new Date(currentProof.uploadedAt).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-surface-200 text-xs font-medium text-surface-600 hover:bg-surface-50 transition-colors">
                      <Eye size={13} />
                      Preview
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-surface-200 text-xs font-medium text-surface-600 hover:bg-surface-50 transition-colors">
                      <Download size={13} />
                      Download
                    </button>
                  </div>
                </div>

                {/* Proof status */}
                <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-surface-50 border border-surface-100">
                  <div className="flex items-center gap-2">
                    {currentProof.status === "approved" && (
                      <CheckCircle2
                        size={16}
                        className="text-emerald-500"
                      />
                    )}
                    {currentProof.status === "rejected" && (
                      <XCircle size={16} className="text-red-500" />
                    )}
                    {currentProof.status === "pending" && (
                      <Clock size={16} className="text-amber-500" />
                    )}
                    <span className="text-sm font-medium text-surface-700 capitalize">
                      Proof V{currentProof.version} —{" "}
                      {currentProof.status}
                    </span>
                  </div>
                  <StatusBadge status={currentProof.status} />
                </div>
              </div>
            ) : (
              <div className="aspect-[4/3] bg-surface-50 rounded-2xl border-2 border-dashed border-surface-200 flex flex-col items-center justify-center">
                <Upload size={40} className="text-surface-300 mb-3" />
                <p className="text-sm font-medium text-surface-500">
                  No proofs uploaded yet
                </p>
                <p className="text-xs text-surface-400 mt-1">
                  Upload a proof to send to the customer for approval
                </p>
                <button className="mt-4 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors">
                  <Upload size={14} />
                  Upload Proof
                </button>
              </div>
            )}
          </div>

          {/* Source file info */}
          <div className="px-5 py-3 border-t border-surface-200 bg-surface-50/50 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-surface-500">
              <FileText size={14} />
              Source: <span className="font-medium text-surface-700">{order.fileName}</span>
              <span className="text-surface-400">({order.fileSize})</span>
            </div>
            <button className="text-xs text-primary-600 font-medium hover:text-primary-700 transition-colors flex items-center gap-1">
              <Download size={12} />
              Download Source
            </button>
          </div>
        </div>

        {/* Right: Comment thread (2/5) */}
        <div className="lg:col-span-2 glass-card flex flex-col overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-surface-200 bg-surface-50/50">
            <MessageSquare size={15} className="text-surface-500" />
            <h2 className="text-sm font-semibold text-surface-700">
              Comments & Notes
            </h2>
          </div>

          {/* Comment list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[500px]">
            {order.proofVersions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-surface-400">
                <MessageSquare size={32} className="mb-2 opacity-30" />
                <p className="text-sm">No comments yet</p>
              </div>
            ) : (
              order.proofVersions.map((proof) =>
                proof.comments.map((comment, cidx) => (
                  <div
                    key={`${proof.id}-${cidx}`}
                    className="flex gap-3 animate-fade-in"
                    style={{ animationDelay: `${cidx * 60}ms` }}
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-surface-200 to-surface-300 flex items-center justify-center text-[10px] font-bold text-surface-600 shrink-0 mt-0.5">
                      {cidx === proof.comments.length - 1 &&
                      proof.status === "approved"
                        ? "C"
                        : "A"}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-semibold text-surface-700">
                          {cidx === proof.comments.length - 1 &&
                          proof.status === "approved"
                            ? order.customerName
                            : "Admin"}
                        </span>
                        <span className="text-[10px] text-surface-400">
                          V{proof.version}
                        </span>
                      </div>
                      <p className="text-sm text-surface-600 bg-surface-50 rounded-xl rounded-tl-none px-3 py-2">
                        {comment}
                      </p>
                    </div>
                  </div>
                ))
              )
            )}
          </div>

          {/* Comment input */}
          <div className="p-4 border-t border-surface-200">
            <div className="flex items-end gap-2">
              <textarea
                rows={2}
                placeholder="Add a comment or note..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl border border-surface-200 text-sm text-surface-800 placeholder:text-surface-400 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 resize-none"
              />
              <button className="p-2.5 rounded-xl bg-primary-600 text-white hover:bg-primary-700 transition-colors shrink-0">
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Order timeline */}
      <div className="glass-card p-5">
        <h2 className="text-sm font-semibold text-surface-700 mb-4">
          Order Timeline
        </h2>
        <div className="space-y-0">
          {[
            {
              label: "Order Created",
              time: order.createdAt,
              done: true,
              icon: FileText,
            },
            {
              label: "Proof Uploaded",
              time:
                order.proofVersions.length > 0
                  ? order.proofVersions[0].uploadedAt
                  : null,
              done: order.proofVersions.length > 0,
              icon: Upload,
            },
            {
              label: "Customer Approved",
              time:
                order.proofVersions.find((p) => p.status === "approved")
                  ?.uploadedAt || null,
              done: order.proofVersions.some((p) => p.status === "approved"),
              icon: CheckCircle2,
            },
            {
              label: "Payment Received",
              time:
                order.paymentStatus === "paid" ? order.updatedAt : null,
              done: order.paymentStatus === "paid",
              icon: CreditCard,
            },
            {
              label: "Printing",
              time:
                order.status === "printing" || order.status === "completed"
                  ? order.updatedAt
                  : null,
              done:
                order.status === "printing" ||
                order.status === "completed",
              icon: Printer,
            },
            {
              label: "Completed",
              time:
                order.status === "completed" ? order.updatedAt : null,
              done: order.status === "completed",
              icon: CheckCircle2,
            },
          ].map((step, idx, arr) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.done
                      ? "bg-primary-100 text-primary-600"
                      : "bg-surface-100 text-surface-400"
                  }`}
                >
                  <step.icon size={14} />
                </div>
                {idx < arr.length - 1 && (
                  <div
                    className={`w-px h-8 ${
                      step.done ? "bg-primary-200" : "bg-surface-200"
                    }`}
                  />
                )}
              </div>
              <div className="pb-4">
                <p
                  className={`text-sm font-medium ${
                    step.done ? "text-surface-800" : "text-surface-400"
                  }`}
                >
                  {step.label}
                </p>
                {step.time && (
                  <p className="text-xs text-surface-400 mt-0.5">
                    {new Date(step.time).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
