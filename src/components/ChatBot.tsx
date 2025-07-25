import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const BOT_NAME = "Pavan's Agent";
const HF_MODEL = 'microsoft/DialoGPT-small';

const ChatBot: React.FC = () => {
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
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      let botReply = '';
      if (response.data && response.data.error) {
        botReply = `Error: ${response.data.error}`;
      } else if (response.data && response.data.generated_text) {
        botReply = response.data.generated_text.trim();
      } else if (Array.isArray(response.data) && response.data[0]?.generated_text) {
        botReply = response.data[0].generated_text.trim();
      } else {
        botReply = 'Sorry, I could not get a response. Please try again later.';
      }
      setMessages((msgs) => [...msgs, { sender: BOT_NAME, text: botReply }]);
    } catch (err: any) {
      let errorMsg = 'Sorry, I could not get a response. Please try again later.';
      if (err.response && err.response.data && err.response.data.error) {
        errorMsg = `Error: ${err.response.data.error}`;
      } else if (err.message) {
        errorMsg = `Error: ${err.message}`;
      }
      setMessages((msgs) => [...msgs, { sender: BOT_NAME, text: errorMsg }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Floating Button */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-red-500 hover:bg-red-600 text-white rounded-full p-4 shadow-lg focus:outline-none"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chat bot"
      >
        💬
      </button>
      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-80 max-w-full bg-white dark:bg-gray-900 rounded-lg shadow-2xl flex flex-col border border-gray-200 dark:border-gray-700">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-red-500 text-white rounded-t-lg font-bold flex items-center justify-between">
            {BOT_NAME}
            <button onClick={() => setOpen(false)} className="text-white hover:text-gray-200 text-lg font-bold">×</button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2" style={{ maxHeight: 350 }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-3 py-2 rounded-lg text-sm ${msg.sender === 'You' ? 'bg-red-100 dark:bg-red-700 text-black dark:text-white' : 'bg-gray-200 dark:bg-gray-800 text-black dark:text-white'}`}>
                  <b>{msg.sender}:</b> {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={sendMessage} className="flex border-t border-gray-200 dark:border-gray-700">
            <input
              type="text"
              className="flex-1 px-3 py-2 rounded-bl-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white focus:outline-none"
              placeholder="Type your question..."
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={loading}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) sendMessage(e as any); }}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-br-lg disabled:opacity-50"
              disabled={loading}
            >
              {loading ? '...' : 'Send'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot; 