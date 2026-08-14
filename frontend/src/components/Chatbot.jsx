import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Send, X, Loader2, Bot, MessageSquare } from 'lucide-react';

export default function Chatbot({ role }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const API = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

  const getMockResponse = (role, msg) => {
    const lowerMsg = msg.toLowerCase();
    if (lowerMsg.includes("roi") || lowerMsg.includes("investment")) {
      return "The project requires a $480K investment over 18 months, generating a $893K net value over 3 years (186% ROI). Payback is achieved at Month 24.";
    }
    if (lowerMsg.includes("freshness") || lowerMsg.includes("lag")) {
      return "Data freshness has improved from 4-8 weeks to under 4 hours, ensuring near real-time insights.";
    }
    if (lowerMsg.includes("error") || lowerMsg.includes("quality")) {
      return "The data error rate is projected to drop from 18% to 2% thanks to the canonical JSON Schema validation and Great Expectations quality engine.";
    }
    if (lowerMsg.includes("dora") || lowerMsg.includes("compliance")) {
      return "DORA compliance is supported through the new continuous compliance monitoring, automated audit trails, and end-of-life technology alerts.";
    }
    
    // Role specific fallbacks
    if (role === 'cio') return "As the CIO, your board-ready EAIMM radar indicates we are targeting Level 5 (Optimised) maturity.";
    if (role === 'cfo') return "As CFO, note that manual FTE hours for EA data collection dropped from 2,400 to 960 hours per year, saving significant consulting rate costs.";
    if (role === 'prog_manager') return "As Programme Manager, the AI-driven impact analysis shows all project-to-application dependencies, avoiding production conflicts.";
    
    return "I am the EA Assistant. The EA repository is now treated as a Data Product powered by Data Mesh principles.";
  };

  const messagesRef = useRef(messages);
  useEffect(() => { messagesRef.current = messages; }, [messages]);

  const sendMessage = async (userMsg) => {
    if (!userMsg) return;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch(`${API}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messagesRef.current, { role: 'user', content: userMsg }],
          context: `User Role: ${role}` 
        })
      });
      if (!res.ok) throw new Error("Backend offline");
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: getMockResponse(role, userMsg) }]);
        setIsLoading(false);
      }, 800);
      return;
    } 
    setIsLoading(false);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const msg = input.trim();
    setInput('');
    await sendMessage(msg);
  };

  useEffect(() => {
    const handleAskAi = (e) => {
      setIsOpen(true);
      sendMessage(e.detail);
    };
    window.addEventListener('custom-ask-ai', handleAskAi);
    return () => window.removeEventListener('custom-ask-ai', handleAskAi);
  }, [role]);

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 p-3 bg-accent text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all z-50 flex items-center justify-center group"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute right-full mr-4 bg-surface text-primary px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border">
            EA AI Assistant
          </span>
        </button>
      )}

      {/* Chat Window */}
      <aside 
        className={`z-50 flex flex-col border border-border bg-surface shadow-2xl transition-all duration-300 ease-in-out overflow-hidden fixed bottom-6 right-6 w-[400px] rounded-2xl
          ${isOpen ? 'h-[600px] opacity-100 translate-y-0' : 'h-0 opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <div className="flex flex-col h-full">
          <div className="border-b border-border bg-background/50 backdrop-blur-md px-5 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg border border-accent/40 bg-accent/10">
                <Sparkles className="h-4 w-4 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-primary">EA Intelligence</h3>
                <p className="text-[10px] text-muted uppercase tracking-wider font-semibold">AI Powered</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-muted hover:bg-accent/10 hover:text-accent transition-colors p-1.5 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-background/30 custom-scrollbar">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-muted px-4 space-y-3">
                <Bot className="w-12 h-12 text-border mb-2" />
                <p className="text-sm font-medium">Ask questions about the Enterprise Architecture, integrations, costs, compliance, or DORA regulations.</p>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-accent text-white rounded-br-none' 
                      : 'bg-surface border border-border text-primary rounded-bl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-surface border border-border rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-2 shadow-sm">
                  <Loader2 className="w-4 h-4 text-accent animate-spin" />
                  <span className="text-xs text-muted">Analyzing context...</span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="p-4 border-t border-border bg-surface shrink-0">
            <div className="relative flex items-center">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask EA Assistant..."
                className="w-full bg-background border border-border rounded-xl pl-4 pr-12 py-3 text-sm text-primary placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all shadow-sm"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-2 p-1.5 bg-accent/10 text-accent hover:bg-accent hover:text-white rounded-lg transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </aside>
    </>
  );
}
