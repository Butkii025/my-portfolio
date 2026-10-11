"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ExternalLink,
  LoaderCircle,
  RotateCcw,
  Send,
  Sparkles,
  X,
} from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

const INITIAL_WELCOME: ChatMessage = {
  role: "assistant",
  text: "Hello! Ask me about Priyanshu's ML models, projects, or experience.",
};

const QUICK_CHIPS = [
  { label: "Skills", query: "What are your core skills & tech stack?" },
  { label: "Projects", query: "Tell me about your top deployed projects with live links" },
  { label: "Experience", query: "What is your work experience & hackathons?" },
  { label: "Research", query: "Tell me about your Nifty 50 volatility research" },
  { label: "Credentials", query: "What certifications and credentials do you hold?" },
  { label: "Contact", query: "How can I contact you or view your profiles?" },
];

/**
 * Format markdown bold, bullets, inline code, and clickable hyperlinks [Text](url or #hash)
 */
function FormattedMessage({
  content,
  onNavigateSection,
}: {
  content: string;
  onNavigateSection: (sectionId: string) => void;
}) {
  const linkRegex = /\[([^\]]+)\]\(((?:https?:\/\/[^\s)]+)|(?:#[a-zA-Z0-9_-]+))\)/g;
  const lines = content.split("\n");

  return (
    <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
      {lines.map((line, lineIdx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={lineIdx} className="h-1.5" />;
        }

        const isBullet = trimmed.startsWith("* ") || trimmed.startsWith("- ") || trimmed.startsWith("• ");
        const textContent = isBullet ? trimmed.slice(2) : trimmed;

        const parts: (string | React.ReactNode)[] = [];
        let lastIndex = 0;
        let match: RegExpExecArray | null;

        linkRegex.lastIndex = 0;
        while ((match = linkRegex.exec(textContent)) !== null) {
          if (match.index > lastIndex) {
            parts.push(textContent.substring(lastIndex, match.index));
          }
          const label = match[1];
          const href = match[2];
          const isSectionAnchor = href.startsWith("#");

          if (isSectionAnchor) {
            parts.push(
              <button
                key={`${lineIdx}-${match.index}`}
                type="button"
                onClick={() => onNavigateSection(href)}
                className="inline-flex items-center gap-1 font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 underline underline-offset-2 transition-colors cursor-pointer dark:bg-white/5 bg-blue-50 px-2 py-0.5 rounded-lg border dark:border-white/10 border-blue-200/60 text-[11px] sm:text-xs"
              >
                <span>{label}</span>
                <span className="text-[10px] opacity-70">↓</span>
              </button>,
            );
          } else {
            parts.push(
              <a
                key={`${lineIdx}-${match.index}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 underline underline-offset-2 transition-colors break-all"
              >
                <span>{label}</span>
                <ExternalLink size={11} className="inline opacity-80" />
              </a>,
            );
          }
          lastIndex = match.index + match[0].length;
        }

        if (lastIndex < textContent.length) {
          parts.push(textContent.substring(lastIndex));
        }

        const formattedParts = parts.map((part, pIdx) => {
          if (typeof part !== "string") return part;

          const boldSegments = part.split(/(\*\*[^*]+\*\*)/g);
          return boldSegments.map((seg, sIdx) => {
            if (seg.startsWith("**") && seg.endsWith("**")) {
              return (
                <strong key={`${pIdx}-${sIdx}`} className="font-semibold text-zinc-950 dark:text-white">
                  {seg.slice(2, -2)}
                </strong>
              );
            }
            return seg;
          });
        });

        if (isBullet) {
          return (
            <div key={lineIdx} className="flex items-start gap-2 pl-1">
              <span className="text-blue-500 font-bold select-none text-xs leading-5">•</span>
              <div className="flex-1">{formattedParts}</div>
            </div>
          );
        }

        return <p key={lineIdx}>{formattedParts}</p>;
      })}
    </div>
  );
}

const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 1500;

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_WELCOME]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [limitReached, setLimitReached] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isOpen, isLoading, messages]);

  const handleClear = () => {
    setMessages([INITIAL_WELCOME]);
    setError("");
    setLimitReached(false);
    setInput("");
  };

  const handleSendQuery = async (queryText: string) => {
    const text = queryText.trim().slice(0, MAX_MESSAGE_LENGTH);
    if (!text || isLoading) return;

    // Check if session messages reached limit
    if (messages.length >= MAX_MESSAGES) {
      setLimitReached(true);
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: "Message limit reached for this session (12 messages). Please refresh the conversation to continue asking questions.",
        },
      ]);
      return;
    }

    const nextMessages = [...messages, { role: "user" as const, text }];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const result: { reply?: string; error?: string; limitReached?: boolean } = await response.json();

      if (!response.ok || !result.reply) {
        throw new Error(result.error || "The assistant could not reply. Please try again.");
      }

      setMessages((current) => [...current, { role: "assistant", text: result.reply! }]);

      if (result.limitReached || nextMessages.length + 1 >= MAX_MESSAGES) {
        setLimitReached(true);
      }
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "The assistant could not reply. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleSendQuery(input);
  }

  function scrollToSection(sectionId: string) {
    const target = document.querySelector(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    if (window.innerWidth < 640) {
      setIsOpen(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[60]">
      {isOpen && (
        <section
          aria-label="Portfolio chat"
          className="mb-3.5 flex h-[min(35rem,calc(100dvh-6.5rem))] w-[calc(100vw-2.5rem)] sm:w-[25rem] md:w-[26rem] max-w-full flex-col overflow-hidden rounded-3xl border border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-black/90 backdrop-blur-xl shadow-2xl shadow-blue-500/10 dark:shadow-black/70 text-zinc-900 dark:text-zinc-100 transition-all duration-300 animate-in fade-in zoom-in-95"
        >
          {/* Header */}
          <header className="flex items-center justify-between border-b border-zinc-200/80 dark:border-white/10 bg-zinc-50/80 dark:bg-zinc-900/40 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 overflow-hidden shrink-0">
                <Image
                  src="/favicon.ico"
                  alt="Priyanshu Logo"
                  width={22}
                  height={22}
                  className="rounded-full object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white tracking-wide">
                    Priyanshu's Assistant
                  </h2>
                  <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                </div>
                <div className="mt-0.5 flex flex-wrap items-center gap-1 text-[10px] font-mono tracking-tight text-zinc-500 dark:text-zinc-400">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">AI/ML Engineer</span>
                  <span className="opacity-40">•</span>
                  <span>Data Analyst</span>
                  <span className="opacity-40">•</span>
                  <span className="italic text-zinc-400 dark:text-zinc-500">Artist</span>
                </div>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClear}
                title="Reset chat"
                aria-label="Reset chat"
                className="rounded-xl p-2 text-zinc-400 hover:text-zinc-800 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 transition duration-200"
              >
                <RotateCcw size={14} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                aria-label="Close chat"
                className="rounded-xl p-2 text-zinc-400 hover:text-zinc-800 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 transition duration-200"
              >
                <X size={16} />
              </button>
            </div>
          </header>

          {/* Messages Feed */}
          <div
            aria-live="polite"
            className="flex-1 space-y-3.5 overflow-y-auto px-4 py-4 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-800 scrollbar-track-transparent"
          >
            {messages.map((message, index) => {
              const isUser = message.role === "user";
              return (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex ${isUser ? "justify-end" : "justify-start gap-2.5"}`}
                >
                  {!isUser && (
                    <div className="mt-1 flex-shrink-0 h-6 w-6 rounded-full bg-zinc-100 dark:bg-white/10 border border-zinc-200 dark:border-white/10 overflow-hidden flex items-center justify-center">
                      <Image
                        src="/favicon.ico"
                        alt="Bot"
                        width={16}
                        height={16}
                        className="object-contain"
                      />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm ${isUser
                      ? "rounded-br-sm bg-zinc-900 dark:bg-white text-white dark:text-black font-medium shadow-sm"
                      : "rounded-bl-sm border border-zinc-200/90 dark:border-white/10 bg-zinc-50 dark:bg-white/5 text-zinc-800 dark:text-zinc-200"
                      }`}
                  >
                    {isUser ? (
                      <p className="whitespace-pre-wrap">{message.text}</p>
                    ) : (
                      <FormattedMessage
                        content={message.text}
                        onNavigateSection={scrollToSection}
                      />
                    )}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 pl-8.5 py-1">
                <LoaderCircle size={14} className="animate-spin text-blue-500" />
                <span>Thinking…</span>
              </div>
            )}

            {error && (
              <div className="rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 p-2.5 text-xs text-red-600 dark:text-red-400">
                {error}
              </div>
            )}
            <div ref={endOfMessagesRef} />
          </div>

          {/* Quick Reply Chips Bar */}
          <div className="border-t border-zinc-200/80 dark:border-white/10 bg-zinc-50/50 dark:bg-zinc-900/20 px-3.5 py-2">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scrollbar-none pb-0.5">
              {QUICK_CHIPS.map((chip, i) => (
                <button
                  key={i}
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleSendQuery(chip.query)}
                  className="whitespace-nowrap rounded-full border border-zinc-200 dark:border-white/15 bg-white dark:bg-white/5 px-3 py-1 text-[11px] font-medium text-zinc-600 dark:text-zinc-300 transition duration-200 hover:border-blue-400 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 hover:scale-[1.02] disabled:opacity-50"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input Footer or Limit Banner */}
          {limitReached ? (
            <div className="flex items-center justify-between gap-3 border-t border-zinc-200/80 dark:border-white/10 bg-zinc-50 dark:bg-zinc-950 p-3">
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Message limit reached ({MAX_MESSAGES} msgs)
              </span>
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 dark:bg-white px-3 py-1.5 text-xs font-medium text-white dark:text-black transition duration-200 hover:bg-zinc-800 dark:hover:bg-zinc-200"
              >
                <RotateCcw size={12} />
                <span>Refresh Chat</span>
              </button>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="flex items-center gap-2 border-t border-zinc-200/80 dark:border-white/10 bg-white dark:bg-zinc-950 p-2.5"
            >
              <label htmlFor="portfolio-chat-message" className="sr-only">
                Your message
              </label>
              <input
                id="portfolio-chat-message"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                maxLength={MAX_MESSAGE_LENGTH}
                placeholder="Ask anything about Priyanshu…"
                disabled={isLoading}
                className="min-w-0 flex-1 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 px-3.5 py-2 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
                className="rounded-xl bg-zinc-900 dark:bg-white p-2.5 text-white dark:text-black transition duration-200 hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send size={14} />
              </button>
            </form>
          )}
        </section>
      )}

      {/* Floating Launcher Button */}
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close portfolio chat" : "Open portfolio chat"}
        aria-expanded={isOpen}
        className="group relative ml-auto flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-zinc-200 dark:border-white/15 bg-white dark:bg-black text-zinc-900 dark:text-white shadow-xl shadow-blue-500/10 hover:border-blue-400/60 hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400/30"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-500 border-2 border-white dark:border-black" />
        </span>
        {isOpen ? (
          <X size={20} className="transition group-hover:rotate-90 duration-200 text-zinc-700 dark:text-zinc-300" />
        ) : (
          <div className="relative flex items-center justify-center">
            <Image
              src="/favicon.ico"
              alt="Bot"
              width={26}
              height={26}
              className="rounded-full object-contain"
            />
          </div>
        )}
      </button>
    </div>
  );
}
