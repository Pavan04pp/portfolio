import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User } from 'lucide-react';

const BOT_NAME = "Pavan's AI Agent";

const ChatBot: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [messages, setMessages] = useState([
    { sender: BOT_NAME, text: "Hi there! I'm Pavan's AI Agent. I can answer any questions about his skills, education, and portfolio. What would you like to know?" }
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

  const sendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { sender: 'You', text: input };
    setMessages((msgs) => [...msgs, userMessage]);
    setInput('');
    setLoading(true);
    try {
      if (input.startsWith('?/')) {
        const fact = input.slice(2).trim();
        if (fact) {
          setLearnedFacts(prev => [...prev, fact]);
          setMessages(msgs => [...msgs, { sender: BOT_NAME, text: `Got it! I have memorized: "${fact}"` }]);
        }
        setLoading(false);
        return;
      }

      // Do NOT use import.meta.env here because Vite inlines env values at build time
      // which can leak secrets into compiled assets. Instead, read a runtime key that
      // the host can inject into the page (e.g. window.__OPENAI_KEY). If no key is
      // available, respond with a helpful message rather than throwing (so builds
      // remain safe).
      const apiKey = (typeof window !== 'undefined' && (window as unknown as { __OPENAI_KEY?: string }).__OPENAI_KEY) || '';
      if (!apiKey) {
        setMessages((msgs) => [...msgs, { sender: BOT_NAME, text: "The chat feature is currently disabled (no OpenAI API key provided)." }]);
        setLoading(false);
        return;
      }

      const systemPrompt = `You are an exclusive, highly professional AI assistant for Pavan's portfolio website. 
Your ONLY purpose is to answer questions about Pavan, his skills, education, experience, and projects.
CRITICAL RULES:
1. NEVER answer general knowledge, coding help, math, or unrelated questions. 
2. If asked something unrelated, politely decline and steer the conversation back to Pavan. 
3. Keep responses concise, impressive, and friendly. 
4. If asked who created you, say you were integrated to showcase Pavan's tech stack capabilities.
${learnedFacts.length > 0 ? `\nIMPORTANT MEMORIZED FACTS (Use these to answer questions if relevant):\n` + learnedFacts.map(f => `- ${f}`).join('\n') : ''}`;

      const openAiMessages = [
        { role: 'system', content: systemPrompt },
        ...messages.map(m => ({
          role: m.sender === 'You' ? 'user' : 'assistant',
          content: m.text
        })),
        { role: 'user', content: input }
      ];

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        { 
          model: 'gpt-3.5-turbo',
          messages: openAiMessages,
          max_tokens: 200,
          temperature: 0.5
        },
        { headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' } }
      );
      
      let botReply = 'Sorry, I am currently experiencing issues connecting to my brain.';
      if (response.data && response.data.choices && response.data.choices.length > 0) {
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

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all ${
          isLight 
            ? 'bg-gradient-to-tr from-indigo-500 to-cyan-400 shadow-indigo-500/40 hover:shadow-indigo-500/60' 
            : 'bg-gradient-to-tr from-cyan-500 to-violet-600 shadow-cyan-500/40 hover:shadow-cyan-500/60'
        }`}
      >
  {open ? <X color="white" size={24} /> : <img src={`${import.meta.env.BASE_URL}robot-avatar.png`} alt="ChatBot" className="w-full h-full rounded-full object-cover shadow-inner" onError={(e) => { (e.currentTarget as HTMLImageElement).src = `${import.meta.env.BASE_URL}profile-placeholder.png`; }} />}
        {/* Pulse Effect */}
        {!open && (
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-cyan-400 opacity-40"></span>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            drag
            dragConstraints={{ top: -500, left: -500, right: 20, bottom: 20 }}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 250, damping: 25 }}
            className={`fixed bottom-24 right-6 z-[100] flex w-[340px] flex-col overflow-hidden rounded-2xl border shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl ${
              isLight 
                ? 'border-white/40 bg-white/80' 
                : 'border-white/10 bg-gray-900/80'
            }`}
          >
            {/* Header (Drag Handle) */}
            <div className={`flex cursor-grab items-center justify-between border-b p-4 active:cursor-grabbing ${
              isLight ? 'border-gray-200 bg-white/50' : 'border-gray-700 bg-black/40'
            }`}>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full overflow-hidden shadow-sm border border-white/10">
                  <img src={`${import.meta.env.BASE_URL}robot-avatar.png`} alt="Bot" className="w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).src = `${import.meta.env.BASE_URL}profile-placeholder.png`; }} />
                </div>
                <div>
                  <h3 className={`text-sm font-bold ${isLight ? 'text-gray-800' : 'text-white'}`}>{BOT_NAME}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                    <span className="text-xs text-gray-400">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className={`rounded-full p-1 transition-colors ${isLight ? 'hover:bg-gray-200 text-gray-500' : 'hover:bg-gray-800 text-gray-400'}`}>
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex h-[380px] flex-col gap-4 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
              {messages.map((msg, i) => {
                const isUser = msg.sender === 'You';
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={i} 
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex max-w-[85%] items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full overflow-hidden ${
                        isUser 
                          ? (isLight ? 'bg-indigo-500 text-white' : 'bg-violet-600 text-white') 
                          : 'bg-transparent'
                      }`}>
                        {isUser ? <User size={14} /> : <img src={`${import.meta.env.BASE_URL}robot-avatar.png`} alt="Bot" className="w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).src = `${import.meta.env.BASE_URL}profile-placeholder.png`; }} />}
                      </div>
                      <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                        isUser 
                          ? (isLight ? 'bg-indigo-500 text-white rounded-br-sm' : 'bg-violet-600 text-white rounded-br-sm')
                          : (isLight ? 'bg-white text-gray-800 rounded-bl-sm border border-gray-100' : 'bg-gray-800 text-gray-200 rounded-bl-sm border border-gray-700')
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className={`flex items-center gap-2 rounded-2xl px-4 py-3 ${isLight ? 'bg-white border border-gray-100' : 'bg-gray-800 border border-gray-700'} rounded-bl-sm`}>
                    <span className="flex gap-1">
                      <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity }} className={`h-1.5 w-1.5 rounded-full ${isLight ? 'bg-indigo-400' : 'bg-cyan-400'}`} />
                      <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className={`h-1.5 w-1.5 rounded-full ${isLight ? 'bg-indigo-400' : 'bg-cyan-400'}`} />
                      <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} className={`h-1.5 w-1.5 rounded-full ${isLight ? 'bg-indigo-400' : 'bg-cyan-400'}`} />
                    </span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={sendMessage} className={`border-t p-3 ${isLight ? 'border-gray-200 bg-white/50' : 'border-gray-700 bg-black/40'}`}>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  disabled={loading}
                  placeholder="Ask about Pavan..."
                  className={`w-full rounded-full py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 ${
                    isLight 
                      ? 'bg-white text-gray-800 focus:ring-indigo-500/50 placeholder:text-gray-400 border border-gray-200' 
                      : 'bg-gray-800 text-white focus:ring-cyan-500/50 placeholder:text-gray-500 border border-gray-700'
                  }`}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className={`absolute right-1.5 flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                    input.trim() 
                      ? (isLight ? 'bg-indigo-500 text-white hover:bg-indigo-600' : 'bg-cyan-500 text-white hover:bg-cyan-600') 
                      : 'bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-500'
                  }`}
                >
                  <Send size={14} className={input.trim() ? 'ml-0.5' : ''} />
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