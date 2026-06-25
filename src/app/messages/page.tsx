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
    <div className="h-[calc(100vh-7.5rem)] animate-fade-in">
      <div className="glass-card h-full flex overflow-hidden">
        {/* Left: Conversation list */}
        <div className="w-[320px] md:w-[340px] border-r border-surface-border flex flex-col shrink-0">
          {/* Header */}
          <div className="px-5 py-4 border-b border-surface-border bg-surface-50/20">
            <h2 className="text-sm font-bold text-surface-900 uppercase tracking-wider mb-3">
              Messages
            </h2>
            <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl border border-surface-border bg-surface-100 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/10 focus-within:bg-surface-0 transition-all">
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
          <div className="flex-1 overflow-y-auto divide-y divide-surface-border/40">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActiveConversation(conv.id)}
                className={`w-full text-left px-5 py-4 transition-all flex items-start gap-3.5 cursor-pointer ${
                  activeConversation === conv.id
                    ? "bg-primary-500/5 dark:bg-primary-500/10 border-l-2 border-primary-500 pl-[18px]"
                    : "hover:bg-surface-100/50"
                }`}
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    {conv.customerAvatar}
                  </div>
                  {conv.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-surface-0" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-surface-800 truncate">
                      {conv.customerName}
                    </span>
                    <span className="text-[10px] text-surface-400 font-semibold shrink-0">
                      {formatTime(conv.lastMessageAt)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-surface-500 truncate max-w-[170px] font-medium">
                      {conv.lastMessage}
                    </p>
                    {conv.unreadCount > 0 && (
                      <span className="shrink-0 w-4.5 h-4.5 rounded-full bg-primary-500 text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
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
          <div className="flex-1 flex flex-col min-w-0 bg-surface-50/30">
            {/* Chat header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-surface-border bg-surface-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    {currentConversation.customerAvatar}
                  </div>
                  {currentConversation.isOnline && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-surface-0" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-surface-800">
                    {currentConversation.customerName}
                  </p>
                  <p className="text-[10px] text-surface-400 font-semibold mt-0.5">
                    {currentConversation.isOnline
                      ? "Online"
                      : `Last seen ${formatTime(currentConversation.lastMessageAt)}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button className="p-2 rounded-lg text-surface-400 hover:bg-surface-100 hover:text-surface-600 transition-colors cursor-pointer">
                  <Phone size={16} />
                </button>
                <button className="p-2 rounded-lg text-surface-400 hover:bg-surface-100 hover:text-surface-600 transition-colors cursor-pointer">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {currentConversation.messages.map((msg) => {
                const isCustomer = msg.sender === "customer";
                const isBot = msg.sender === "bot";

                return (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2.5 ${
                      isCustomer ? "justify-start" : "justify-end"
                    } animate-fade-in`}
                  >
                    {isCustomer && (
                      <div className="w-6 h-6 rounded-lg bg-surface-100 border border-surface-border flex items-center justify-center shrink-0 mb-5">
                        <User size={12} className="text-surface-400" />
                      </div>
                    )}

                    <div
                      className={`max-w-[65%] ${
                        isCustomer ? "order-1" : "order-0"
                      }`}
                    >
                      {/* Sender label */}
                      <div
                        className={`flex items-center gap-1.5 mb-1.5 ${
                          isCustomer ? "" : "justify-end"
                        }`}
                      >
                        {isBot && (
                          <Bot size={11} className="text-violet-500" />
                        )}
                        {!isCustomer && !isBot && (
                          <Shield size={11} className="text-primary-500" />
                        )}
                        <span className="text-[10px] font-bold text-surface-400 uppercase tracking-wider">
                          {msg.senderName}
                        </span>
                      </div>

                      {/* Message bubble */}
                      <div
                        className={`px-4 py-3 text-sm leading-relaxed border ${
                          isCustomer
                            ? "bg-surface-100 text-surface-800 border-surface-border/50 rounded-2xl rounded-bl-md"
                            : isBot
                            ? "bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-500/15 rounded-2xl rounded-br-md"
                            : "bg-primary-500 text-white border-primary-500 rounded-2xl rounded-br-md font-medium"
                        }`}
                      >
                        {msg.content}
                        {msg.attachmentUrl && (
                          <div className="mt-2.5 flex items-center gap-2.5 px-3 py-2 rounded-lg bg-surface-0 border border-surface-border shadow-sm">
                            {msg.attachmentType === "pdf" ? (
                              <FileText size={14} className="text-red-500" />
                            ) : msg.attachmentType === "image" ? (
                              <Image size={14} className="text-blue-500" />
                            ) : (
                              <FileText size={14} className="text-surface-400" />
                            )}
                            <span className="text-xs font-semibold text-surface-700 truncate">
                              Attachment
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Timestamp */}
                      <p
                        className={`text-[10px] text-surface-400 font-semibold mt-1.5 ${
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
                        className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mb-5 border ${
                          isBot
                            ? "bg-violet-500/10 text-violet-500 border-violet-500/20"
                            : "bg-primary-500/10 text-primary-500 border-primary-500/20"
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
            <div className="px-6 py-4 border-t border-surface-border bg-surface-0">
              <div className="flex items-end gap-3">
                <div className="flex items-center gap-1">
                  <button className="p-2.5 rounded-xl text-surface-400 hover:bg-surface-100 hover:text-surface-600 transition-colors cursor-pointer">
                    <Paperclip size={18} />
                  </button>
                  <button className="p-2.5 rounded-xl text-surface-400 hover:bg-surface-100 hover:text-surface-600 transition-colors cursor-pointer">
                    <SmilePlus size={18} />
                  </button>
                </div>
                <div className="flex-1 flex items-end gap-2.5 px-4 py-2.5 rounded-2xl border border-surface-border bg-surface-50 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/10 focus-within:bg-surface-0 transition-all">
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
                <button className="p-3 rounded-2xl bg-primary-500 text-white hover:bg-primary-600 transition-colors shrink-0 shadow-sm cursor-pointer">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-surface-400 bg-surface-50/10">
            <p className="text-sm font-semibold">Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}
