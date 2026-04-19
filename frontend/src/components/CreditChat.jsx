import { api } from '@/lib/utils';
import React, { useState, useRef, useEffect } from 'react';

const SUGGESTED_QUESTIONS = [
  'Why was I declined?',
  'How can I improve my credit score?',
  'What does my revolving utilization mean?',
  'How does my debt ratio affect my application?',
  'What steps can I take to get approved in 6 months?',
];

const TypingIndicator = () => (
  <div className="flex items-end gap-2 mb-4">
    <div className="w-7 h-7 rounded-full bg-violet-600/30 border border-violet-500/40 flex items-center justify-center shrink-0 text-xs">
      ✦
    </div>
    <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-white/[0.05] border border-white/10 flex items-center gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '0ms' }} />
      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '150ms' }} />
      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  </div>
);

const ChatMessage = ({ msg }) => {
  const isUser = msg.role === 'user';
  return (
    <div className={`flex items-end gap-2 mb-4 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold
          ${isUser
            ? 'bg-violet-600 text-white'
            : 'bg-violet-600/30 border border-violet-500/40 text-violet-300'
          }`}
      >
        {isUser ? 'U' : '✦'}
      </div>

      <div
        className={`max-w-[82%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap
          ${isUser
            ? 'rounded-br-sm bg-violet-600/25 border border-violet-500/30 text-white'
            : 'rounded-bl-sm bg-white/[0.05] border border-white/10 text-slate-200'
          }`}
      >
        {msg.content}
      </div>
    </div>
  );
};

const CreditChat = ({ assessment }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hello! I'm Plutus, your AI lending analyst. I've reviewed your credit assessment and I'm here to answer any questions you have about your results, risk factors, or steps you can take to improve your credit standing.\n\nWhat would you like to know?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;

    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const { data } = await api.post('/chat', {
        message: userText,
        borrower_data: assessment.borrower_data ?? {},
        ml_results: assessment.ml_results ?? {},
        report: assessment.report ?? {},
        chat_history: newMessages.slice(0, -1).map((m) => ({
          role: m.role,
          content: m.content,
        })),
      });

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I had trouble connecting to the backend. Please make sure the server is running and try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="mt-8">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full flex items-center justify-between px-6 py-4 rounded-2xl border border-violet-500/30 bg-violet-500/10 hover:bg-violet-500/15 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-violet-600/30 border border-violet-500/40 flex items-center justify-center text-violet-300 text-sm">
              ✦
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-white">Ask Plutus AI</p>
              <p className="text-xs text-slate-400">Follow-up questions about your credit assessment</p>
            </div>
          </div>
          <svg
            className="w-4 h-4 text-violet-400 group-hover:translate-y-[-2px] transition-transform"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}

      {isOpen && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl overflow-hidden shadow-2xl animate-fade-up">

          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-violet-600/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-violet-600/40 border border-violet-500/50 flex items-center justify-center text-violet-300 text-xs animate-pulse-glow">
                ✦
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Plutus AI Chat</p>
                <p className="text-xs text-violet-400">Contextual credit analysis assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors p-1"
              aria-label="Close chat"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <div className="px-6 pt-3 pb-0">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-violet-500/20 bg-violet-500/5 w-fit">
              <span className="text-violet-400 text-xs">🔒</span>
              <span className="text-violet-300 text-xs font-medium">
                Scoped to your credit profile — off-topic questions are blocked
              </span>
            </div>
          </div>

          <div className="h-80 overflow-y-auto px-6 py-4 space-y-0 scroll-smooth">
            {messages.map((msg, i) => (
              <ChatMessage key={i} msg={msg} />
            ))}
            {loading && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          {messages.length === 1 && !loading && (
            <div className="px-6 pb-3 flex flex-wrap gap-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-300 text-xs hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-300 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="px-6 pb-6 pt-2 border-t border-white/10">
            <div className="flex items-end gap-3">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
                }}
                onKeyDown={handleKeyDown}
                placeholder="Ask about your credit score, risk factors, or how to improve..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/30 transition-all resize-none min-h-[44px]"
                style={{ maxHeight: '120px' }}
                disabled={loading}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="w-11 h-11 rounded-xl btn-primary flex items-center justify-center shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                {loading ? (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </div>
            <p className="mt-2 text-xs text-slate-600 text-center">
              Press Enter to send · Shift+Enter for new line
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditChat;
