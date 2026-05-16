"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Calendar, ShieldAlert, Sparkles, MessageCircle } from "lucide-react";

import { Spotlight } from "@/components/ui/spotlight";
import { BorderBeam } from "@/components/ui/border-beam";
import PulsingIcon from "@/components/PulsingIcon";

const CHAT_FONT: React.CSSProperties = {
  fontFamily: "'Inter', 'Roboto', ui-sans-serif, system-ui, sans-serif",
};

// Static Interactive Widgets Component
const InteractiveWidgets = ({ onOpenDrawer }: { onOpenDrawer: () => void }) => {
  const widgets = [
    {
      text: "Zaplanowano wizytę: Powiększanie ust (14:30)",
      icon: <PulsingIcon duration={2.6}><Calendar className="w-3 h-3 lg:w-4 lg:h-4 text-[#C0C0C0] stroke-[1.5]" /></PulsingIcon>,
      position: "top-[15%] lg:top-[25%] left-[5%]",
    },
    {
      text: "Wykryto przeciwwskazanie. Konsultacja w toku...",
      icon: <PulsingIcon duration={3.3}><ShieldAlert className="w-3 h-3 lg:w-4 lg:h-4 text-[#C0C0C0] stroke-[1.5]" /></PulsingIcon>,
      position: "top-[45%] lg:top-[50%] right-[5%]",
    },
    {
      text: "Nowy lead: Wycena wdrożenia",
      icon: <PulsingIcon duration={2.9}><Sparkles className="w-3 h-3 lg:w-4 lg:h-4 text-[#C0C0C0] stroke-[1.5]" /></PulsingIcon>,
      position: "bottom-[25%] lg:bottom-[20%] left-[10%] lg:left-[15%]",
    },
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
            scale: 1.03,
            boxShadow: "0 0 24px rgba(212, 175, 55, 0.12)",
          }}
          transition={{ duration: 0.3, ease: "circOut" }}
          className={`pointer-events-auto absolute ${widget.position} backdrop-blur-md border border-white/10 rounded-xl px-5 py-4 flex items-center gap-2.5 lg:gap-4 cursor-pointer max-w-[85vw] lg:max-w-none`}
          style={{
            WebkitBackdropFilter: "blur(12px)",
            backgroundColor: "rgba(10, 10, 15, 0.70)",
          }}
        >
          <div className="mobile-icon-anim bg-white/10 p-1.5 lg:p-2 rounded-full border border-white/15 shrink-0">
            {widget.icon}
          </div>
          <span
            className="leading-tight"
            style={{
              ...CHAT_FONT,
              fontSize: "0.8rem",
              fontWeight: 500,
              color: "rgba(255,255,255,0.80)",
            }}
          >
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
  const [messages, setMessages] = useState<
    { id: string; role: "user" | "assistant"; content: string }[]
  >([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [conversationId, setConversationId] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12)
      setGreeting("Dzień dobry! Poranna kawa już wypita? W czym mogę pomóc?");
    else if (hour >= 12 && hour < 18)
      setGreeting("Dzień dobry. Jak mija popołudnie? W czym mogę dzisiaj pomóc?");
    else
      setGreeting(
        "Dobry wieczór. Nawet po godzinach pracy kliniki jestem tu dla Ciebie. W czym pomóc?"
      );

    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isDrawerOpen || !greeting) return;

    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    if (hasRunOnce) {
      // preserve existing messages
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

    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: inputValue,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: userMessage.content,
          conversation_id: conversationId,
        }),
      });

      if (!res.ok) {
        let errorData;
        try {
          errorData = await res.json();
        } catch (err) {
          errorData = await res.text();
        }
        console.error("Backend API Error:", JSON.stringify(errorData, null, 2));
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "assistant",
            content: "Przepraszam, wystąpił problem z połączeniem z serwerem.",
          },
        ]);
        setIsTyping(false);
        return;
      }

      if (!res.body) {
        setIsTyping(false);
        return;
      }

      setIsTyping(false);

      const assistantMessageId = Date.now().toString();
      setMessages((prev) => [
        ...prev,
        { id: assistantMessageId, role: "assistant", content: "" },
      ]);

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

                if (
                  (data.event === "message" || data.event === "agent_message") &&
                  data.answer
                ) {
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === assistantMessageId
                        ? { ...msg, content: msg.content + data.answer }
                        : msg
                    )
                  );
                }

                if (data.conversation_id) {
                  setConversationId(data.conversation_id);
                }
              } catch (e) {
                // silently skip malformed SSE chunks
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Fetch/TryCatch Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: "Przepraszam, wystąpił problem z połączeniem.",
        },
      ]);
      setIsTyping(false);
    }
  };

  return (
    <>
      <section className="relative min-h-screen flex flex-col lg:flex-row bg-[#0a0a0f] selection:bg-[#D4AF37]/20 overflow-hidden">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#e2d9f3" />

        {/* Left Content Area */}
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

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight mb-10 tracking-[-0.03em] leading-[1.05]">
              <span className="bg-gradient-to-br from-white to-white/75 bg-clip-text text-transparent">
                GlowUp.
              </span>{" "}
              <br />
              <span className="text-stone-400 italic font-light">Nowy Wymiar Obsługi.</span>
            </h1>

            {/* Paragraph */}
            <p className="text-base md:text-lg text-stone-400 font-light leading-relaxed mb-16 max-w-md tracking-wide">
              Poznaj Weronikę – Twoją Wirtualną Asystentkę. Zobacz, jak interaktywna inteligencja
              dba o rezerwacje i komfort pacjentów w standardzie premium.
            </p>

            {/* CTA Button — gradient border shimmer */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="cta-button"
            >
              <span className="cta-text">Rozpocznij test</span>
              <ArrowRight className="w-4 h-4" style={{ flexShrink: 0, color: "#D4AF37" }} />
            </button>
          </motion.div>
        </div>

        {/* Right Area */}
        <div className="relative w-full lg:w-[50%] min-h-[50vh] lg:min-h-screen">
          <InteractiveWidgets onOpenDrawer={() => setIsDrawerOpen(true)} />
        </div>
      </section>

      {/* Mobile Sticky Bar */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-[9999] pointer-events-none"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <AnimatePresence>
          {showStickyBar && !isDrawerOpen && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] p-4 flex items-center justify-between pointer-events-auto backdrop-blur-md"
              style={{ WebkitBackdropFilter: "blur(16px)", backgroundColor: "rgba(10,10,15,0.90)" }}
            >
              <span
                className="text-sm font-medium tracking-wide"
                style={{ ...CHAT_FONT, color: "rgba(255,255,255,0.85)" }}
              >
                Przetestuj Wirtualną Asystentkę
              </span>
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="flex items-center justify-center bg-[#D4AF37]/80 text-[#0a0a0f] rounded-full p-3 shadow-md active:scale-95 transition-transform"
              >
                <MessageCircle className="w-5 h-5 stroke-[1.5]" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Drawer */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        {/* Backdrop */}
        <motion.div
          animate={{ opacity: isDrawerOpen ? 1 : 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsDrawerOpen(false)}
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm ${isDrawerOpen ? "pointer-events-auto" : "pointer-events-none"
            }`}
        />

        {/* Drawer Panel — dark glassmorphism */}
        <motion.div
          animate={{ x: isDrawerOpen ? 0 : "100%" }}
          initial={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className={`absolute top-0 right-0 bottom-0 w-full md:w-[450px] backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-l border-white/10 flex flex-col overflow-hidden ${isDrawerOpen ? "pointer-events-auto" : "pointer-events-none"
            }`}
          style={{
            WebkitBackdropFilter: "blur(24px)",
            backgroundColor: "rgba(10, 10, 15, 0.88)",
            ...CHAT_FONT,
          }}
        >
          <BorderBeam colorFrom="#D4AF37" colorTo="#C0C0C0" duration={12} size={250} />

          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#1a1406] to-[#2d2410] overflow-hidden flex items-center justify-center shadow-inner border border-[#D4AF37]/20">
                  <Sparkles className="w-5 h-5 text-[#D4AF37]/60 stroke-[1.5]" />
                </div>
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#0a0a0f] rounded-full"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-extralight tracking-wide text-lg text-white/90">
                  Weronika
                </span>
                <span
                  className="text-xs font-light tracking-wide"
                  style={{ color: "rgba(255,255,255,0.40)" }}
                >
                  Asystentka GlowUp (Online)
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5 stroke-[1.5]" style={{ color: "rgba(255,255,255,0.40)" }} />
            </button>
          </div>

          {/* Chat Window */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
            {messages.map((msg) => {
              const formattedContent = msg.content
                .replace(
                  /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
                  '<a href="$2" target="_blank" rel="noopener noreferrer" class="font-medium text-[#D4AF37] border-b border-[#D4AF37]/30 hover:border-[#D4AF37] transition-colors">$1</a>'
                )
                .replace(/\n/g, "<br/>");

              return (
                <div
                  key={msg.id}
                  className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                >
                  <div
                    className={`rounded-xl px-4 py-3 min-h-[52px] flex items-center max-w-[85%] ${
                      msg.role === "user"
                        ? "bg-[#D4AF37]/15 border border-[#D4AF37]/20 text-white/90 rounded-tr-sm"
                        : "bg-white/5 border border-white/10 text-white/80 rounded-tl-sm"
                    }`}
                    style={{
                      fontSize: "0.9rem",
                      lineHeight: "1.6",
                      letterSpacing: "0em",
                      fontWeight: 400,
                    }}
                  >
                    <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex w-full justify-start">
                <div
                  className="bg-white/5 border border-white/10 text-white/80 rounded-xl rounded-tl-sm px-4 py-3 max-w-[85%] min-h-[52px] flex items-center"
                >
                  <div className="flex items-center gap-1.5 px-2">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                      className="w-1.5 h-1.5 bg-white/40 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                      className="w-1.5 h-1.5 bg-white/40 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                      className="w-1.5 h-1.5 bg-white/40 rounded-full"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-white/10 bg-black/20 backdrop-blur-2xl">
            <form onSubmit={handleSendMessage} className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Napisz wiadomość..."
                className="w-full backdrop-blur-2xl border border-white/10 rounded-full py-4 pl-6 pr-14 text-sm font-light focus:outline-none focus:ring-1 focus:ring-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  ...CHAT_FONT,
                  backgroundColor: "rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.90)",
                  caretColor: "rgba(255,255,255,0.90)",
                }}
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#D4AF37]/70 rounded-full flex items-center justify-center hover:bg-[#D4AF37]/90 transition-colors shadow-md disabled:bg-white/10 disabled:cursor-not-allowed"
              >
                <ArrowRight className="w-4 h-4 text-white -rotate-45 stroke-[1.5]" />
              </button>
            </form>

            <p
              className="mt-4 text-center tracking-wide leading-relaxed"
              style={{
                ...CHAT_FONT,
                fontSize: "0.625rem",
                color: "rgba(255,255,255,0.30)",
              }}
            >
              Wersja demonstracyjna. Prosimy nie podawać prawdziwych danych medycznych. Zostawiając
              numer, zgadzasz się na jednorazowy kontakt.
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}