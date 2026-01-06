"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Sparkles, User, Briefcase, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

type Message = {
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
};

const SUGGESTED_ACTIONS = [
    { label: "Find Jobs", icon: <Search size={14} />, prompt: "Help me find a job" },
    { label: "Post a Job", icon: <Briefcase size={14} />, prompt: "How do I post a job?" },
    { label: "Career Advice", icon: <Sparkles size={14} />, prompt: "Give me some career advice" },
];

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "Hi! I'm your Next Hire assistant. How can I help you today?",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async (content: string) => {
        if (!content.trim() || isLoading) return;

        const userMessage: Message = { role: "user", content, timestamp: new Date() };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map(({ role, content }) => ({
                        role,
                        content,
                    })),
                }),
            });

            const data = await response.json();

            if (data.reply) {
                setMessages((prev) => [
                    ...prev,
                    { role: "assistant", content: data.reply, timestamp: new Date() },
                ]);
            } else {
                const errorMessage = data.error || "Sorry, I encountered an error. Please check your API key.";
                setMessages((prev) => [
                    ...prev,
                    { role: "assistant", content: errorMessage, timestamp: new Date() },
                ]);
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Sorry, something went wrong. Please check if your API Key is configured.", timestamp: new Date() },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 group"
                    >
                        <MessageCircle size={20} className="group-hover:animate-pulse" />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-zinc-900"></span>
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.9 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] max-h-[85vh] flex flex-col bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden font-sans"
                    >
                        {/* Header */}
                        <div className="relative p-4 bg-gradient-to-r from-blue-600 to-indigo-600 shrink-0">
                            <div className="absolute inset-0 bg-white/10 backdrop-blur-md"></div>
                            <div className="relative flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/20 rounded-xl shadow-inner border border-white/20">
                                        <Bot className="text-white w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg tracking-tight">Next Hire AI</h3>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.6)]"></span>
                                            <p className="text-blue-100 text-xs font-medium">Online & Ready</p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50 dark:bg-zinc-950/50 scroll-smooth">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user"
                                        ? "bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-slate-300"
                                        : "bg-gradient-to-br from-blue-500 to-indigo-600 text-white"
                                        }`}>
                                        {msg.role === "user" ? <User size={14} /> : <Bot size={16} />}
                                    </div>

                                    <div className={`flex flex-col max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                                        <div
                                            className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === "user"
                                                ? "bg-blue-600 text-white rounded-tr-none"
                                                : "bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-slate-200 rounded-tl-none"
                                                }`}
                                        >
                                            <div className={`prose prose-sm max-w-none ${msg.role === "user" ? "prose-invert" : "dark:prose-invert"}`}>
                                                <ReactMarkdown
                                                    components={{
                                                        p: ({ children }) => <p className="mb-0 last:mb-0">{children}</p>,
                                                        ul: ({ children }) => <ul className="mb-0 list-disc pl-4">{children}</ul>,
                                                        ol: ({ children }) => <ol className="mb-0 list-decimal pl-4">{children}</ol>,
                                                    }}
                                                >
                                                    {msg.content}
                                                </ReactMarkdown>
                                            </div>
                                        </div>
                                        <span className="text-[10px] text-slate-400 mt-1 px-1">
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}

                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex gap-3"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shrink-0">
                                        <Bot size={16} />
                                    </div>
                                    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1 items-center h-[46px]">
                                        <motion.span className="w-1.5 h-1.5 bg-blue-500 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                                        <motion.span className="w-1.5 h-1.5 bg-blue-500 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                                        <motion.span className="w-1.5 h-1.5 bg-blue-500 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white dark:bg-zinc-900 border-t border-slate-200 dark:border-zinc-800 shrink-0">
                            {messages.length === 1 && (
                                <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide mb-2">
                                    {SUGGESTED_ACTIONS.map((action, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleSend(action.prompt)}
                                            className="flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors border border-blue-100 dark:border-blue-800"
                                        >
                                            {action.icon}
                                            {action.label}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSend(input);
                                }}
                                className="flex items-center gap-2 bg-slate-100 dark:bg-zinc-800/50 p-1.5 rounded-[24px] border border-transparent focus-within:border-blue-500/50 focus-within:bg-white dark:focus-within:bg-zinc-900 transition-all shadow-inner"
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask anything..."
                                    className="flex-1 bg-transparent px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all disabled:opacity-50 disabled:scale-95 shadow-md"
                                >
                                    <Send size={16} className={input.trim() ? "translate-x-0.5" : ""} />
                                </button>
                            </form>
                            <p className="text-[10px] text-center text-slate-400 mt-2">
                                AI can make mistakes. Check important info.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
