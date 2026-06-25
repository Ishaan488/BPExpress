"use client";

import { useState } from "react";
import {
  Search,
  Send,
  Paperclip,
  Phone,
  MoreVertical,
  Bot,
  User,
  Shield,
  Image,
  FileText,
  SmilePlus,
} from "lucide-react";
import { conversations } from "@/lib/mock-data";

export default function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState(
    conversations[0]?.id || ""
  );
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const currentConversation = conversations.find(
    (c) => c.id === activeConversation
  );

  const filteredConversations = conversations.filter(
    (c) =>
      searchQuery === "" ||
      c.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (days === 1) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      });
    }
  };

  return (
    <div className="h-[calc(100vh-7rem)]">
      <div className="glass-card h-full flex overflow-hidden">
        {/* Left: Conversation list */}
        <div className="w-[340px] border-r border-surface-200 flex flex-col shrink-0">
          {/* Header */}
          <div className="px-4 py-3 border-b border-surface-200">
            <h2 className="text-base font-bold text-surface-800 mb-3">
              Messages
            </h2>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-surface-200 bg-surface-50">
              <Search size={14} className="text-surface-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none text-surface-800 placeholder:text-surface-400"
              />
            </div>
          </div>

          {/* Conversation list */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActiveConversation(conv.id)}
                className={`w-full text-left px-4 py-3.5 border-b border-surface-50 transition-colors flex items-start gap-3 ${
                  activeConversation === conv.id
                    ? "bg-primary-50/60"
                    : "hover:bg-surface-50"
                }`}
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-bold">
                    {conv.customerAvatar}
                  </div>
                  {conv.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full ring-2 ring-white" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-sm font-semibold text-surface-800 truncate">
                      {conv.customerName}
                    </span>
                    <span className="text-[10px] text-surface-400 shrink-0">
                      {formatTime(conv.lastMessageAt)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-surface-500 truncate max-w-[200px]">
                      {conv.lastMessage}
                    </p>
                    {conv.unreadCount > 0 && (
                      <span className="shrink-0 w-5 h-5 rounded-full bg-primary-600 text-white text-[10px] font-bold flex items-center justify-center">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Chat area */}
        {currentConversation ? (
          <div className="flex-1 flex flex-col">
            {/* Chat header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-surface-200 bg-white/50">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-bold">
                    {currentConversation.customerAvatar}
                  </div>
                  {currentConversation.isOnline && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-white" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-surface-800">
                    {currentConversation.customerName}
                  </p>
                  <p className="text-[11px] text-surface-400">
                    {currentConversation.isOnline
                      ? "Online"
                      : `Last seen ${formatTime(currentConversation.lastMessageAt)}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 rounded-lg text-surface-400 hover:bg-surface-100 hover:text-surface-600 transition-colors">
                  <Phone size={16} />
                </button>
                <button className="p-2 rounded-lg text-surface-400 hover:bg-surface-100 hover:text-surface-600 transition-colors">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {currentConversation.messages.map((msg) => {
                const isCustomer = msg.sender === "customer";
                const isBot = msg.sender === "bot";

                return (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2 ${
                      isCustomer ? "justify-start" : "justify-end"
                    } animate-fade-in`}
                  >
                    {isCustomer && (
                      <div className="w-6 h-6 rounded-full bg-surface-200 flex items-center justify-center shrink-0">
                        <User size={12} className="text-surface-500" />
                      </div>
                    )}

                    <div
                      className={`max-w-[65%] ${
                        isCustomer ? "order-1" : "order-0"
                      }`}
                    >
                      {/* Sender label */}
                      <div
                        className={`flex items-center gap-1.5 mb-1 ${
                          isCustomer ? "" : "justify-end"
                        }`}
                      >
                        {isBot && (
                          <Bot size={10} className="text-violet-500" />
                        )}
                        {!isCustomer && !isBot && (
                          <Shield size={10} className="text-primary-500" />
                        )}
                        <span className="text-[10px] font-medium text-surface-400">
                          {msg.senderName}
                        </span>
                      </div>

                      {/* Message bubble */}
                      <div
                        className={`px-4 py-2.5 text-sm leading-relaxed ${
                          isCustomer
                            ? "bg-surface-100 text-surface-800 rounded-2xl rounded-bl-md"
                            : isBot
                            ? "bg-violet-50 text-violet-900 rounded-2xl rounded-br-md border border-violet-100"
                            : "bg-primary-600 text-white rounded-2xl rounded-br-md"
                        }`}
                      >
                        {msg.content}
                        {msg.attachmentUrl && (
                          <div className="mt-2 flex items-center gap-2 px-3 py-2 rounded-lg bg-white/60 border border-surface-200">
                            {msg.attachmentType === "pdf" ? (
                              <FileText size={14} className="text-red-500" />
                            ) : msg.attachmentType === "image" ? (
                              <Image size={14} className="text-blue-500" />
                            ) : (
                              <FileText size={14} className="text-surface-500" />
                            )}
                            <span className="text-xs font-medium text-surface-600 truncate">
                              Attachment
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Timestamp */}
                      <p
                        className={`text-[10px] text-surface-400 mt-1 ${
                          isCustomer ? "" : "text-right"
                        }`}
                      >
                        {new Date(msg.timestamp).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    {!isCustomer && (
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                          isBot
                            ? "bg-violet-100 text-violet-600"
                            : "bg-primary-100 text-primary-600"
                        }`}
                      >
                        {isBot ? <Bot size={12} /> : <Shield size={12} />}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Message input */}
            <div className="px-5 py-3 border-t border-surface-200 bg-white/50">
              <div className="flex items-end gap-3">
                <div className="flex items-center gap-1">
                  <button className="p-2 rounded-lg text-surface-400 hover:bg-surface-100 hover:text-surface-600 transition-colors">
                    <Paperclip size={18} />
                  </button>
                  <button className="p-2 rounded-lg text-surface-400 hover:bg-surface-100 hover:text-surface-600 transition-colors">
                    <SmilePlus size={18} />
                  </button>
                </div>
                <div className="flex-1 flex items-end gap-2 px-4 py-2.5 rounded-2xl border border-surface-200 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-100 transition-all">
                  <textarea
                    rows={1}
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 bg-transparent text-sm text-surface-800 placeholder:text-surface-400 outline-none resize-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        setNewMessage("");
                      }
                    }}
                  />
                </div>
                <button className="p-3 rounded-2xl bg-primary-600 text-white hover:bg-primary-700 transition-colors shrink-0">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-surface-400">
            <p className="text-sm">Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}
