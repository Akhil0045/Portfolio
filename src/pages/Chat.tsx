import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, Bot, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Custom components for Markdown rendering to maintain theme
const MarkdownComponents = {
  p: ({ children }: any) => <p className="mb-2 last:mb-0">{children}</p>,
  strong: ({ children }: any) => <strong className="font-semibold text-white">{children}</strong>,
  ul: ({ children }: any) => <ul className="list-disc ml-4 mb-2 space-y-1">{children}</ul>,
  ol: ({ children }: any) => <ol className="list-decimal ml-4 mb-2 space-y-1">{children}</ol>,
  li: ({ children }: any) => <li className="text-gray-200">{children}</li>,
  code: ({ children }: any) => <code className="bg-gray-800 px-1.5 py-0.5 rounded text-gray-200 font-mono text-sm">{children}</code>,
};

export function Chat() {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('chat_history');
    return saved ? JSON.parse(saved) : [
      { role: 'assistant', content: "Hi! I'm Akhil's AI assistant. Ask me about his projects, skills, or how to get in touch. How can I help you today?" }
    ];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [sessionId] = useState(() => {
    const saved = localStorage.getItem('chat_session_id');
    if (saved) return saved;
    const newId = Math.random().toString(36).substring(7);
    localStorage.setItem('chat_session_id', newId);
    return newId;
  });

  useEffect(() => {
    localStorage.setItem('chat_history', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const envUrl = (import.meta as { env?: { VITE_BACKEND_URL?: string } }).env?.VITE_BACKEND_URL;
    const baseUrl = (envUrl || 'http://localhost:8000').replace(/\/$/, '');
    const chatUrl = `${baseUrl}/chat`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 90000);

    try {
      const response = await fetch(chatUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, message: userMessage }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const rawDetail = data?.detail;
        const errorMsg = Array.isArray(rawDetail) ? rawDetail.join(', ') : (rawDetail || response.statusText || 'Request failed').toString();
        throw new Error(errorMsg);
      }

      const aiContent = data?.response;
      if (typeof aiContent === 'string') {
        setMessages((prev) => [...prev, { role: 'assistant', content: aiContent }]);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      clearTimeout(timeoutId);
      const err = error instanceof Error ? error : new Error('Unknown error');
      const isAbort = err.name === 'AbortError';
      const msg = err.message || "Sorry, I'm having trouble connecting. Please try again later.";
      const isNetworkError = msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('Load failed');
      const displayMsg = isAbort
        ? 'Request timed out. The AI may be slow—please try again.'
        : isNetworkError
          ? `Can't reach the backend at ${chatUrl}. Make sure it's running: cd d:\\portfolio_updated && python -m uvicorn backend.main:app --reload`
          : msg;
      setMessages((prev) => [...prev, { role: 'assistant', content: displayMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{ role: 'assistant', content: "Hi! I'm Akhil's AI assistant. Ask me about his projects, skills, or how to get in touch. How can I help you today?" }]);
    localStorage.removeItem('chat_history');
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Header - matches portfolio theme */}
      <header className="shrink-0 border-b border-gray-800 bg-gray-900/80 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center justify-between gap-6">
            <Link
              to="/"
              className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors py-2 -my-2"
            >
              <ArrowLeft size={20} strokeWidth={2} className="shrink-0" />
              <span className="text-sm font-medium hidden sm:inline">Back</span>
            </Link>

            <div className="flex items-center gap-4 flex-1 justify-center min-w-0">
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Bot size={22} className="text-white" strokeWidth={1.5} />
              </div>
              <div className="min-w-0 text-left">
                <h1 className="font-semibold text-white truncate text-base">Portfolio Assistant</h1>
                <p className="text-xs text-gray-500 truncate mt-0.5">Chat freely — no login needed</p>
              </div>
            </div>

            <button
              onClick={clearChat}
              className="p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 -mr-1"
              title="Clear chat"
            >
              <Trash2 size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Messages - clean, high-contrast dark theme */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-4 sm:space-y-5">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[90%] sm:max-w-[85%] md:max-w-[80%] ${msg.role === 'user' ? 'ml-auto' : ''}`}>
                <div className={`px-4 py-3 rounded-2xl text-sm sm:text-base leading-relaxed ${msg.role === 'user'
                  ? 'bg-gray-600 text-white rounded-br-md shadow-sm'
                  : 'bg-gray-700 text-white rounded-bl-md border border-gray-600 shadow-sm'
                  }`}>
                  {msg.role === 'assistant' ? (
                    <ReactMarkdown components={MarkdownComponents}>
                      {msg.content}
                    </ReactMarkdown>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="px-4 py-3 bg-gray-700 rounded-2xl rounded-bl-md border border-gray-600 flex gap-1.5">
                <span className="w-2 h-2 bg-white/80 rounded-full animate-pulse" />
                <span className="w-2 h-2 bg-white/80 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <span className="w-2 h-2 bg-white/80 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input - clean dark theme */}
      <div className="shrink-0 border-t border-gray-800 bg-gray-900/90 px-4 sm:px-6 py-5 sm:py-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Ask about projects, skills, or how to contact..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSend(); } }}
              className="w-full h-12 sm:h-14 pl-4 sm:pl-5 pr-14 rounded-xl bg-gray-800 border border-gray-600 text-white placeholder-gray-500 text-base focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all flex items-center justify-center"
            >
              <Send size={20} strokeWidth={2} />
            </button>
          </div>
          <p className="text-center text-gray-500 text-xs mt-3">
            Anyone can chat — no sign-up needed
          </p>
        </div>
      </div>
    </div>
  );
}