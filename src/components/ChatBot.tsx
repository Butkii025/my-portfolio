"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Bot, LoaderCircle, MessageCircle, Send, X } from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

const welcomeMessage: ChatMessage = {
  role: "assistant",
  text: "Hi! I'm Priyanshu's assistant. Ask me about her projects, skills, or experience.",
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isOpen, isLoading, messages]);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = input.trim();

    if (!text || isLoading) return;

    const nextMessages = [...messages, { role: "user" as const, text }];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-12) }),
      });
      const result: { reply?: string; error?: string } = await response.json();

      if (!response.ok || !result.reply) {
        throw new Error(result.error || "The assistant could not reply. Please try again.");
      }

      setMessages((current) => [...current, { role: "assistant", text: result.reply! }]);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "The assistant could not reply. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen && (
        <section
          aria-label="Portfolio chat"
          className="mb-4 flex h-[min(34rem,calc(100dvh-7rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-2xl shadow-blue-950/20 dark:border-zinc-700 dark:bg-zinc-950"
        >
          <header className="flex items-center justify-between border-b border-blue-100 bg-blue-50/80 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-3">
              <span className="rounded-xl bg-blue-600 p-2 text-white">
                <Bot size={19} aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Vijay's assistant
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Ask about projects and experience
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="rounded-lg p-2 text-zinc-500 transition hover:bg-blue-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </header>

          <div
            aria-live="polite"
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "rounded-br-md bg-blue-600 text-white"
                      : "rounded-bl-md bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
                  }`}
                >
                  {message.text}
                </p>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />
                Thinking…
              </div>
            )}
            {error && (
              <p role="alert" className="text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            )}
            <div ref={endOfMessagesRef} />
          </div>

          <form
            onSubmit={sendMessage}
            className="flex items-center gap-2 border-t border-blue-100 p-3 dark:border-zinc-800"
          >
            <label htmlFor="portfolio-chat-message" className="sr-only">
              Your message
            </label>
            <input
              id="portfolio-chat-message"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              maxLength={1500}
              placeholder="Ask me anything…"
              disabled={isLoading}
              className="min-w-0 flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className="rounded-xl bg-blue-600 p-2.5 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send size={17} aria-hidden="true" />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close portfolio chat" : "Open portfolio chat"}
        aria-expanded={isOpen}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-900/30 transition hover:scale-105 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400/40"
      >
        {isOpen ? (
          <X size={22} aria-hidden="true" />
        ) : (
          <MessageCircle size={23} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
