import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Trash2, Sparkles } from 'lucide-react';

const BOT_NAME = "Pavan's AI Core";

// Futuristic Avatar with custom neon styling
const CyberAvatar: React.FC<{ pulsing?: boolean }> = ({ pulsing = false }) => (
  <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-tr from-zinc-950 to-zinc-900 border border-[#e2b96f]/40 shadow-[0_0_10px_rgba(226,185,111,0.15)] overflow-hidden shrink-0">
    <div className={`absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-[#e2b96f]/10 ${pulsing ? 'animate-pulse' : ''}`} />
    <svg className="w-5 h-5 text-[#e2b96f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="7" r="1.5" fill="#e2b96f" className={pulsing ? 'animate-pulse' : ''} />
    </svg>
  </div>
);

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState([
    { sender: BOT_NAME, text: "Interface initialized. I am Pavan's AI Agent. Ask me about his projects, skills, education, or experience." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [learnedFacts, setLearnedFacts] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const clearChat = () => {
    setMessages([
      { sender: BOT_NAME, text: "System reset. Interface ready for input." }
    ]);
  };

  const sendMessage = async (e?: React.FormEvent, customInput?: string) => {
    if (e) e.preventDefault();
    const query = customInput || input;
    if (!query.trim()) return;

    const userMessage = { sender: 'You', text: query };
    setMessages((msgs) => [...msgs, userMessage]);
    
    if (!customInput) {
      setInput('');
    }
    setLoading(true);

    try {
      if (query.startsWith('?/')) {
        const fact = query.slice(2).trim();
        if (fact) {
          setLearnedFacts(prev => [...prev, fact]);
          setMessages(msgs => [...msgs, { sender: BOT_NAME, text: `Fact memorized successfully: "${fact}"` }]);
        }
        setLoading(false);
        return;
      }

      const apiKey = import.meta.env.VITE_OPENAI_API_KEY || (typeof window !== 'undefined' && (window as unknown as { __OPENAI_KEY?: string }).__OPENAI_KEY) || '';
      if (!apiKey) {
        setMessages((msgs) => [...msgs, { sender: BOT_NAME, text: "Interface offline: VITE_OPENAI_API_KEY is not configured in the environment variables." }]);
        setLoading(false);
        return;
      }

      const systemPrompt = `You are a high-end, futuristic AI assistant integrated into Pavan Kumar K M's portfolio.
Your role is to impress recruiters and visitors with short, crisp, and slightly witty/charismatic answers about Pavan.
ABOUT PAVAN:
- Name: Pavan Kumar K M
- Role: AI & Full-Stack Developer
- Location: Mysore, India
- Education: Pursuing Bachelor of Technology (B.Tech) in Computer Science and Engineering (CSE), specializing in Artificial Intelligence and Machine Learning (AI & ML) at the National Institute of Engineering (NIE), Mysore (Batch: 2024 – 2028).
- Email: pavankumarkm@gmail.com
- GitHub: https://github.com/Pavan04pp
- LinkedIn: https://www.linkedin.com/in/pavankumarkm/
- Instagram: Pavan prefers to keep his Instagram personal for close friends, but you can connect with him on LinkedIn or GitHub!

CRITICAL RULES:
1. ONLY discuss Pavan, his skills, education, projects, contact, or professional background.
2. Decline general programming, math, history, or unrelated queries politely but firmly (e.g., "My neural pathways are dedicated solely to Pavan's portfolio. Let's talk about his projects instead!").
3. If asked about questions outside his domain, do not answer them. Decline to prevent wasting API tokens.
4. Keep answers short, highly professional, positive, under 3 sentences, and add a touch of light, polite cyber-banter.
${learnedFacts.length > 0 ? `\nEXTRA CONTEXT:\n` + learnedFacts.map(f => `- ${f}`).join('\n') : ''}`;

      const openAiMessages = [
        { role: 'system', content: systemPrompt },
        ...messages.map(m => ({
          role: m.sender === 'You' ? 'user' : 'assistant',
          content: m.text
        })),
        { role: 'user', content: query }
      ];

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        { 
          model: 'gpt-3.5-turbo',
          messages: openAiMessages,
          max_tokens: 180,
          temperature: 0.5
        },
        { headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' } }
      );
      
      let botReply = 'Access failure. Core intelligence links offline.';
      if (response.data?.choices?.[0]?.message?.content) {
        botReply = response.data.choices[0].message.content.trim();
      }
      setMessages((msgs) => [...msgs, { sender: BOT_NAME, text: botReply }]);
    } catch (err) {
      let errorMsg = 'Oops! Connection failed. Please try again later.';
      if (axios.isAxiosError(err) && err.response?.data?.error?.message) {
        errorMsg = `Error: ${err.response.data.error.message}`;
      } else if (err instanceof Error) {
        errorMsg = `Error: ${err.message}`;
      }
      setMessages((msgs) => [...msgs, { sender: BOT_NAME, text: errorMsg }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestion = (text: string) => {
    sendMessage(undefined, text);
  };

  return (
    <>
      {/* Cybernetic Float Action Button Container */}
      <div className="fixed bottom-6 right-6 z-[100] h-14 w-14">
        {!open && (
          <>
            <div className="chatbot-glow-ring" />
            <div className="chatbot-glow-ring-blur" />
          </>
        )}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setOpen(!open)}
          className={`flex h-full w-full items-center justify-center rounded-full border transition-all ${
            open 
              ? 'bg-zinc-950 border-red-500/40 shadow-red-500/20' 
              : 'bg-zinc-950 border-[#e2b96f]/40 hover:border-[#c084fc]/60'
          }`}
        >
          {open ? (
            <X className="w-5 h-5 text-red-400" />
          ) : (
            <div className="relative flex items-center justify-center w-full h-full">
              <svg className="w-5 h-5 text-[#e2b96f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.166L3.03 21.03a.75.75 0 00.94.94l3.864-1.408A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 11.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM16 11.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM7.5 15.5c1.5 2 5.5 2 7 0" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
          )}
        </motion.button>
      </div>

      {/* Cyberpunk Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            drag
            dragConstraints={{ top: -500, left: -500, right: 20, bottom: 20 }}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="fixed bottom-24 right-6 z-[100] flex w-[360px] flex-col overflow-hidden rounded-2xl border border-[#e2b96f]/20 bg-zinc-950/90 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.8)]"
          >
            {/* Ambient Core Glow */}
            <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#e2b96f]/50 to-transparent" />
            
            {/* Header (Drag Bar) */}
            <div className="flex cursor-grab items-center justify-between border-b border-white/5 bg-zinc-900/40 p-4 active:cursor-grabbing">
              <div className="flex items-center gap-3">
                <CyberAvatar pulsing={loading} />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">{BOT_NAME}</h3>
                    <Sparkles className="w-3.5 h-3.5 text-[#e2b96f] animate-pulse" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Connection Stable</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={clearChat}
                  title="Reset Conversation"
                  className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/5 hover:text-white transition-all"
                >
                  <Trash2 size={14} />
                </button>
                <button 
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/5 hover:text-white transition-all"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Message History Container */}
            <div className="flex h-[360px] flex-col gap-4 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
              {messages.map((msg, i) => {
                const isUser = msg.sender === 'You';
                return (
                  <motion.div 
                    initial={{ opacity: 0, x: isUser ? 10 : -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    key={i} 
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex max-w-[85%] items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                      {isUser ? (
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#c084fc] to-[#e2b96f] text-black shadow-inner">
                          <User size={13} />
                        </div>
                      ) : (
                        <div className="mt-0.5">
                          <CyberAvatar pulsing={false} />
                        </div>
                      )}
                      
                      <div className={`rounded-xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-md ${
                        isUser 
                          ? 'bg-gradient-to-tr from-[#e2b96f] to-[#fb7185] text-zinc-950 font-medium rounded-tr-none'
                          : 'bg-zinc-900/60 border border-white/5 text-zinc-100 rounded-tl-none font-light'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              
              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-xl px-4 py-3 bg-zinc-900/40 border border-white/5 rounded-tl-none">
                    <span className="flex gap-1.5">
                      <motion.span animate={{ scale: [0.6, 1.2, 0.6] }} transition={{ duration: 0.8, repeat: Infinity }} className="h-1.5 w-1.5 rounded-full bg-[#e2b96f]" />
                      <motion.span animate={{ scale: [0.6, 1.2, 0.6] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.25 }} className="h-1.5 w-1.5 rounded-full bg-[#c084fc]" />
                      <motion.span animate={{ scale: [0.6, 1.2, 0.6] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.5 }} className="h-1.5 w-1.5 rounded-full bg-[#fb7185]" />
                    </span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions / Suggested Questions */}
            <div className="px-4 py-2 border-t border-white/5 bg-zinc-950 flex flex-wrap gap-1.5">
              <button 
                onClick={() => handleSuggestion("Who is Pavan?")}
                className="text-[10px] font-mono border border-white/5 hover:border-[#e2b96f]/40 bg-zinc-900/40 hover:bg-[#e2b96f]/5 text-zinc-300 hover:text-white px-2 py-1 rounded-full transition-all"
              >
                💡 Profile
              </button>
              <button 
                onClick={() => handleSuggestion("What are his technical skills?")}
                className="text-[10px] font-mono border border-white/5 hover:border-[#c084fc]/40 bg-zinc-900/40 hover:bg-[#c084fc]/5 text-zinc-300 hover:text-white px-2 py-1 rounded-full transition-all"
              >
                ⚡ Tech Stack
              </button>
              <button 
                onClick={() => handleSuggestion("Show me his featured projects")}
                className="text-[10px] font-mono border border-white/5 hover:border-[#fb7185]/40 bg-zinc-900/40 hover:bg-[#fb7185]/5 text-zinc-300 hover:text-white px-2 py-1 rounded-full transition-all"
              >
                🚀 Projects
              </button>
              <button 
                onClick={() => handleSuggestion("How can I contact Pavan?")}
                className="text-[10px] font-mono border border-white/5 hover:border-[#e2b96f]/40 bg-zinc-900/40 hover:bg-[#e2b96f]/5 text-zinc-300 hover:text-white px-2 py-1 rounded-full transition-all"
              >
                📞 Contact
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={sendMessage} className="border-t border-white/5 bg-zinc-900/30 p-3">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  disabled={loading}
                  placeholder="Query Pavan's AI Core..."
                  className="w-full rounded-full bg-zinc-900 border border-white/5 text-zinc-200 text-xs py-2.5 pl-4 pr-12 focus:outline-none focus:ring-1 focus:ring-[#e2b96f]/40 focus:border-[#e2b96f]/30 placeholder:text-zinc-500"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className={`absolute right-1.5 flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                    input.trim() 
                      ? 'bg-gradient-to-tr from-[#e2b96f] to-[#fb7185] text-black hover:shadow-[0_0_10px_rgba(226,185,111,0.35)]' 
                      : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  }`}
                >
                  <Send size={12} className={input.trim() ? 'ml-0.5' : ''} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;