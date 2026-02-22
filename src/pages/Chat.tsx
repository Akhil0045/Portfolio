import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, Trash2, Terminal, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import './Chat.css';

// ─── Types ──────────────────────────────────────────────────────────────────

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// ─── Markdown Components ─────────────────────────────────────────────────────

const MarkdownComponents = {
  p: ({ children }: any) => <p>{children}</p>,
  strong: ({ children }: any) => <strong>{children}</strong>,
  ul: ({ children }: any) => <ul>{children}</ul>,
  ol: ({ children }: any) => <ol>{children}</ol>,
  li: ({ children }: any) => <li>{children}</li>,
  code: ({ children }: any) => <code>{children}</code>,
};

// ─── Constants ───────────────────────────────────────────────────────────────

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: "Hey! I'm Akhil's portfolio assistant. Ask me about his projects, skills, or how to get in touch.",
};

const SUGGEST_CHIPS = [
  "What projects has Akhil built?",
  "What are his core skills?",
  "How can I reach him?",
  "Summarize his experience",
];

// ─── Component ───────────────────────────────────────────────────────────────

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const showChips = messages.length <= 1 && !isLoading;

  // Session ID & Expiration Logic
  const [sessionId, setSessionId] = useState('');
  const SESSION_TTL = 60 * 60 * 1000; // 1 hour in ms

  useEffect(() => {
    const savedId = localStorage.getItem('chat_session_id');
    const savedTime = localStorage.getItem('chat_session_timestamp');
    const now = Date.now();

    if (savedId && savedTime && now - parseInt(savedTime) < SESSION_TTL) {
      // Restore valid session
      setSessionId(savedId);
      restoreHistory(savedId);
    } else {
      // New session
      const newId = crypto.randomUUID();
      setSessionId(newId);
      localStorage.setItem('chat_session_id', newId);
      localStorage.setItem('chat_session_timestamp', now.toString());
    }
  }, []);

  const restoreHistory = async (id: string) => {
    const envUrl = (import.meta as any).env?.VITE_BACKEND_URL;
    const baseUrl = (envUrl || 'http://localhost:8000').replace(/\/$/, '');

    try {
      const response = await fetch(`${baseUrl}/chat/history/${id}`);
      if (response.ok) {
        const data = await response.json();
        if (data.history && data.history.length > 0) {
          setMessages([INITIAL_MESSAGE, ...data.history]);
        }
      }
    } catch (error) {
      console.error('Failed to restore history:', error);
    }
  };

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // ─── Send ──────────────────────────────────────────────────────────────────

  const sendMessage = async (text: string) => {
    const userMessage = text.trim();
    if (!userMessage || isLoading) return;

    setInput('');

    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Update session timestamp
    localStorage.setItem('chat_session_timestamp', Date.now().toString());

    const envUrl = (import.meta as any).env?.VITE_BACKEND_URL;
    const baseUrl = (envUrl || 'http://localhost:8000').replace(/\/$/, '');
    const chatUrl = `${baseUrl}/chat`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 90_000);

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
        const errorMsg = Array.isArray(rawDetail)
          ? rawDetail.join(', ')
          : (rawDetail || response.statusText || 'Request failed').toString();
        throw new Error(errorMsg);
      }

      const aiContent = data?.response;

      if (typeof aiContent === 'string') {
        setMessages(prev => [...prev, { role: 'assistant', content: aiContent }]);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      clearTimeout(timeoutId);

      const err = error instanceof Error ? error : new Error('Unknown error');
      const isAbort = err.name === 'AbortError';
      const msg = err.message || "Sorry, I'm having trouble connecting.";
      const isNet = msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('Load failed');

      const displayMsg = isAbort
        ? 'Request timed out. Please try again.'
        : isNet
          ? `Can't reach backend at ${chatUrl}. Make sure it's running.`
          : msg;

      setMessages(prev => [...prev, { role: 'assistant', content: displayMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => sendMessage(input);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  const clearChat = () => {
    setMessages([INITIAL_MESSAGE]);
    localStorage.removeItem('chat_history');
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="chat-root">

      {/* ── HEADER ── */}
      <header className="chat-header">
        <div className="chat-header-inner">

          <Link to="/" className="back-btn">
            <ArrowLeft size={14} strokeWidth={2} />
            <span>Back</span>
          </Link>

          <div className="header-center">
            <div className="header-icon">
              <Terminal size={15} strokeWidth={2} />
            </div>
            <div>
              <div className="header-title">akhil.assistant</div>
              <div className="header-subtitle">
                <span className="status-dot" />
                <span>ready</span>
              </div>
            </div>
          </div>

          <button onClick={clearChat} className="clear-btn" title="Clear chat">
            <Trash2 size={15} strokeWidth={1.5} />
          </button>

        </div>
      </header>

      {/* ── MESSAGES ── */}
      <div className="messages-area">
        <div className="messages-inner">

          <div className="date-divider">session start</div>

          {messages.map((msg, i) => (
            <div key={i} className={`msg-row ${msg.role}`}>
              {msg.role === 'assistant' ? (
                <div className="assistant-block">
                  <div className="assistant-avatar">
                    <Sparkles size={12} strokeWidth={2} />
                  </div>
                  <div className="assistant-content">
                    <ReactMarkdown components={MarkdownComponents}>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ) : (
                <div className="user-bubble">{msg.content}</div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="typing-row">
              <div className="assistant-avatar" style={{ marginTop: 8 }}>
                <Sparkles size={12} strokeWidth={2} />
              </div>
              <div className="typing-bubble">
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion chips — only shown on fresh session */}
        {showChips && (
          <div className="chips-section">
            <div className="chips-label">suggestions</div>
            <div className="chips-row">
              {SUGGEST_CHIPS.map(chip => (
                <button
                  key={chip}
                  className="chip"
                  onClick={() => sendMessage(chip)}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── INPUT ── */}
      <div className="input-area">
        <div className="input-inner">

          <div className="input-box">
            <span className="input-prefix">›</span>
            <textarea
              ref={inputRef}
              className="input-field"
              placeholder="Ask anything about Akhil..."
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <button
              className="send-btn"
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
            >
              <Send size={15} strokeWidth={2.5} />
            </button>
          </div>

          <div className="input-footer">
            <span className="input-hint">no account needed · open access</span>
            <span className="kbd">
              <span>↵</span> send &nbsp;·&nbsp; <span>⇧↵</span> newline
            </span>
          </div>

        </div>
      </div>

    </div>
  );
}