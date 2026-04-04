import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

const BOT_NAME = "Pavan's Agent";
const HF_MODEL = 'microsoft/DialoGPT-small';

const ChatBot: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [messages, setMessages] = useState([
    { sender: BOT_NAME, text: 'Hi! I am Pavan\'s Agent. Ask me anything about education or Pavan!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
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
      const apiKey = import.meta.env.VITE_HF_API_KEY;
      const response = await axios.post(
        `https://api-inference.huggingface.co/models/${HF_MODEL}`,
        { inputs: input },
        { headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' } }
      );
      let botReply = '';
      if (response.data && response.data.error) botReply = `Error: ${response.data.error}`;
      else if (response.data && response.data.generated_text) botReply = response.data.generated_text.trim();
      else if (Array.isArray(response.data) && response.data[0]?.generated_text) botReply = response.data[0].generated_text.trim();
      else botReply = 'Sorry, I could not get a response. Please try again later.';
      setMessages((msgs) => [...msgs, { sender: BOT_NAME, text: botReply }]);
    } catch (err: any) {
      let errorMsg = 'Sorry, I could not get a response. Please try again later.';
      if (err.response?.data?.error) errorMsg = `Error: ${err.response.data.error}`;
      else if (err.message) errorMsg = `Error: ${err.message}`;
      setMessages((msgs) => [...msgs, { sender: BOT_NAME, text: errorMsg }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className={`fixed bottom-6 right-6 z-50 rounded-full p-4 shadow-lg focus:outline-none transition-all ${isLight
          ? 'bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] hover:shadow-[0_8px_25px_rgba(79,70,229,0.35)]'
          : 'bg-gradient-to-r from-cyan-500 to-violet-600 hover:shadow-cyan-500/40'}`}
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chat bot"
        style={{ color: '#FFFFFF' }}
      >💬</button>

      {open && (
        <div className={`fixed bottom-20 right-6 z-50 w-80 max-w-full rounded-2xl shadow-2xl flex flex-col ${isLight
          ? 'bg-white border border-[#CBD5E1]'
          : 'bg-gray-900 border border-gray-700'}`}>
          <div className={`p-3 border-b rounded-t-2xl font-bold flex items-center justify-between ${isLight
            ? 'border-[#CBD5E1] bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]'
            : 'border-gray-700 bg-gradient-to-r from-cyan-500 to-violet-600'}`}
            style={{ color: '#FFFFFF' }}>
            {BOT_NAME}
            <button onClick={() => setOpen(false)} className="hover:opacity-80 text-lg font-bold" style={{ color: '#FFFFFF' }}>×</button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2" style={{ maxHeight: 350 }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-3 py-2 rounded-xl text-sm ${msg.sender === 'You'
                  ? (isLight ? 'bg-[#E8EEFF] text-[#0D1B3E]' : 'bg-cyan-900/30 text-white')
                  : (isLight ? 'bg-[#F0F4FF] text-[#0D1B3E]' : 'bg-gray-800 text-white')}`}>
                  <b>{msg.sender}:</b> {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={sendMessage} className={`flex border-t ${isLight ? 'border-[#CBD5E1]' : 'border-gray-700'}`}>
            <input type="text"
              className={`flex-1 px-3 py-2 rounded-bl-2xl focus:outline-none ${isLight
                ? 'bg-[#F0F4FF] text-[#0D1B3E] placeholder:text-[#94A3B8]'
                : 'bg-gray-800 text-white placeholder:text-gray-500'}`}
              placeholder="Type your question..." value={input} onChange={e => setInput(e.target.value)}
              disabled={loading} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) sendMessage(e as any); }} />
            <button type="submit"
              className={`px-4 py-2 rounded-br-2xl disabled:opacity-50 transition-all ${isLight
                ? 'bg-gradient-to-r from-[#4F46E5] to-[#06B6D4]'
                : 'bg-gradient-to-r from-cyan-500 to-violet-600'}`}
              disabled={loading} style={{ color: '#FFFFFF' }}>
              {loading ? '...' : 'Send'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;