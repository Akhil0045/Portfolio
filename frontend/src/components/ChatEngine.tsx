import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export function ChatEngine() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>(() => {
        const saved = localStorage.getItem('chat_history');
        return saved ? JSON.parse(saved) : [
            { role: 'assistant', content: "Hi! I'm Akhil's AI assistant. Ask me about his projects, skills, or how to get in touch. How can I help you today?" }
        ];
    });
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOpenChat = () => setIsOpen(true);
        window.addEventListener('open-ai-chat', handleOpenChat);
        return () => window.removeEventListener('open-ai-chat', handleOpenChat);
    }, []);

    useEffect(() => {
        localStorage.setItem('chat_history', JSON.stringify(messages));
    }, [messages]);

    const [sessionId] = useState(() => {
        const saved = localStorage.getItem('chat_session_id');
        if (saved) return saved;
        const newId = Math.random().toString(36).substring(7);
        localStorage.setItem('chat_session_id', newId);
        return newId;
    });

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages((prev: Message[]) => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const backendUrl = (import.meta as { env?: { VITE_BACKEND_URL?: string } }).env?.VITE_BACKEND_URL || 'http://localhost:8000';
            const response = await fetch(`${backendUrl}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    session_id: sessionId,
                    message: userMessage,
                }),
            });

            if (!response.ok) throw new Error('Failed to fetch response');

            const data = await response.json();
            setMessages((prev: Message[]) => [...prev, { role: 'assistant', content: data.response }]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages((prev: Message[]) => [...prev, {
                role: 'assistant',
                content: "Sorry, I'm having trouble connecting right now. Please try again later."
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const clearChat = () => {
        const initialMessage: Message[] = [{ role: 'assistant', content: "Hi! I'm Akhil's AI assistant. Ask me about his projects, skills, or how to get in touch. How can I help you today?" }];
        setMessages(initialMessage);
        localStorage.removeItem('chat_history');
    };

    return (
        <>
            {/* Floating Assistant Button - Bottom Left - HIGHLY VISIBLE on both light and dark backgrounds */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 left-6 z-[60] flex items-center gap-2 px-5 py-4 rounded-2xl shadow-2xl font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${
                    isOpen
                        ? 'bg-gray-200 text-gray-900 hover:bg-gray-100'
                        : 'bg-white text-gray-900 hover:bg-gray-50 border-2 border-gray-200'
                }`}
            >
                {isOpen ? <X size={22} /> : <Bot size={24} />}
                <span>{isOpen ? 'Close' : 'Assistant'}</span>
            </button>

            {/* Left Sidebar Chat Panel */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop - click to close on mobile */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/50 z-[70] md:hidden"
                        />

                        {/* Sidebar */}
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                            className="fixed left-0 top-0 bottom-0 w-full sm:max-w-[420px] bg-gray-950 z-[80] flex flex-col border-r border-gray-800 shadow-2xl"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-800 shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center">
                                        <Bot size={22} className="text-white" />
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-white text-base">Portfolio Assistant</h2>
                                        <p className="text-gray-500 text-xs">Chat freely — no login needed</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={clearChat}
                                        className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                                        title="Clear chat"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Messages - simple scroll with div */}
                            <div className="flex-1 overflow-y-auto overflow-x-hidden">
                                <div className="p-4 space-y-4">
                                    {messages.map((msg, i) => (
                                        <div
                                            key={i}
                                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-2' : ''}`}>
                                                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                                                    msg.role === 'user'
                                                        ? 'bg-gray-700 text-white rounded-br-md'
                                                        : 'bg-gray-800 text-gray-200 rounded-bl-md border border-gray-700'
                                                }`}>
                                                    {msg.content}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div className="px-4 py-3 bg-gray-800 rounded-2xl rounded-bl-md border border-gray-700 flex gap-1.5">
                                                <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" />
                                                <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                                                <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>
                            </div>

                            {/* Input */}
                            <div className="p-4 border-t border-gray-800 shrink-0">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Ask about projects, skills, or contact..."
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                        className="w-full h-12 pl-4 pr-12 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={isLoading || !input.trim()}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-gray-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        <Send size={20} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
