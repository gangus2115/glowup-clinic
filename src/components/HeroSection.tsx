"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Calendar, ShieldAlert, Sparkles, MessageCircle } from "lucide-react";

import { Spotlight } from "@/components/ui/spotlight";
import { BorderBeam } from "@/components/ui/border-beam";

// Static Interactive Widgets Component
const InteractiveWidgets = ({ onOpenDrawer }: { onOpenDrawer: () => void }) => {
  const widgets = [
    {
      text: "Zaplanowano wizytę: Powiększanie ust (14:30)",
      icon: <Calendar className="w-3 h-3 lg:w-4 lg:h-4 text-stone-700 stroke-[1.5]" />,
      position: "top-[15%] lg:top-[25%] left-[5%]"
    },
    {
      text: "Wykryto przeciwwskazanie. Konsultacja w toku...",
      icon: <ShieldAlert className="w-3 h-3 lg:w-4 lg:h-4 text-stone-700 stroke-[1.5]" />,
      position: "top-[45%] lg:top-[50%] right-[5%]"
    },
    {
      text: "Nowy lead: Wycena wdrożenia",
      icon: <Sparkles className="w-3 h-3 lg:w-4 lg:h-4 text-stone-700 stroke-[1.5]" />,
      position: "bottom-[25%] lg:bottom-[20%] left-[10%] lg:left-[15%]"
    }
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      <style>{`
        @keyframes mobile-icon-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        @media (max-width: 1023px) {
          .mobile-icon-anim {
            animation: mobile-icon-pulse 2.5s ease-in-out infinite;
          }
        }
      `}</style>
      {widgets.map((widget, index) => (
        <motion.div
          key={index}
          onClick={onOpenDrawer}
          whileHover={{ 
            scale: 1.07,
            boxShadow: "0 20px 50px rgba(202, 175, 130, 0.2)"
          }}
          transition={{ duration: 0.3, ease: "circOut" }}
          className={`pointer-events-auto absolute ${widget.position} bg-neutral-50/70 backdrop-blur-xl border border-stone-100 shadow-md rounded-xl lg:rounded-2xl p-2.5 lg:p-4 flex items-center gap-2.5 lg:gap-4 cursor-pointer max-w-[85vw] lg:max-w-none`}
          style={{ WebkitBackdropFilter: "blur(16px)", backgroundColor: "rgba(255, 255, 255, 0.85)" }}
        >
          <div className="mobile-icon-anim bg-white/80 backdrop-blur-md p-1.5 lg:p-2 rounded-full border border-stone-100 shadow-sm shrink-0">
            {widget.icon}
          </div>
          <span className="text-[11px] lg:text-sm font-medium text-stone-800 tracking-wide leading-tight">
            {widget.text}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export function HeroSection() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [greeting, setGreeting] = useState("");
  
  const [hasRunOnce, setHasRunOnce] = useState(false);
  const [messages, setMessages] = useState<{id: string, role: "user"|"assistant", content: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [conversationId, setConversationId] = useState("");

  useEffect(() => {
    // Time-aware greeting
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting("Dzień dobry! Poranna kawa już wypita? W czym mogę pomóc?");
    else if (hour >= 12 && hour < 18) setGreeting("Dzień dobry. Jak mija popołudnie? W czym mogę dzisiaj pomóc?");
    else setGreeting("Dobry wieczór. Nawet po godzinach pracy kliniki jestem tu dla Ciebie. W czym pomóc?");

    // Scroll listener for Mobile Sticky Bar
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isDrawerOpen || !greeting) return;

    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    if (hasRunOnce) {
      // Do nothing, preserving existing messages
    } else {
      setIsTyping(true);
      setMessages([]);

      timeout = setTimeout(() => {
        setIsTyping(false);
        setMessages([{ id: "welcome", role: "assistant", content: "" }]);
        
        let i = 0;
        interval = setInterval(() => {
          setMessages([{ id: "welcome", role: "assistant", content: greeting.slice(0, i + 1) }]);
          i++;
          if (i === greeting.length) {
            clearInterval(interval);
            setHasRunOnce(true);
          }
        }, 15);
      }, 600);
    }

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [isDrawerOpen, hasRunOnce, greeting]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userMessage = { id: Date.now().toString(), role: "user" as const, content: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMessage.content, conversation_id: conversationId })
      });
      
      if (!res.ok) {
        let errorData;
        try {
          errorData = await res.json();
        } catch (err) {
          errorData = await res.text();
        }
        console.error("Backend API Error:", JSON.stringify(errorData, null, 2));
        setMessages((prev) => [...prev, { id: Date.now().toString(), role: "assistant", content: "Przepraszam, wystąpił problem z połączeniem z serwerem." }]);
        setIsTyping(false);
        return;
      }

      if (!res.body) {
        setIsTyping(false);
        return;
      }

      setIsTyping(false);
      const assistantMessageId = Date.now().toString();
      setMessages((prev) => [...prev, { id: assistantMessageId, role: "assistant", content: "" }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() || "";

        for (const part of parts) {
          const lines = part.split("\n");
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const data = JSON.parse(line.slice(6));
                
                if ((data.event === "message" || data.event === "agent_message") && data.answer) {
                  setMessages(prev => prev.map(msg => 
                    msg.id === assistantMessageId ? { ...msg, content: msg.content + data.answer } : msg
                  ));
                }
                
                if (data.conversation_id) {
                  setConversationId(data.conversation_id);
                }
              } catch(e) {}
            }
          }
        }
      }
    } catch (error) {
      console.error("Fetch/TryCatch Error:", error);
      setMessages((prev) => [...prev, { id: Date.now().toString(), role: "assistant", content: "Przepraszam, wystąpił problem z połączeniem." }]);
      setIsTyping(false);
    }
  };

  return (
    <>
      <section className="relative min-h-screen flex flex-col lg:flex-row bg-[#0a0a0a] selection:bg-purple-500/30 overflow-hidden">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#e2d9f3" />
        
        {/* Left Content Area - Sterile & Elegant */}
        <div className="relative z-10 w-full lg:w-[50%] flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-24 lg:py-0 border-r border-white/5">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            {/* Subtle Label */}
            <div className="mb-12 flex items-center gap-4">
              <div className="h-[1px] w-8 bg-stone-700"></div>
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-stone-400">
                GlowUp Beauty
              </span>
            </div>

            {/* Headline - Editorial Feel */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight mb-10 tracking-[-0.03em] leading-[1.05]">
              <span className="bg-gradient-to-br from-white to-white/75 bg-clip-text text-transparent">GlowUp.</span> <br />
              <span className="text-stone-400 italic font-light">Nowy Wymiar Obsługi.</span>
            </h1>

            {/* Paragraph */}
            <p className="text-base md:text-lg text-stone-400 font-light leading-relaxed mb-16 max-w-md tracking-wide">
              Poznaj Weronikę – Twoją Wirtualną Asystentkę. Zobacz, jak interaktywna inteligencja dba o rezerwacje i komfort pacjentów w standardzie premium.
            </p>

            {/* Shimmer CTA Button */}
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="group relative inline-flex items-center justify-center px-8 py-4 font-light tracking-[0.15em] text-sm uppercase text-white bg-stone-900 rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(168,85,247,0.35)]"
            >
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                <div className="relative h-full w-8 bg-white/20" />
              </div>
              <span className="relative z-10 flex items-center gap-3">
                Rozpocznij test
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </motion.div>
        </div>

        {/* Right Area */}
        <div className="relative w-full lg:w-[50%] min-h-[50vh] lg:min-h-screen">
          <InteractiveWidgets onOpenDrawer={() => setIsDrawerOpen(true)} />
        </div>
        
      </section>

      {/* Mobile Sticky Bar - Safe iOS Wrapper */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[9999] pointer-events-none" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <AnimatePresence>
          {(showStickyBar && !isDrawerOpen) && (
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full bg-white/80 backdrop-blur-md border-t border-stone-200/50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] p-4 flex items-center justify-between pointer-events-auto"
              style={{ WebkitBackdropFilter: "blur(16px)", backgroundColor: "rgba(255, 255, 255, 0.95)" }}
            >
              <span className="text-sm font-medium text-stone-800 tracking-wide">Przetestuj Wirtualną Asystentkę</span>
              <button 
                onClick={() => setIsDrawerOpen(true)}
                className="flex items-center justify-center bg-stone-900 text-white rounded-full p-3 shadow-md active:scale-95 transition-transform"
              >
                <MessageCircle className="w-5 h-5 stroke-[1.5]" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Drawer (Hiding via CSS, not unmounting) */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        
        {/* Backdrop */}
        <motion.div
          animate={{ opacity: isDrawerOpen ? 1 : 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsDrawerOpen(false)}
          className={`absolute inset-0 bg-stone-900/10 backdrop-blur-sm ${isDrawerOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        />
        
        {/* Drawer Panel - Frosted Glass */}
        <motion.div
          animate={{ x: isDrawerOpen ? 0 : "100%" }}
          initial={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className={`absolute top-0 right-0 bottom-0 w-full md:w-[450px] bg-white/50 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-l border-white/60 flex flex-col overflow-hidden ${isDrawerOpen ? "pointer-events-auto" : "pointer-events-none"}`}
          style={{ WebkitBackdropFilter: "blur(24px)", backgroundColor: "rgba(255, 255, 255, 0.6)", fontFamily: "'Inter', 'Roboto', ui-sans-serif, system-ui, -apple-system, sans-serif" }}
        >
          <BorderBeam colorFrom="#a855f7" colorTo="#ffffff" duration={12} size={250} />
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-stone-200/50 bg-white/20">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#EAD6C0] to-[#F3E5D8] overflow-hidden flex items-center justify-center shadow-inner border border-white/50">
                  <Sparkles className="w-5 h-5 text-stone-500 stroke-[1.5]" />
                </div>
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-stone-900 font-extralight tracking-wide text-lg">Weronika</span>
                <span className="text-xs text-stone-500 font-light tracking-wide">Asystentka GlowUp (Online)</span>
              </div>
            </div>
            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="p-2 hover:bg-white/40 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-stone-400 stroke-[1.5]" />
            </button>
          </div>
          
          {/* Chat Window */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
            {messages.map((msg) => {
              // Parse markdown links to styled <a> tags and newlines to <br/>
              const formattedContent = msg.content
                .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="font-medium text-stone-900 border-b border-stone-300 hover:border-stone-900 transition-colors">$1</a>')
                .replace(/\n/g, '<br/>');

              return (
                <div key={msg.id} className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`backdrop-blur-2xl border shadow-sm p-5 rounded-3xl min-h-[60px] flex items-center ${
                    msg.role === "user" 
                      ? "bg-stone-900 text-white border-stone-800 rounded-tr-md max-w-[85%]" 
                      : "bg-gradient-to-br from-white/90 to-[#FDFBF7]/90 border-white text-stone-700 rounded-tl-md max-w-[85%]"
                  }`} style={{ WebkitBackdropFilter: "blur(16px)", backgroundColor: msg.role === "user" ? "#1c1917" : "rgba(255, 255, 255, 0.9)", fontSize: "0.9rem", lineHeight: "1.6", letterSpacing: "0em", fontWeight: 400 }}>
                    <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
                  </div>
                </div>
              );
            })}
            
            {isTyping && (
              <div className="flex w-full justify-start">
                <div className="bg-gradient-to-br from-white/90 to-[#FDFBF7]/90 backdrop-blur-2xl border border-white shadow-sm p-5 rounded-3xl rounded-tl-md max-w-[85%] text-stone-700 font-light leading-relaxed text-sm min-h-[60px] flex items-center" style={{ WebkitBackdropFilter: "blur(16px)", backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
                  <div className="flex items-center gap-1.5 px-2">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-stone-400 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-stone-400 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-stone-400 rounded-full" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-stone-200/50 bg-white/30 backdrop-blur-2xl">
            <form onSubmit={handleSendMessage} className="relative">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Napisz wiadomość..." 
                className="w-full bg-white/70 backdrop-blur-2xl border border-white rounded-full py-4 pl-6 pr-14 text-sm font-light text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-300 transition-all placeholder:text-stone-400 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] disabled:bg-white/40 disabled:cursor-not-allowed"
                disabled={isTyping}
              />
              <button 
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-stone-900 rounded-full flex items-center justify-center hover:bg-stone-800 transition-colors shadow-md disabled:bg-stone-300 disabled:cursor-not-allowed"
              >
                <ArrowRight className="w-4 h-4 text-white -rotate-45 stroke-[1.5]" />
              </button>
            </form>
            
            <p className="text-[10px] text-stone-400 mt-4 text-center tracking-wide leading-relaxed">
              Wersja demonstracyjna. Prosimy nie podawać prawdziwych danych medycznych. Zostawiając numer, zgadzasz się na jednorazowy kontakt.
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
