'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, X, MessageCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setMessages([initialMessage]);
    }, 300);
  };

  const initialMessage = {
    role: 'bot',
    text: (
      <span>
        Hi! I am Abhaya's AI Assistant. Ask me about Abhaya's projects, skills and experience

        {/* Cold Start Warning Block */}
        <span className="block mt-2 mb-2 p-2 bg-amber-50 border border-amber-100 rounded text-amber-700 text-xs font-medium">
          Note: The first reply might take 60-90 seconds due to server cold start (Render free tier).
        </span>

        {/* Disclaimer Footer */}
        <span className="text-xs text-slate-400 italic">
          (AI-generated content. Please{' '}
          <Link onClick={handleClose} href="/contact" className="underline text-slate-500 hover:text-blue-600">
            verify with Abhaya
          </Link>
          {' '})
        </span>
      </span>
    )
  };

  const [messages, setMessages] = useState([initialMessage]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleOpenEvent = () => setIsOpen(true);

    // Listen for the custom event
    window.addEventListener('openChatBot', handleOpenEvent);

    // Cleanup when component unmounts
    return () => window.removeEventListener('openChatBot', handleOpenEvent);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Handle Close & Clear


  const handleSend = async () => {
    if (!query.trim()) return;

    const newMessages = [...messages, { role: 'user', text: query }];
    setMessages(newMessages);
    setQuery('');
    setLoading(true);

    try {
      // Toggle URL for Prod/Dev
      const API_URL = 'https://halfdigit-api.onrender.com/chat-about-me';
      //const API_URL = 'http://localhost:8000/chat-about-me';

      const urlParams = new URLSearchParams(window.location.search);
      const source = urlParams.get('utm_source') || 'portfolio_direct';

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query })
      });
      const data = await res.json();

      setMessages(prev => [...prev, { role: 'bot', text: data.answer }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Sorry, I am having trouble connecting to the server.' }]);
    }
    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-none">

      {/* --- CHAT WINDOW --- */}
      <div
        className={`
          pointer-events-auto bg-white w-[calc(100vw-2rem] sm:w-[380px] rounded-2xl shadow-2xl border border-slate-200 overflow-hidden mb-4 transition-all duration-300 origin-bottom-right
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 h-0'}
        `}
      >
        {/* Header */}
        <div className="bg-blue-600 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-blue-500 to-purple-500 p-2 rounded-lg">
              <Image
                src="/icon.svg"
                alt="AI Icon"
                width={20}
                height={20}
                className="w-5 h-5" // Ensures it stays the same size as the old icon
              />            </div>
            <div>
              <h3 className="text-white font-bold text-sm flex items-center gap-1">
                Abhaya's AI
              </h3>
              <p className="text-blue-100 text-[11px] leading-tight">Ask me about Abhaya's projects, skills and experience </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="cursor-pointer text-white/90 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="h-[50vh] sm:h-[400px] overflow-y-auto p-4 space-y-4 bg-slate-50 scrollbar-thin scrollbar-thumb-slate-200">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                ? 'bg-blue-600 text-white rounded-br-none'
                : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none'
                }`}>
                {typeof msg.text === 'string' ? (

                  <ReactMarkdown
                    components={{
                      // Custom styling for Markdown elements to look good in Tailwind
                      strong: ({ node, ...props }) => <span className="font-bold" {...props} />,
                      a: ({ node, ...props }) => <a className="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noopener noreferrer" {...props} />,
                      ul: ({ node, ...props }) => <ul className="list-disc pl-4 space-y-1 my-2" {...props} />,
                      ol: ({ node, ...props }) => <ol className="list-decimal pl-4 space-y-1 my-2" {...props} />,
                      li: ({ node, ...props }) => <li className="pl-1" {...props} />,
                      p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />
                    }}
                  >{msg.text}</ReactMarkdown>) : (msg.text)}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="e.g. What certifications has Abhaya done?..."
            className="flex-1 text-sm px-4 py-2.5 bg-slate-100 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className={`
              p-2.5 rounded-full transition-all duration-200
              ${query.trim()
                ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:scale-105'
                : 'bg-slate-100 text-slate-300 cursor-not-allowed'
              }
            `}
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* --- FLOATING TOGGLE BUTTON --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          cursor-pointer pointer-events-auto shadow-xl transition-all duration-300 flex items-center justify-center gap-2 font-medium
          ${isOpen
            ? 'w-12 h-12 rounded-full bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
            : 'px-6 py-3.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'
          }
        `}
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <>
            <MessageCircle size={20} className="text-white " />
            <span >Chat with Abhaya's AI</span>
          </>
        )}
      </button>
    </div>
  );
}