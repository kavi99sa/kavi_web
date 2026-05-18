import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  Phone,
  Workflow,
  Brain,
  Shield,
  Wrench,
  Rocket,
  Network,
  Plus,
  Minus,
  Clock,
  Sparkles,
  Zap,
  Send,
  X,
  CheckCircle2,
  TrendingUp,
  Users,
  Award,
  Target,
  Layers,
  GitBranch,
  Mail,
  Calendar,
  Database,
  MapPin,
  Linkedin,
  CheckCheck,
} from 'lucide-react';

// =====================================================
// BOOKING MODAL TRIGGER (Global Event Helper)
// =====================================================
const openBookingModal = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('kavi:openBooking'));
  }
};

const openChatWidget = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('kavi:openChat'));
  }
};

// =====================================================
// FONT LOADER & GLOBAL STYLES
// =====================================================
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Manrope:wght@300;400;500;600;700;800&display=swap');

    :root {
      --font-display: 'Fraunces', 'Times New Roman', serif;
      --font-body: 'Manrope', system-ui, sans-serif;
      --bg-deep: #0a0a09;
      --bg-surface: #131312;
      --bg-elevated: #1c1c1a;
      --emerald: #34d399;
      --emerald-bright: #6ee7b7;
      --amber: #fcd34d;
      --amber-warm: #fbbf24;
      --text-primary: #fafaf9;
      --text-secondary: #a1a1aa;
      --text-muted: #71717a;
      --border-subtle: rgba(255,255,255,0.08);
      --border-emerald: rgba(52,211,153,0.2);
    }

    html { scroll-behavior: smooth; }
    body { font-family: var(--font-body); background: var(--bg-deep); color: var(--text-primary); }

    .font-display { font-family: var(--font-display); font-feature-settings: "ss01", "ss02"; }
    .font-body { font-family: var(--font-body); }

    /* Subtle film grain */
    .grain::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E");
      opacity: 0.04;
      pointer-events: none;
      mix-blend-mode: overlay;
    }

    /* Animations */
    @keyframes glow-pulse {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(1.05); }
    }
    .glow { animation: glow-pulse 5s ease-in-out infinite; }

    @keyframes reveal {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .reveal { animation: reveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
    .reveal-d1 { animation-delay: 0.1s; }
    .reveal-d2 { animation-delay: 0.2s; }
    .reveal-d3 { animation-delay: 0.3s; }
    .reveal-d4 { animation-delay: 0.4s; }
    .reveal-d5 { animation-delay: 0.5s; }

    @keyframes float-node {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }
    .float-1 { animation: float-node 6s ease-in-out infinite; }
    .float-2 { animation: float-node 7s ease-in-out infinite 1s; }
    .float-3 { animation: float-node 8s ease-in-out infinite 2s; }
    .float-4 { animation: float-node 6.5s ease-in-out infinite 0.5s; }

    @keyframes pulse-line {
      0%, 100% { opacity: 0.2; }
      50% { opacity: 0.6; }
    }
    .pulse-line { animation: pulse-line 3s ease-in-out infinite; }

    @keyframes data-flow {
      from { stroke-dashoffset: 20; }
      to { stroke-dashoffset: 0; }
    }
    .data-flow { animation: data-flow 2s linear infinite; }

    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .spin-slow { animation: spin-slow 30s linear infinite; }

    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
    .blink { animation: blink 1.2s steps(1) infinite; }

    /* WhatsApp mockup animations */
    @keyframes fade-up {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-up {
      animation: fade-up 0.5s ease-out forwards;
      opacity: 0;
    }

    @keyframes typing-dot {
      0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
      30% { opacity: 1; transform: translateY(-3px); }
    }
    .typing-dot { animation: typing-dot 1.4s ease-in-out infinite; }

    /* Underline draw effect */
    .draw-underline {
      background-image: linear-gradient(currentColor, currentColor);
      background-size: 0% 1px;
      background-repeat: no-repeat;
      background-position: 0 100%;
      transition: background-size 0.4s ease;
    }
    .draw-underline:hover { background-size: 100% 1px; }

    /* Custom scrollbar */
    ::-webkit-scrollbar { width: 10px; }
    ::-webkit-scrollbar-track { background: var(--bg-deep); }
    ::-webkit-scrollbar-thumb { background: #262624; border-radius: 10px; }
    ::-webkit-scrollbar-thumb:hover { background: #3f3f3a; }

    /* Selection */
    ::selection { background: var(--emerald); color: black; }
  `}</style>
);

// =====================================================
// SCROLL REVEAL HOOK
// =====================================================
const useReveal = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
};

// =====================================================
// REUSABLE ATOMS
// =====================================================
const ChapterMark = ({ part, title, color = 'emerald' }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className={`h-px w-8 ${color === 'amber' ? 'bg-amber-300' : 'bg-emerald-400'}`} />
    <span className={`text-[10px] uppercase tracking-[0.4em] ${color === 'amber' ? 'text-amber-300' : 'text-emerald-400'}`}>
      {part}
    </span>
    <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">— {title}</span>
  </div>
);

// =====================================================
// NAVIGATION
// =====================================================
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11">
            <div className="absolute inset-0 rounded-full bg-emerald-400 group-hover:bg-emerald-300 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-black font-bold font-display text-lg">K</span>
            </div>
          </div>
          <div className="leading-tight">
            <div className="font-display text-xl md:text-[22px] font-medium tracking-tight">Kavi Automation</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mt-0.5">AI Systems Studio</div>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#work" className="hover:text-white transition-colors">Work</a>
          <a href="#method" className="hover:text-white transition-colors">Method</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
        </div>

        <button
          onClick={openBookingModal}
          className="text-sm px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black font-medium rounded-full transition-all hover:scale-105"
        >
          Free Audit
        </button>
      </div>
    </nav>
  );
};

// =====================================================
// WORKFLOW VISUALIZATION (Hero)
// =====================================================
const conversations = [
  {
    industry: 'E-commerce',
    industryEmoji: '🛍️',
    industryColor: 'emerald',
    messages: [
      { role: 'customer', text: 'Hi! Do you have black t-shirts in size M? 👕', time: '11:43 PM', delay: 0.3 },
      { role: 'ai', text: 'Yes! We have 3 styles available 🎽', time: '11:43 PM', delay: 1.1 },
      { role: 'ai', text: 'Want to see photos and prices?', time: '11:43 PM', delay: 1.9 },
      { role: 'customer', text: 'Yes please!', time: '11:44 PM', delay: 2.7 },
    ],
  },
  {
    industry: 'Salon Booking',
    industryEmoji: '✂️',
    industryColor: 'amber',
    messages: [
      { role: 'customer', text: 'Can I book a haircut tomorrow? 💇‍♀️', time: '2:15 PM', delay: 0.3 },
      { role: 'ai', text: 'Of course! Available: 11 AM, 2:30 PM, 5 PM 🗓️', time: '2:15 PM', delay: 1.1 },
      { role: 'customer', text: '2:30 works perfectly', time: '2:16 PM', delay: 2.0 },
      { role: 'ai', text: 'Booked! Confirmation sent ✓', time: '2:16 PM', delay: 2.8 },
    ],
  },
  {
    industry: 'Real Estate',
    industryEmoji: '🏠',
    industryColor: 'emerald',
    messages: [
      { role: 'customer', text: 'Is the 2BR apartment still available? 🏡', time: '9:02 AM', delay: 0.3 },
      { role: 'ai', text: 'Yes! €650/month, free from May 15 💶', time: '9:02 AM', delay: 1.1 },
      { role: 'ai', text: 'Want to schedule a viewing this week?', time: '9:02 AM', delay: 1.9 },
      { role: 'customer', text: 'Friday afternoon works 👍', time: '9:03 AM', delay: 2.7 },
    ],
  },
  {
    industry: 'B2B Inquiry',
    industryEmoji: '🤝',
    industryColor: 'amber',
    messages: [
      { role: 'customer', text: 'Interested in automation services 🤝', time: '4:30 PM', delay: 0.3 },
      { role: 'ai', text: 'Great! What\'s your main workflow challenge?', time: '4:30 PM', delay: 1.1 },
      { role: 'customer', text: 'Lead outreach eats 10+ hrs/day', time: '4:31 PM', delay: 2.0 },
      { role: 'ai', text: 'Perfect fit. Routing to founder 📞', time: '4:31 PM', delay: 2.8 },
    ],
  },
];

const WhatsAppMockup = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIdx((idx) => (idx + 1) % conversations.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const current = conversations[activeIdx];
  const badgeStyles = current.industryColor === 'amber'
    ? 'bg-amber-300 text-black shadow-amber-300/30'
    : 'bg-emerald-400 text-black shadow-emerald-400/30';

  return (
    <div
      className="relative w-full max-w-[340px] mx-auto hidden lg:block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient glow */}
      <div className="absolute -inset-12 bg-emerald-400/10 blur-3xl rounded-full -z-10" />

      {/* Floating industry badge — top right */}
      <div
        className={`absolute -top-3 -right-3 z-30 px-3.5 py-2 rounded-2xl shadow-xl text-xs font-medium flex items-center gap-1.5 transform rotate-6 transition-all duration-500 ${badgeStyles}`}
        key={`badge-${activeIdx}`}
      >
        <span>{current.industryEmoji}</span>
        {current.industry}
      </div>

      {/* Phone frame */}
      <div className="relative bg-zinc-900 rounded-[2.5rem] p-2.5 shadow-2xl shadow-black/50 border border-zinc-800 transform rotate-3 hover:rotate-0 transition-transform duration-700">
        {/* Notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-2xl z-10" />

        {/* Screen */}
        <div className="relative bg-gradient-to-b from-zinc-950 to-zinc-900 rounded-[2rem] overflow-hidden">
          {/* WhatsApp header */}
          <div className="bg-[#075E54] px-3.5 pt-8 pb-3 flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-emerald-400 flex items-center justify-center font-display font-bold text-black text-sm flex-shrink-0">
              K
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm font-semibold truncate">Kavi AI Assistant</div>
              <div className="flex items-center gap-1.5 text-emerald-200/80 text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                online · typing...
              </div>
            </div>
            <Phone className="w-4 h-4 text-white/80 flex-shrink-0" />
          </div>

          {/* Chat area — key forces full re-render on slide change */}
          <div
            key={activeIdx}
            className="bg-[#0b141a] px-3 py-3.5 space-y-2 h-[380px] overflow-hidden"
          >
            {/* Date stamp */}
            <div className="flex justify-center">
              <div className="bg-[#1f2c33] rounded-md px-3 py-1 text-[10px] text-white/60">Today</div>
            </div>

            {/* Messages */}
            {current.messages.map((msg, i) => (
              <div
                key={i}
                className={`flex animate-fade-up ${
                  msg.role === 'customer' ? 'justify-end' : 'justify-start'
                }`}
                style={{ animationDelay: `${msg.delay}s` }}
              >
                <div
                  className={`rounded-lg px-3 py-2 max-w-[82%] ${
                    msg.role === 'customer'
                      ? 'bg-[#005c4b] rounded-tr-none'
                      : 'bg-[#202c33] rounded-tl-none'
                  }`}
                >
                  <p className="text-white text-[12.5px] leading-snug">{msg.text}</p>
                  <div
                    className={`text-[9px] mt-1 flex items-center gap-1 ${
                      msg.role === 'customer'
                        ? 'justify-end text-emerald-200/60'
                        : 'text-white/40'
                    }`}
                  >
                    {msg.time}
                    {msg.role === 'customer' && <CheckCheck className="w-2.5 h-2.5 text-blue-400" />}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            <div className="flex justify-start animate-fade-up" style={{ animationDelay: '3.4s' }}>
              <div className="bg-[#202c33] rounded-lg rounded-tl-none px-3 py-2.5">
                <div className="flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60 typing-dot" />
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-white/60 typing-dot"
                    style={{ animationDelay: '0.2s' }}
                  />
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-white/60 typing-dot"
                    style={{ animationDelay: '0.4s' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating response time badge — bottom left */}
      <div className="absolute -bottom-4 -left-4 z-20 px-4 py-2.5 bg-zinc-900 border border-emerald-400/30 rounded-2xl shadow-xl shadow-black/50 transform -rotate-3">
        <div className="font-display text-2xl text-emerald-400 font-medium leading-none">3s</div>
        <div className="text-white/60 text-[9px] uppercase tracking-wider mt-1">Avg response</div>
      </div>

      {/* Slide indicators */}
      <div className="mt-10 flex justify-center gap-2">
        {conversations.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === activeIdx
                ? 'w-8 bg-emerald-400'
                : 'w-1.5 bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Show conversation ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// =====================================================
// HERO
// =====================================================
const Hero = () => (
  <section className="relative min-h-screen flex items-center pt-28 pb-4 overflow-hidden grain">
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl glow" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-emerald-400/5 rounded-full blur-3xl glow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-amber-400/3 rounded-full blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
    </div>

    <div className="max-w-7xl mx-auto px-6 lg:px-12 relative w-full">
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <div className="reveal flex items-center gap-2 mb-8 text-sm text-white/60">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="tracking-[0.2em] uppercase text-xs">Now booking — May 2026</span>
          </div>

          <h1 className="reveal reveal-d1 font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight">
            Every conversation
            <br />
            can become <em className="italic text-emerald-400 font-light">revenue.</em>
            <br />
            Every missed
            <br />
            message can mean
            <br />
            <span className="text-white/40">a lost customer.</span>
          </h1>

          <p className="reveal reveal-d2 mt-8 text-lg md:text-xl text-white/70 max-w-xl leading-relaxed">
            Confused about where to start with AI automation? Chat with Kavi AI and get a personalized
            roadmap for your business — WhatsApp, chat, CRM, bookings, and follow-ups. In 5 minutes. Free.
          </p>
          <p className="reveal reveal-d2 mt-3 text-sm text-emerald-400/80 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            No email required. No credit card. Chat now.
          </p>

          <div className="reveal reveal-d3 mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={openChatWidget}
              className="group inline-flex items-center gap-3 px-7 py-4 bg-emerald-400 hover:bg-emerald-300 text-black font-medium rounded-full transition-all hover:scale-105"
            >
              <MessageCircle className="w-5 h-5" />
              Chat with Kavi AI
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={openBookingModal}
              className="group inline-flex items-center gap-2 px-7 py-4 border border-white/20 hover:border-emerald-400 text-white/80 hover:text-emerald-400 rounded-full transition-all"
            >
              Book Free Audit
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

          <div className="reveal reveal-d4 mt-10">
            <div className="text-xs uppercase tracking-[0.3em] text-white/30 mb-4">
              Built with the tools your business already trusts
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 font-display italic text-white/60 text-sm md:text-base">
              <span>Google Workspace</span>
              <span className="text-white/20">·</span>
              <span>Airtable</span>
              <span className="text-white/20">·</span>
              <span>n8n</span>
              <span className="text-white/20">·</span>
              <span>OpenAI</span>
              <span className="text-white/20">·</span>
              <span>Gemini</span>
              <span className="text-white/20">·</span>
              <span>WhatsApp API</span>
              <span className="text-white/20">·</span>
              <span>Telegram</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 reveal reveal-d3 flex items-center justify-center">
          <WhatsAppMockup />
        </div>
      </div>
    </div>
  </section>
);

// =====================================================
// PAIN SECTION (Act 1: The Problem)
// =====================================================
const PainScenario = ({ time, mood, title, body, delay }) => {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`group relative pl-8 border-l border-white/10 transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="absolute -left-2 top-2 w-3.5 h-3.5 rounded-full bg-zinc-700 group-hover:bg-amber-400/60 transition-colors" />
      <div className="flex items-center gap-3 mb-3 text-xs uppercase tracking-[0.25em] text-white/40">
        <span>{time}</span>
        <span>·</span>
        <span className="text-amber-400/70">{mood}</span>
      </div>
      <h3 className="font-display text-2xl md:text-3xl text-white/90 mb-3 leading-tight">{title}</h3>
      <p className="text-white/60 leading-relaxed text-base md:text-lg max-w-xl">{body}</p>
    </div>
  );
};

const PainSection = () => (
  <section className="relative pt-4 pb-20 md:pt-6 md:pb-28 bg-gradient-to-b from-black via-zinc-950 to-black">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="max-w-3xl mb-14">
        <ChapterMark part="Pt. 01" title="The Problem" color="amber" />
        <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-white">
          You know AI{' '}
          <em className="italic text-white/50">will help.</em>
          <br />
          You just don't know where to start.
        </h2>
        <p className="mt-6 text-lg text-white/50 max-w-xl leading-relaxed">
          Every business owner faces the same confusion. Here's what it sounds like.
        </p>
      </div>

      <div className="space-y-12 md:space-y-16 max-w-3xl mx-auto">
        <PainScenario
          time="2:47 PM"
          mood="Overwhelmed"
          title="I know AI can help. I just don't know where."
          body="You've watched 20 YouTube tutorials. Bookmarked 15 tools. Read about ChatGPT, n8n, Zapier, Make. Everyone's selling something. Nothing tells you what's right for YOUR business."
          delay={0}
        />
        <PainScenario
          time="11:18 AM"
          mood="Decision Fatigue"
          title="Three consultants. Three prices. Three plans."
          body="One says €500. One says €5,000. One says 'it depends.' You don't know who to trust. So you wait. Another month passes. Your competitors don't."
          delay={100}
        />
        <PainScenario
          time="8:32 PM"
          mood="Doubting"
          title="What if I invest in the wrong thing?"
          body="The fear isn't the money. It's wasting time on a system that won't move the needle. You need clarity. Not another sales pitch."
          delay={200}
        />
        <PainScenario
          time="Every Week"
          mood="Drowning"
          title="Same questions. Different customers. All day."
          body="Hours lost to repetitive WhatsApp messages, missed inquiries, and follow-ups that never happen. Your real work waits while you answer the same five questions on repeat."
          delay={300}
        />
      </div>
    </div>
  </section>
);

// =====================================================
// TRANSFORMATION SECTION (Act 2: The Promise)
// =====================================================
const TransformScenario = ({ time, mood, title, body, delay }) => {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`group relative pl-8 border-l border-emerald-400/20 transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="absolute -left-2 top-2 w-3.5 h-3.5 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform shadow-lg shadow-emerald-400/50" />
      <div className="flex items-center gap-3 mb-3 text-xs uppercase tracking-[0.25em] text-white/40">
        <span>{time}</span>
        <span>·</span>
        <span className="text-emerald-400">{mood}</span>
      </div>
      <h3 className="font-display text-2xl md:text-3xl text-white mb-3 leading-tight">{title}</h3>
      <p className="text-white/70 leading-relaxed text-base md:text-lg max-w-xl">{body}</p>
    </div>
  );
};

const TransformSection = () => (
  <section className="relative py-20 md:py-28 overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-3xl -z-10 glow" />

    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="max-w-3xl mb-14">
        <ChapterMark part="Pt. 02" title="The Promise" />
        <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-white">
          Get clarity in{' '}
          <em className="italic text-emerald-400">5 minutes.</em>
          <br />
          Not another{' '}
          <em className="italic text-white/60">sales call.</em>
        </h2>
        <p className="mt-6 text-lg text-white/50 max-w-xl leading-relaxed">
          Two ways to start. Both free. Chat with Kavi AI for instant clarity, or book Hansani for hands-on planning.
        </p>
      </div>

      <div className="space-y-12 md:space-y-16 max-w-3xl mx-auto">
        <TransformScenario
          time="Anytime"
          mood="Talk First"
          title="Tell Kavi AI about your business."
          body="In your own words. No forms. No calendar bookings. No commitment. Just a real conversation with an AI that knows automation — across 10+ industries, deeply."
          delay={0}
        />
        <TransformScenario
          time="5 Minutes Later"
          mood="Get Clarity"
          title="Receive a personalized roadmap."
          body="Kavi tells you exactly what to automate first, what it costs, what results to expect — and yes, sometimes what NOT to automate. Real advice, not a sales pitch."
          delay={100}
        />
        <TransformScenario
          time="Your Choice"
          mood="Decide Confidently"
          title="Hire us, or DIY. Either way, you win."
          body="Want us to build it? Book Hansani for a 15-minute strategy call. Want to DIY? Take the blueprint and run with it. You leave with answers — not more questions."
          delay={200}
        />
        <TransformScenario
          time="Always"
          mood="Human Approval"
          title="Real humans stay in control."
          body="Every important action — sending proposals, replying to high-stakes inquiries, finalizing deals — passes through human approval. AI handles speed. You handle judgment."
          delay={300}
        />
      </div>
    </div>
  </section>
);

// =====================================================
// SERVICES SECTION (4 NEW PILLARS)
// =====================================================
const ServiceCard = ({ icon: Icon, label, title, body, features, priceRange, featured, delay }) => {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`group relative p-8 md:p-10 rounded-3xl border transition-all duration-700 ${
        featured
          ? 'bg-gradient-to-br from-emerald-950/40 to-zinc-900/40 border-emerald-400/30'
          : 'bg-zinc-950/50 border-white/5 hover:border-white/20'
      } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-6">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
            featured ? 'bg-emerald-400 text-black' : 'bg-white/5 text-emerald-400'
          }`}
        >
          <Icon className="w-7 h-7" strokeWidth={1.5} />
        </div>
        <span className="text-xs uppercase tracking-[0.2em] text-white/40">{label}</span>
      </div>

      <h3 className="font-display text-3xl md:text-4xl text-white mb-4 leading-tight">{title}</h3>
      <p className="text-white/60 leading-relaxed mb-6">{body}</p>

      <ul className="space-y-2.5 text-sm text-white/60 mb-6">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="text-emerald-400 mt-1 text-xs">→</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {priceRange && (
        <div className="pt-6 border-t border-white/10">
          <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-1">Investment</div>
          <div className={`font-display text-2xl ${featured ? 'text-emerald-400' : 'text-white'}`}>
            {priceRange}
          </div>
        </div>
      )}
    </div>
  );
};

// =====================================================
// KAVI vs HANSANI - Role Clarification Section
// =====================================================
const KaviHansaniSection = () => {
  const [ref, visible] = useReveal();
  return (
    <section ref={ref} className="relative py-20 md:py-28 bg-gradient-to-b from-zinc-950 via-black to-zinc-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mb-16">
          <ChapterMark part="Pt. 03" title="Who You'll Work With" />
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-white">
            One AI advisor.{' '}
            <em className="italic text-amber-300">One human builder.</em>
            <br />
            Clear roles. Honest delivery.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Kavi AI Card */}
          <div className={`group relative p-8 md:p-10 rounded-3xl border border-emerald-400/30 bg-gradient-to-br from-emerald-950/30 to-zinc-900/40 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-400 text-black flex items-center justify-center">
                <Brain className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <div className="text-xs uppercase tracking-[0.25em] text-emerald-400">Kavi AI</div>
            </div>
            <h3 className="font-display text-3xl md:text-4xl text-white mb-4 leading-tight">
              The AI Advisor
            </h3>
            <p className="text-white/70 leading-relaxed mb-6">
              Available 24/7 right here on this website. Gives you a free automation roadmap based on your
              specific business. Knows 10+ industries deeply. No sales pressure.
            </p>
            <ul className="space-y-2.5 text-sm text-white/60 mb-6">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 mt-1 text-xs">→</span>
                <span>Free, instant, available anytime</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 mt-1 text-xs">→</span>
                <span>No email or signup required</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 mt-1 text-xs">→</span>
                <span>Industry-specific recommendations</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 mt-1 text-xs">→</span>
                <span>Honest "don't automate this" advice</span>
              </li>
            </ul>
            <div className="pt-6 border-t border-white/10">
              <button
                onClick={openChatWidget}
                className="text-emerald-400 font-display text-xl hover:text-emerald-300 transition-colors flex items-center gap-2"
              >
                Free · Chat with Kavi Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Hansani Card */}
          <div className={`group relative p-8 md:p-10 rounded-3xl border border-amber-300/30 bg-gradient-to-br from-amber-950/20 to-zinc-900/40 transition-all duration-700 delay-150 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-amber-300 text-black flex items-center justify-center">
                <Sparkles className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <div className="text-xs uppercase tracking-[0.25em] text-amber-300">Hansani</div>
            </div>
            <h3 className="font-display text-3xl md:text-4xl text-white mb-4 leading-tight">
              The Human Builder
            </h3>
            <p className="text-white/70 leading-relaxed mb-6">
              Founder of Kavi Automation. Builds the actual systems Kavi recommends. Hands-on automation
              specialist who uses these systems in her own operations daily.
            </p>
            <ul className="space-y-2.5 text-sm text-white/60 mb-6">
              <li className="flex items-start gap-2.5">
                <span className="text-amber-300 mt-1 text-xs">→</span>
                <span>15-minute free strategy call</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-amber-300 mt-1 text-xs">→</span>
                <span>Custom plan for your business</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-amber-300 mt-1 text-xs">→</span>
                <span>Hands-on builds with weekly progress</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-amber-300 mt-1 text-xs">→</span>
                <span>Real human accountability</span>
              </li>
            </ul>
            <div className="pt-6 border-t border-white/10">
              <button
                onClick={openBookingModal}
                className="text-amber-300 font-display text-xl hover:text-amber-200 transition-colors flex items-center gap-2"
              >
                Premium · Book a Strategy Call <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => (
  <section id="services" className="relative py-20 md:py-28 bg-gradient-to-b from-black to-zinc-950">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="max-w-3xl mb-16">
        <ChapterMark part="Pt. 04" title="What We Build" />
        <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-white">
          From first hello to{' '}
          <em className="italic text-emerald-400">final sale</em> — automated, intelligently.
        </h2>
        <p className="mt-6 text-lg text-white/60 max-w-2xl">
          Four systems that work together. Not features. Foundations. Each with transparent starting prices.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <ServiceCard
          icon={Brain}
          label="01 — AI Web Chatbot"
          title="Your consultant on the website. 24/7."
          body="Kavi-style AI chatbots embedded directly into your website. Answers visitor questions, recommends right solutions for their industry, pre-qualifies leads, and books discovery calls automatically. Like the one talking to you right now."
          features={[
            'Industry-aware text AI advisor',
            'Lead pre-qualification + capture',
            'Books discovery calls automatically',
            'Multi-language support',
          ]}
          priceRange="Starts from €500"
          featured
          delay={0}
        />
        <ServiceCard
          icon={MessageCircle}
          label="02 — WhatsApp & Chat Automation"
          title="AI handles 80% of customer messages."
          body="Wherever your customers chat — WhatsApp Business, Telegram, web chat — your AI answers smart, on-brand, instantly. Multilingual support, FAQ handling, booking flows, and seamless human handoff for complex queries."
          features={[
            'WhatsApp Business API integration',
            'FAQ, booking, and support automation',
            'Multilingual (5+ languages)',
            'Human handoff for complex queries',
          ]}
          priceRange="Starts from €800"
          featured
          delay={100}
        />
        <ServiceCard
          icon={Target}
          label="03 — Sales Pipeline Automation"
          title="Capture, score, and nurture leads on autopilot."
          body="From discovery to qualified prospects — the entire sales pipeline, automated. Lead enrichment, AI-personalized outreach, smart follow-ups, and CRM sync. Built to make your team faster, not busier."
          features={[
            'Lead capture across all channels',
            'AI lead scoring & segmentation',
            'Automated proposal generation',
            'CRM integration & follow-ups',
          ]}
          priceRange="Starts from €1,500"
          delay={200}
        />
        <ServiceCard
          icon={Zap}
          label="04 — Custom AI Workflows"
          title="Bespoke systems for your operations."
          body="Custom-built AI agents and integrations. Document automation, reports, multi-tool workflows, internal AI assistants. Connect everything you use — Gmail, Sheets, Airtable, Notion — into one intelligent system with human approval built in."
          features={[
            'Multi-tool AI agents (Sheets, Gmail, Calendar)',
            'Human-in-the-loop approval flows',
            'Custom integrations & data pipelines',
            'Internal AI assistants for your team',
          ]}
          priceRange="Starts from €3,000"
          delay={300}
        />
      </div>
    </div>
  </section>
);

// =====================================================
// METHOD / MANIFESTO SECTION
// =====================================================
const MethodSection = () => {
  const [ref, visible] = useReveal();
  return (
    <section
      id="method"
      ref={ref}
      className="relative py-20 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
        <div className="flex justify-center">
          <ChapterMark part="Pt. 05" title="The Method" />
        </div>

        <h2
          className={`font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-white mb-12 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          We don't sell bots.
          <br />
          We build{' '}
          <em className="italic text-emerald-400">systems.</em>
        </h2>

        <div
          className={`space-y-6 text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto transition-all duration-700 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p>Most freelancers build a chatbot, hand it over, and disappear.</p>
          <p className="text-white/90">
            We build <em className="italic text-emerald-400">systems.</em> WhatsApp connects to your AI.
            AI talks to your CRM. CRM triggers your calendar. Calendar sends your reminders.
            Reminders feed your reports. Everything talks to everything — automatically.
          </p>
          <p className="font-display text-2xl md:text-3xl text-white italic pt-4">
            One conversation can trigger 15 actions.
            <br />
            One booking can update 6 systems.
            <br />
            One question can save 3 hours.
          </p>
          <p className="text-emerald-400 font-display text-xl md:text-2xl pt-4">
            That's not a bot. That's automation.
          </p>
          <p className="text-white/80 font-display text-lg md:text-xl pt-2 italic">
            Your workflows run smoother — with less manual work.
          </p>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// CASE STUDIES (Featured Work)
// =====================================================
const caseStudies = [
  {
    badge: 'Example Workflow',
    industry: 'B2B Sales Agency',
    title: 'Government Contract Discovery & Outreach Engine',
    challenge: 'Manual sales research consumed 10+ hours daily. Tender opportunities were missed. Outreach was inconsistent and slow.',
    solution: 'A four-workflow automation system that runs the entire B2B sales pipeline — from opportunity discovery to qualified prospects.',
    pipeline: [
      'Daily SAM.gov tender ingestion → AI fit scoring',
      'Company matching via Apollo + email verification',
      'AI-drafted personalized outreach with Telegram approval',
      'Multi-step follow-ups with reply detection & suppression',
    ],
    stack: ['n8n', 'OpenAI', 'Apollo', 'Airtable', 'Telegram', 'Gmail API'],
    impact: 'Designed to reduce repetitive manual work while keeping humans in control of every outreach.',
    accent: 'amber',
  },
  {
    badge: 'Demo System',
    industry: 'E-commerce / Service Business',
    title: 'WhatsApp Customer Service AI Agent',
    challenge: 'After-hours inquiries lost as missed messages. Customer service team overwhelmed by repetitive questions.',
    solution: 'A WhatsApp + Telegram AI agent with memory, integrated with Google Sheets as a real-time database. Handles inquiries 24/7, escalates when needed.',
    pipeline: [
      'WhatsApp message → AI agent with conversational memory',
      'Auto-logs customer data to Google Sheets database',
      'Smart escalation to human via Telegram on edge cases',
      'Multilingual support with brand voice consistency',
    ],
    stack: ['WhatsApp API', 'OpenAI', 'Google Sheets', 'Telegram'],
    impact: 'Designed to capture every inquiry 24/7 with multilingual support and human escalation when needed.',
    accent: 'emerald',
  },
  {
    badge: 'Sample Automation',
    industry: 'Professional Services',
    title: 'Email-to-Document Automation Pipeline',
    challenge: 'Manual document creation from email requests. Calendar coordination chaos. Hours lost to admin work.',
    solution: 'A Gmail-triggered automation that handles the entire document lifecycle — from inquiry email to final delivery.',
    pipeline: [
      'Gmail trigger captures inbound document requests',
      'Auto-creates Drive files & spreadsheets from templates',
      'Checks calendar availability & reserves slots',
      'Generates Google Docs deliverables automatically',
    ],
    stack: ['Gmail', 'Google Drive', 'Sheets', 'Calendar', 'Docs', 'Notion'],
    impact: 'Designed to eliminate manual document creation while keeping humans in control of the final output.',
    accent: 'emerald',
  },
];

const CaseStudyCard = ({ study, index }) => {
  const [ref, visible] = useReveal();
  const isAmber = study.accent === 'amber';

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={`relative p-8 md:p-12 rounded-3xl border bg-gradient-to-br ${
        isAmber
          ? 'from-amber-950/20 to-zinc-900/50 border-amber-400/20'
          : 'from-emerald-950/20 to-zinc-900/50 border-emerald-400/20'
      }`}>
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className={`text-[10px] uppercase tracking-[0.3em] px-3 py-1 rounded-full ${
            isAmber ? 'bg-amber-400/10 text-amber-300 border border-amber-400/20' : 'bg-emerald-400/10 text-emerald-300 border border-emerald-400/20'
          }`}>
            {study.badge}
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-white/40">{study.industry}</span>
        </div>

        <h3 className="font-display text-3xl md:text-4xl text-white mb-8 leading-tight max-w-3xl">
          {study.title}
        </h3>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-8">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-3">The Challenge</div>
            <p className="text-white/70 leading-relaxed">{study.challenge}</p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-3">The Solution</div>
            <p className="text-white/70 leading-relaxed">{study.solution}</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">The Pipeline</div>
          <div className="space-y-3">
            {study.pipeline.map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${
                  isAmber ? 'bg-amber-400/10 text-amber-300 border border-amber-400/20' : 'bg-emerald-400/10 text-emerald-300 border border-emerald-400/20'
                }`}>
                  {i + 1}
                </div>
                <p className="text-white/70 leading-relaxed pt-0.5">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {study.stack.map((tech, i) => (
            <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 font-mono">
              {tech}
            </span>
          ))}
        </div>

        <div className={`pt-8 border-t ${isAmber ? 'border-amber-400/10' : 'border-emerald-400/10'}`}>
          <div className="flex items-start gap-4">
            <TrendingUp className={`w-5 h-5 mt-1 ${isAmber ? 'text-amber-300' : 'text-emerald-400'}`} />
            <p className={`font-display text-xl md:text-2xl italic ${isAmber ? 'text-amber-100' : 'text-emerald-100'}`}>
              "{study.impact}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CaseStudiesSection = () => (
  <section id="work" className="relative py-20 md:py-28 bg-gradient-to-b from-zinc-950 via-black to-zinc-950">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="max-w-3xl mb-16">
        <ChapterMark part="Pt. 06" title="Example Work" color="amber" />
        <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-white">
          Real workflows.{' '}
          <em className="italic text-amber-300">Honest design.</em>
        </h2>
        <p className="mt-6 text-lg text-white/60 max-w-2xl leading-relaxed">
          These are example automation systems showing what we build. Each is designed
          to reduce repetitive manual work while keeping humans in control of every decision.
        </p>
      </div>

      <div className="space-y-8">
        {caseStudies.map((study, i) => (
          <CaseStudyCard key={i} study={study} index={i} />
        ))}
      </div>
    </div>
  </section>
);

// =====================================================
// INDUSTRIES SECTION
// =====================================================
const industries = [
  {
    name: 'E-commerce Stores',
    body: 'Your store never closes. Your customer service shouldn\'t either. AI handles WhatsApp inquiries, recovers abandoned carts, answers product questions, and syncs everything to Shopify automatically. 24/7.',
    tag: 'Shopify · WooCommerce',
  },
  {
    name: 'Restaurants & Cafes',
    body: 'Same questions all day — menu, hours, reservations, dietary options. AI handles 80% of them instantly via WhatsApp. Your staff focuses on service, not screens.',
    tag: 'Restaurants · Cafes · Bistros',
  },
  {
    name: 'Salons & Beauty',
    body: 'Your phone shouldn\'t ring during appointments. AI handles WhatsApp bookings, sends reminders (reducing no-shows 40-60%), and fills cancellations automatically. You focus on your clients.',
    tag: 'Salons · Spas · Beauty Clinics',
  },
  {
    name: 'Real Estate Agencies',
    body: 'Inquiries don\'t wait for office hours. Neither should your responses. AI handles WhatsApp leads, qualifies buyers, answers property questions, and books viewings — directly into your calendar.',
    tag: 'Agencies · Solo agents',
  },
  {
    name: 'Hotels & Hospitality',
    body: 'Multilingual booking inquiries arrive at all hours. AI handles guest questions in 5+ languages, manages pre-arrival info, handles concierge requests, and follows up post-stay for reviews.',
    tag: 'Hotels · B&Bs · Lodges',
  },
  {
    name: 'Fitness & Gyms',
    body: 'Trial leads go cold in 7 days. AI nurtures prospects, handles class bookings, sends reminders, and re-engages dropouts. Conversion rates lift 25-40% with the right automation.',
    tag: 'Gyms · Studios · Trainers',
  },
  {
    name: 'Tour & Travel',
    body: 'International leads expect instant replies. AI handles itinerary questions in multiple languages, qualifies travelers, captures booking inquiries, and pre-trip support — even while you sleep.',
    tag: 'Tour Operators · Agencies',
  },
  {
    name: 'Education & Courses',
    body: 'Students inquire when teachers are teaching. AI advisor recommends right courses, handles enrollment questions, answers FAQs, and captures leads — converting inquiry-stage interest 24/7.',
    tag: 'Schools · Tutors · Course Sellers',
  },
  {
    name: 'Coaches & Consultants',
    body: 'Your time is your product. We automate discovery, qualify fit, deliver content, and handle onboarding — so you only spend time with ready-to-buy clients.',
    tag: 'Coaching · Consulting · Service Pros',
  },
  {
    name: 'B2B Sales & SaaS',
    body: 'Your pipeline shouldn\'t depend on manual research. We build complete outreach engines — lead enrichment, AI-personalized emails, follow-up sequences, reply handling. Your reps close, AI does the rest.',
    tag: 'Agencies · SaaS · Services',
  },
];

const IndustriesSection = () => {
  const [active, setActive] = useState(0);

  return (
    <section id="industries" className="relative py-20 md:py-28 bg-gradient-to-b from-zinc-950 to-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mb-16">
          <ChapterMark part="Pt. 07" title="Who We Serve" />
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-white">
            Every industry has its own{' '}
            <em className="italic text-white/50">chaos.</em> We tame it.
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {industries.map((ind, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`text-left px-5 py-4 rounded-2xl whitespace-nowrap lg:whitespace-normal transition-all flex-shrink-0 ${
                  active === i
                    ? 'bg-emerald-400 text-black'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="font-display text-lg md:text-xl">{ind.name}</div>
                <div className={`text-xs mt-1 ${active === i ? 'text-black/60' : 'text-white/40'}`}>
                  {ind.tag}
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-8 lg:pl-8 lg:border-l lg:border-white/10">
            <div key={active} className="reveal">
              <h3 className="font-display text-3xl md:text-5xl text-white mb-6 leading-tight">
                {industries[active].name}
              </h3>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
                {industries[active].body}
              </p>
              <button
                onClick={openBookingModal}
                className="mt-8 inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors group"
              >
                <span className="draw-underline">Build this for my business</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// PROCESS / TIMELINE
// =====================================================
const processSteps = [
  {
    phase: 'Phase 01',
    title: 'We meet. We listen.',
    body: 'A discovery call to understand your business inside-out. Your goals, your bottlenecks, your customers. No pitch. Just questions.',
  },
  {
    phase: 'Phase 02',
    title: 'We design your architecture.',
    body: 'Tailored, not templated. We map out the n8n workflow, AI prompts, and integrations specific to your business logic.',
  },
  {
    phase: 'Phase 03',
    title: 'We build.',
    body: 'WhatsApp API, AI models, your CRM — all connected, all tested. You see progress every step.',
  },
  {
    phase: 'Phase 04',
    title: 'We break it on purpose.',
    body: 'Every edge case. Every error scenario. Every weird customer message. We test until it\'s rock-solid.',
  },
  {
    phase: 'Phase 05',
    title: 'You launch. We support.',
    body: 'Full deployment with documentation. Ongoing support. Your business grows — without you growing tired.',
  },
];

const ProcessStep = ({ step, i }) => {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`relative pl-16 md:pl-20 transition-all duration-700 ${
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
      }`}
      style={{ transitionDelay: `${i * 100}ms` }}
    >
      <div className="absolute left-0 top-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-zinc-950 border-2 border-emerald-400 flex items-center justify-center">
        <Clock className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" strokeWidth={1.5} />
      </div>
      <div className="text-xs uppercase tracking-[0.25em] text-emerald-400 mb-2">{step.phase}</div>
      <h3 className="font-display text-2xl md:text-3xl text-white mb-3 leading-tight">{step.title}</h3>
      <p className="text-white/60 leading-relaxed max-w-xl">{step.body}</p>
    </div>
  );
};

const ProcessSection = () => (
  <section className="relative py-20 md:py-28">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="max-w-3xl mb-14">
        <ChapterMark part="Pt. 08" title="The Journey" />
        <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-white">
          From <em className="italic text-emerald-400">"hello"</em> to launch —
          <br />five deliberate phases.
        </h2>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-[19px] md:left-[23px] top-2 bottom-2 w-px bg-gradient-to-b from-emerald-400/40 via-white/10 to-emerald-400/40" />

        <div className="space-y-12">
          {processSteps.map((step, i) => (
            <ProcessStep key={i} step={step} i={i} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

// =====================================================
// FOUNDER SECTION (About)
// =====================================================
const FounderSection = () => {
  const [ref, visible] = useReveal();
  return (
    <section id="about" ref={ref} className="relative py-20 md:py-28 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Photo / Visual */}
          <div className={`lg:col-span-5 transition-all duration-1000 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="relative aspect-[4/5] max-w-md">
              <div className="absolute -inset-4 bg-gradient-to-br from-emerald-400/20 to-amber-400/10 rounded-3xl blur-2xl" />
              <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 overflow-hidden">
                {/*
                  TO ADD YOUR PHOTO:
                  1. Save your edited photo as /public/hansani.jpg
                  2. Replace the <div> below with:
                     <img src="/hansani.jpg" alt="Hansani Kavindi" className="w-full h-full object-cover" />
                */}
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-emerald-400/20 to-amber-400/20 border border-white/10 flex items-center justify-center mb-6">
                      <span className="font-display text-5xl text-white/80">H</span>
                    </div>
                    <div className="text-white/40 text-sm">[Add /hansani.jpg]</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 px-4 py-3 bg-emerald-400 text-black rounded-2xl font-display italic shadow-xl">
                Hansani Kavindi
              </div>
            </div>
          </div>

          {/* Story */}
          <div className={`lg:col-span-7 transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <ChapterMark part="Pt. 09" title="The Founder" color="amber" />

            <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-white mb-8">
              Built by an{' '}
              <em className="italic text-amber-300">operator,</em>
              <br />
              not a salesperson.
            </h2>

            <div className="space-y-5 text-lg text-white/70 leading-relaxed mb-10 pb-10 border-b border-white/10">
              <p>
                <span className="text-white font-medium">Kavi Automation</span> isn't run by a marketing agency.
                It's run by a workflow builder who designs, builds, and tests the systems herself —
                and uses them in her own operations daily.
              </p>
              <p>
                I saw the same pattern in dozens of businesses: owners drowning in repetitive work,
                paralyzed by AI overwhelm, burned by consultants who promised miracles and delivered chaos.
              </p>
              <p className="text-white/90">
                My approach: give business owners free clarity through an AI advisor (Kavi),
                then build what actually moves the needle for those who hire us.{' '}
                <em className="italic text-emerald-400">No upsells. No fluff. No "it depends."</em>
              </p>
              <p className="text-emerald-400 italic font-display text-xl pt-2">
                "If I don't see a realistic 90-day payback path, I'll tell you not to buy it."
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-white/50">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>AI Systems Studio. Serving globally.</span>
              </div>
              <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
                <span className="draw-underline">Connect on LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// WHY US
// =====================================================
const whyUs = [
  {
    icon: Shield,
    title: 'You stay in control.',
    body: 'Guardrails to reduce hallucinations and keep humans in control. Our Human Approval System means AI suggests, you decide. Always. No off-brand replies.',
  },
  {
    icon: Wrench,
    title: 'We meet you where you are.',
    body: 'Your existing tools, your existing process. We enhance, never replace. Your stack stays yours.',
  },
  {
    icon: Rocket,
    title: 'We finish what we start.',
    body: 'Discovery to deployment to long-term support. No half-built workflows. No abandoned projects.',
  },
  {
    icon: Network,
    title: 'We see the whole picture.',
    body: 'Most experts build one piece. We connect every piece. WhatsApp, chat, CRM, calendar, reports — one unified system. Your entire business, running itself.',
  },
];

const WhyUsItem = ({ item, i }) => {
  const [ref, visible] = useReveal();
  const Icon = item.icon;
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${i * 100}ms` }}
    >
      <div className="w-14 h-14 rounded-2xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center mb-6">
        <Icon className="w-6 h-6 text-emerald-400" strokeWidth={1.5} />
      </div>
      <h3 className="font-display text-2xl md:text-3xl text-white mb-4 leading-tight">
        {item.title}
      </h3>
      <p className="text-white/60 leading-relaxed text-lg max-w-md">{item.body}</p>
    </div>
  );
};

const WhyUsSection = () => (
  <section className="relative py-20 md:py-28 bg-gradient-to-b from-black via-zinc-950 to-black">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="max-w-3xl mb-14">
        <ChapterMark part="Pt. 10" title="Why Us" />
        <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-white">
          Automation should make you{' '}
          <em className="italic text-emerald-400">more human</em>, not less.
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-12 md:gap-16">
        {whyUs.map((item, i) => (
          <WhyUsItem key={i} item={item} i={i} />
        ))}
      </div>
    </div>
  </section>
);

// =====================================================
// PACKAGES (NO PRICES)
// =====================================================
const packages = [
  {
    icon: '🌱',
    name: 'Starter',
    tagline: 'Test the waters',
    priceRange: 'From €500 – €1,500',
    body: 'Curious about AI automation? Start here with a focused AI Web Chatbot or WhatsApp FAQ bot that handles your most common customer questions.',
    features: ['AI Web Chatbot or WhatsApp FAQ Bot', 'Industry-aware advisor logic', '7–10 day delivery', 'Unlimited revisions'],
    cta: 'Book a Call to Learn More',
    featured: false,
  },
  {
    icon: '🚀',
    name: 'Business',
    tagline: 'Scale with confidence',
    priceRange: 'From €1,500 – €4,000',
    body: 'Ready to grow? Get full WhatsApp + Chat Automation, sales pipeline integration, and human approval flows that scale with your business.',
    features: [
      'WhatsApp + Chat Automation (full)',
      'Sales Pipeline + CRM integration',
      'Lead scoring & multilingual support',
      '2–3 week delivery + ongoing support',
    ],
    cta: 'Book a Call to Learn More',
    featured: true,
    badge: 'Most Popular',
  },
  {
    icon: '💎',
    name: 'Enterprise',
    tagline: 'Complete transformation',
    priceRange: 'From €3,000+',
    body: 'Going all-in? Custom AI Workflows with our signature Human Approval System, multi-platform integration, and bespoke AI agents tailored to your operations.',
    features: [
      'Custom AI Workflows & agents',
      'WhatsApp + Telegram + Web Chat unified',
      'Multi-tool integrations (Sheets, Gmail, Notion)',
      '4–6 week delivery + long-term partnership',
    ],
    cta: 'Book a Strategy Call',
    featured: false,
  },
];

const PackageCard = ({ pkg, i }) => {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`relative p-8 md:p-10 rounded-3xl border transition-all duration-700 ${
        pkg.featured
          ? 'bg-gradient-to-br from-emerald-950/60 to-zinc-900/60 border-emerald-400/40 md:scale-105'
          : 'bg-zinc-950/50 border-white/5 hover:border-white/20'
      } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${i * 100}ms` }}
    >
      {pkg.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-400 text-black text-xs font-medium rounded-full uppercase tracking-[0.2em]">
          {pkg.badge}
        </div>
      )}

      <div className="text-4xl mb-4">{pkg.icon}</div>
      <h3 className="font-display text-3xl text-white mb-1">{pkg.name}</h3>
      <p className="text-emerald-400 text-sm uppercase tracking-[0.25em] mb-4">{pkg.tagline}</p>

      {pkg.priceRange && (
        <div className={`font-display text-2xl mb-6 ${pkg.featured ? 'text-emerald-400' : 'text-white'}`}>
          {pkg.priceRange}
        </div>
      )}

      <p className="text-white/60 leading-relaxed mb-8">{pkg.body}</p>

      <ul className="space-y-3 mb-10">
        {pkg.features.map((f, j) => (
          <li key={j} className="flex items-start gap-3 text-white/70 text-sm">
            <Sparkles className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={openBookingModal}
        className={`block w-full text-center py-4 rounded-full font-medium transition-all hover:scale-105 ${
          pkg.featured
            ? 'bg-emerald-400 hover:bg-emerald-300 text-black'
            : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
        }`}
      >
        {pkg.cta}
      </button>
    </div>
  );
};

const PackagesSection = () => (
  <section id="packages" className="relative py-20 md:py-28">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="max-w-3xl mb-16 text-center mx-auto">
        <div className="flex justify-center">
          <ChapterMark part="Pt. 11" title="Investment" />
        </div>
        <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-white">
          Choose your{' '}
          <em className="italic text-emerald-400">starting point.</em>
        </h2>
        <p className="mt-6 text-white/60 text-lg">
          Every project starts with a free audit. We'll help you choose the right fit on the call.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {packages.map((pkg, i) => (
          <PackageCard key={i} pkg={pkg} i={i} />
        ))}
      </div>

      {/* 90-Day ROI Guarantee — Public Pledge */}
      <div className="mt-12 max-w-4xl mx-auto">
        <div className="relative bg-gradient-to-br from-emerald-950/40 via-zinc-900/60 to-amber-950/20 border border-emerald-400/30 rounded-3xl p-8 md:p-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/5 rounded-full blur-3xl"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-400 text-black flex items-center justify-center">
                <Shield className="w-6 h-6" strokeWidth={2} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-emerald-400 mb-1">Risk Reversal</div>
                <div className="font-display text-2xl text-white">The 90-Day Payback Pledge</div>
              </div>
            </div>

            <blockquote className="font-display text-2xl md:text-3xl text-white/95 leading-snug italic mb-6">
              "If we don't see a realistic 90-day payback path for your investment,
              <span className="text-emerald-400"> Hansani will tell you not to buy it.</span>"
            </blockquote>

            <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div>
                <div className="text-emerald-400 text-2xl font-display mb-1">No</div>
                <div className="text-sm text-white/60">Hidden fees or surprise costs</div>
              </div>
              <div>
                <div className="text-emerald-400 text-2xl font-display mb-1">No</div>
                <div className="text-sm text-white/60">Generic templates or recycled solutions</div>
              </div>
              <div>
                <div className="text-emerald-400 text-2xl font-display mb-1">No</div>
                <div className="text-sm text-white/60">Sales pressure or fake urgency</div>
              </div>
            </div>

            <div className="mt-6 text-sm text-white/50 italic">
              We build systems that move the financial needle, or we don't build them at all.
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// =====================================================
// FAQ
// =====================================================
const faqs = [
  {
    q: 'How long does setup typically take?',
    a: 'Anywhere from 1 week for a focused starter project to 4–6 weeks for full enterprise automation. We\'ll give you exact timelines after the discovery call based on your specific scope and complexity.',
  },
  {
    q: 'Do I need any technical knowledge to use this?',
    a: 'No. We handle all the technical setup. You\'ll get an intuitive interface — usually WhatsApp itself or a simple dashboard — to interact with your automation. We also train your team during launch.',
  },
  {
    q: 'What happens if the AI makes a mistake?',
    a: 'That\'s exactly why we built the Human Approval System. AI drafts the response — you (or your team) approve it before it sends, via Telegram or your dashboard. For high-stakes conversations, you stay in the loop. Always.',
  },
  {
    q: 'Can you integrate with my existing tools?',
    a: 'Almost certainly yes. We work with Airtable, Google Workspace, Notion, Telegram, WhatsApp Business API, and 400+ other tools through n8n. If your tool has an API, we can connect to it.',
  },
  {
    q: 'How do I know which automation is right for my business?',
    a: 'Chat with Kavi AI on this site — it\'s free, no email needed. Tell it about your business and it gives you a personalized roadmap in 5 minutes: what to automate first, what to skip, and rough pricing. Then you decide.',
  },
  {
    q: 'Do you offer ongoing support after launch?',
    a: 'Yes. Every package includes post-launch support and unlimited revisions. We can also set up monthly maintenance for ongoing improvements as your business grows.',
  },
  {
    q: 'Is my data safe with these AI integrations?',
    a: 'Absolutely. We use industry-standard encryption, your data stays in your tools (we don\'t store it), and we sign NDAs for sensitive projects. You own your data, your workflows, your customer information.',
  },
];

const FAQSection = () => {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-black to-zinc-950">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <ChapterMark part="Pt. 12" title="Questions" />
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-white">
            Questions, <em className="italic text-emerald-400">answered.</em>
          </h2>
        </div>

        <div className="divide-y divide-white/10">
          {faqs.map((faq, i) => (
            <div key={i} className="py-6">
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-center justify-between gap-6 text-left group"
              >
                <h3 className="font-display text-xl md:text-2xl text-white group-hover:text-emerald-400 transition-colors">
                  {faq.q}
                </h3>
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all ${
                    open === i ? 'bg-emerald-400 border-emerald-400 rotate-180' : ''
                  }`}
                >
                  {open === i ? (
                    <Minus className="w-4 h-4 text-black" />
                  ) : (
                    <Plus className="w-4 h-4 text-white" />
                  )}
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  open === i ? 'max-h-96 mt-4' : 'max-h-0'
                }`}
              >
                <p className="text-white/60 leading-relaxed text-base md:text-lg pr-16">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// =====================================================
// FINAL CTA
// =====================================================
const FinalCTA = () => (
  <section id="book" className="relative py-20 md:py-32 overflow-hidden">
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-emerald-500/10 rounded-full blur-3xl glow" />
    </div>

    <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
      <Zap className="w-12 h-12 text-emerald-400 mx-auto mb-8" strokeWidth={1.5} />

      <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-white mb-8">
        Stop losing customers
        <br />
        to{' '}
        <em className="italic text-emerald-400">faster</em> competitors.
      </h2>

      <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto mb-12">
        Two ways to start. Both free. Chat with Kavi AI for instant clarity, or book Hansani for a 15-minute strategy call.
        No pressure. No pitch. Just answers.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={openChatWidget}
          className="group inline-flex items-center gap-3 px-8 py-5 bg-emerald-400 hover:bg-emerald-300 text-black font-medium rounded-full transition-all hover:scale-105 text-lg"
        >
          <MessageCircle className="w-5 h-5" />
          Chat with Kavi AI
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <button
          onClick={openBookingModal}
          className="group inline-flex items-center gap-3 px-8 py-5 border border-white/20 hover:border-amber-300 text-white/80 hover:text-amber-300 rounded-full transition-all text-lg"
        >
          <Sparkles className="w-5 h-5" />
          Book Strategy Call
        </button>
      </div>

      <p className="mt-8 text-sm text-white/40">
        Kavi AI: Free · Instant · No email needed · Strategy Call: 15 min · Free · With Hansani
      </p>
    </div>
  </section>
);

// =====================================================
// FOOTER
// =====================================================
const Footer = () => (
  <footer className="relative border-t border-white/5 py-16">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="grid md:grid-cols-4 gap-12 mb-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-full bg-emerald-400 flex items-center justify-center">
              <span className="text-black font-bold font-display text-base">K</span>
            </div>
            <div className="leading-tight">
              <div className="font-display text-[17px] font-medium tracking-tight">Kavi Automation</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">AI Systems Studio</div>
            </div>
          </div>
          <p className="text-white/50 max-w-sm leading-relaxed mb-6">
            AI agents and automation systems that turn conversations into revenue — while you sleep.
          </p>
          <p className="text-xs text-white/30 italic font-display">
            AI Systems Studio. Serving globally.
          </p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4">Services</h4>
          <ul className="space-y-2 text-white/70 text-sm">
            <li><a href="#services" className="hover:text-emerald-400 transition-colors">Conversational AI</a></li>
            <li><a href="#services" className="hover:text-emerald-400 transition-colors">Custom AI Workflows</a></li>
            <li><a href="#services" className="hover:text-emerald-400 transition-colors">Sales Pipelines</a></li>
            <li><a href="#services" className="hover:text-emerald-400 transition-colors">Internal Operations</a></li>
            <li><a href="#services" className="hover:text-emerald-400 transition-colors">Custom AI Agents</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4">Connect</h4>
          <ul className="space-y-2 text-white/70 text-sm">
            <li><a href="#" className="hover:text-emerald-400 transition-colors">LinkedIn</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Fiverr Profile</a></li>
            <li><a href="mailto:hello@kaviautomation.com" className="hover:text-emerald-400 transition-colors">hello@kaviautomation.com</a></li>
            <li><button onClick={openBookingModal} className="hover:text-emerald-400 transition-colors text-left">Book a Call</button></li>
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-white/40">
        <p>© 2026 Kavi Automation. All rights reserved.</p>
        <p className="font-display italic">Built with care, deployed with confidence.</p>
      </div>
    </div>
  </footer>
);

// =====================================================
// AI CHATBOT WIDGET (Floating)
// =====================================================
const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! I'm Kavi 👋 — your AI automation advisor. I help businesses figure out what to automate (and what NOT to). Tell me about your business and I'll show you what's possible — including the sensory marketing tricks billion-dollar brands use. No email needed to start." },
  ]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener('kavi:openChat', handleOpen);
    return () => window.removeEventListener('kavi:openChat', handleOpen);
  }, []);

  const quickReplies = [
    "I'm exploring AI for my business",
    'Tell me about pricing',
    'Book a call with Hansani',
    'What can you automate?',
  ];

  const handleQuickReply = (reply) => {
    const userMsg = { from: 'user', text: reply };
    let botResponse = '';

    if (reply.includes('exploring')) {
      botResponse = "Smart move. Before I give you advice, what's your business? Restaurant, salon, e-commerce, real estate, hotel — or something else? I have industry-specific playbooks (with sensory marketing tricks the big brands use) for each.";
    } else if (reply.includes('pricing')) {
      botResponse = "Honest answer — pricing depends on volume and complexity. Three tiers:\n\n• Starter (€500–€1,500): If you're testing the waters\n• Business (€1,500–€4,000): For real growth — most clients land here\n• Enterprise (€3,000+): Full transformation\n\nBut here's Hansani's pledge: if we don't see a realistic 90-day payback path, we'll tell you not to buy. Want me to open the inquiry form so we can show you exact numbers for YOUR case?";
    } else if (reply.includes('Book')) {
      botResponse = "Opening the booking form for you now... ✨ Just a heads-up: the 15-min call is Pure Listening — Hansani takes notes, then sends you a written AI Blueprint by next morning. Zero sales pressure.";
      setTimeout(() => openBookingModal(), 800);
    } else {
      botResponse = "Anything that's eating your time daily. Examples:\n\n• WhatsApp messages (the same 5 questions all day)\n• Booking & reminders (no-shows killing you?)\n• Cart recovery (e-commerce loses 15-25% to abandoned carts)\n• Lead follow-ups (cold leads = lost money)\n\nBut here's the thing — we don't automate just to automate. If your volume is under 20 orders/month, we'll tell you to wait. What's the most repetitive task in YOUR business right now?";
    }

    setMessages([...messages, userMsg, { from: 'bot', text: botResponse }]);
    setStep(step + 1);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input };

    // Value-First Email Capture trigger after 4+ messages
    const messageCount = messages.filter(m => m.from === 'user').length;
    let botText = "";

    if (messageCount >= 3 && !messages.some(m => m.text && m.text.includes('Blueprint PDF'))) {
      // After 4 user messages, offer the Blueprint PDF
      botText = "I've got enough to build you a clear picture. Want me to send you a full Custom Automation Blueprint PDF? It includes:\n\n✓ Specific automations for your business\n✓ Sensory marketing tactics (Apple/Netflix/Starbucks level)\n✓ Exact pricing tiers\n✓ 90-day ROI projection\n\nJust drop your email and I'll have Hansani send it within 24 hours. Or click 'Free Audit' above to book a 15-min call.";
    } else if (input.toLowerCase().includes('@') && input.includes('.')) {
      // Detected email
      botText = "Perfect! I've saved your email. Hansani will send your personalized AI Blueprint within 24 hours. Anything specific you want her to include? (e.g., focus on WhatsApp, or sales pipeline, or something else)";
    } else {
      botText = "Got it. Tell me more — what's the volume? How many customers/inquiries per week? The honest truth is automation only pays back if your volume justifies it.";
    }

    setMessages([
      ...messages,
      userMsg,
      { from: 'bot', text: botText },
    ]);
    setInput('');
    setStep(step + 1);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl shadow-emerald-400/30 transition-all hover:scale-110 ${
          open ? 'bg-zinc-800' : 'bg-emerald-400'
        }`}
      >
        {open ? (
          <X className="w-6 h-6 text-white mx-auto" />
        ) : (
          <MessageCircle className="w-6 h-6 text-black mx-auto" strokeWidth={2} />
        )}
        {!open && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-amber-300 rounded-full border-2 border-black animate-pulse" />
        )}
      </button>

      {/* Chat Panel */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 max-h-[600px] bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl shadow-black/50 transition-all overflow-hidden flex flex-col ${
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-br from-emerald-950/40 to-zinc-900 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center">
                <span className="font-display font-bold text-black">K</span>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-zinc-950" />
            </div>
            <div>
              <div className="font-display text-white">Kavi AI Assistant</div>
              <div className="text-xs text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                Online · Replies instantly
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 max-h-80">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.from === 'user'
                    ? 'bg-emerald-400 text-black rounded-br-sm'
                    : 'bg-white/5 text-white/90 rounded-bl-sm border border-white/5'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Replies */}
        {step === 0 && (
          <div className="px-5 pb-3 flex flex-wrap gap-2">
            {quickReplies.map((reply, i) => (
              <button
                key={i}
                onClick={() => handleQuickReply(reply)}
                className="text-xs px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/70 hover:text-white transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-white/10 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-400/50"
          />
          <button
            onClick={handleSend}
            className="w-10 h-10 bg-emerald-400 hover:bg-emerald-300 rounded-full flex items-center justify-center transition-colors"
          >
            <Send className="w-4 h-4 text-black" />
          </button>
        </div>

        <div className="px-5 pb-3 text-[10px] text-white/30 text-center">
          Powered by Kavi Automation · Built with n8n + OpenAI
        </div>
      </div>
    </>
  );
};

// =====================================================
// BOOKING MODAL (Smart Inquiry Form)
// =====================================================
const BookingModal = () => {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    whatsapp: '',
    businessType: '',
    challenge: '',
    contactPreference: 'whatsapp',
  });

  // Listen for global open events
  useEffect(() => {
    const handler = () => {
      setOpen(true);
      setSubmitted(false);
    };
    window.addEventListener('kavi:openBooking', handler);
    return () => window.removeEventListener('kavi:openBooking', handler);
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // ====================================================
    // TO CONNECT TO YOUR n8n WEBHOOK:
    // 1. Create a webhook trigger in n8n
    // 2. Replace the URL below with your webhook URL
    // 3. Uncomment the fetch block
    // ====================================================
    const webhookUrl = 'YOUR_N8N_WEBHOOK_URL_HERE';

    try {
      // Uncomment when webhook is ready:
      /*
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          timestamp: new Date().toISOString(),
          source: 'kaviautomation.com',
        }),
      });
      */

      // Simulate network delay for now
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSubmitted(true);
    } catch (err) {
      alert('Something went wrong. Please email hello@kaviautomation.com');
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  const responseTime =
    form.contactPreference === 'email'
      ? '24 hours via email'
      : form.contactPreference === 'whatsapp'
      ? '12 hours on WhatsApp'
      : '24 hours with a Calendly link';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-full max-w-lg bg-zinc-950 border border-white/10 rounded-3xl my-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-4 h-4 text-white/60" />
        </button>

        {!submitted ? (
          <div className="p-8 md:p-10">
            <div className="mb-8">
              <div className="text-xs uppercase tracking-[0.3em] text-emerald-400 mb-3">
                Book Free Strategy Call
              </div>
              <h3 className="font-display text-3xl md:text-4xl text-white leading-tight mb-3">
                Tell Hansani about your{' '}
                <em className="italic text-emerald-400">business.</em>
              </h3>
              <p className="text-white/60 text-sm mb-6">
                Fill this in 60 seconds. Hansani will send you a Calendly link within 12 hours.
              </p>

              {/* Micro-Steps Transparency Box */}
              <div className="bg-emerald-950/30 border border-emerald-400/20 rounded-2xl p-5 mb-2">
                <div className="text-xs uppercase tracking-[0.2em] text-emerald-400 mb-3 font-medium">
                  What happens in 15 minutes
                </div>
                <ul className="space-y-2 text-sm text-white/70">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 font-mono text-xs mt-0.5">1–3</span>
                    <span>Quick hello and alignment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 font-mono text-xs mt-0.5">3–12</span>
                    <span><strong className="text-white">Pure Listening.</strong> You tell us your business bottlenecks, we take detailed notes.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 font-mono text-xs mt-0.5">12–15</span>
                    <span>Wrap up. We send your comprehensive written AI Blueprint to your email by next morning.</span>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t border-emerald-400/10 text-xs text-emerald-400/80 italic">
                  🛡️ Zero sales pressure. You talk, we listen, AI delivers.
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-white/40 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-emerald-400/50 transition-colors text-sm"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-white/40 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-emerald-400/50 transition-colors text-sm"
                    placeholder="you@business.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-white/40 mb-2">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  required
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-emerald-400/50 transition-colors text-sm"
                  placeholder="+40 7XX XXX XXX (with country code)"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-white/40 mb-2">
                  Business Type
                </label>
                <select
                  required
                  value={form.businessType}
                  onChange={(e) => setForm({ ...form, businessType: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-400/50 transition-colors text-sm appearance-none"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    paddingRight: '2.5rem',
                  }}
                >
                  <option value="" className="bg-zinc-900">Select your industry</option>
                  <option value="ecommerce" className="bg-zinc-900">E-commerce Store</option>
                  <option value="restaurant" className="bg-zinc-900">Restaurant / Cafe</option>
                  <option value="salon_beauty" className="bg-zinc-900">Salon / Beauty</option>
                  <option value="real_estate" className="bg-zinc-900">Real Estate</option>
                  <option value="hotel_hospitality" className="bg-zinc-900">Hotel / Hospitality</option>
                  <option value="fitness" className="bg-zinc-900">Fitness / Gym</option>
                  <option value="tour_travel" className="bg-zinc-900">Tour / Travel</option>
                  <option value="education" className="bg-zinc-900">Education / Courses</option>
                  <option value="coach_consultant" className="bg-zinc-900">Coach / Consultant</option>
                  <option value="b2b_sales" className="bg-zinc-900">B2B / SaaS / Agency</option>
                  <option value="other" className="bg-zinc-900">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-white/40 mb-2">
                  What's your biggest automation challenge?
                </label>
                <textarea
                  required
                  rows={3}
                  value={form.challenge}
                  onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-emerald-400/50 transition-colors text-sm resize-none"
                  placeholder="e.g., Missing customer messages after hours, manual data entry, repetitive WhatsApp inquiries..."
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-white/40 mb-3">
                  How would you like to chat?
                </label>
                <div className="space-y-2">
                  {[
                    {
                      value: 'whatsapp',
                      label: 'WhatsApp message',
                      sub: 'Recommended — async & detailed',
                      icon: MessageCircle,
                    },
                    {
                      value: 'email',
                      label: 'Email',
                      sub: 'We respond within 24 hours',
                      icon: Mail,
                    },
                    {
                      value: 'call',
                      label: 'Strategy Call',
                      sub: "We'll send you a Calendly link",
                      icon: Phone,
                    },
                  ].map((opt) => {
                    const Icon = opt.icon;
                    const selected = form.contactPreference === opt.value;
                    return (
                      <label
                        key={opt.value}
                        className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                          selected
                            ? 'bg-emerald-400/10 border-emerald-400/40'
                            : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <input
                          type="radio"
                          name="contactPreference"
                          value={opt.value}
                          checked={selected}
                          onChange={(e) => setForm({ ...form, contactPreference: e.target.value })}
                          className="sr-only"
                        />
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            selected ? 'bg-emerald-400 text-black' : 'bg-white/5 text-white/60'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="text-white text-sm font-medium">{opt.label}</div>
                          <div className="text-white/50 text-xs mt-0.5">{opt.sub}</div>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            selected ? 'border-emerald-400 bg-emerald-400' : 'border-white/20'
                          }`}
                        >
                          {selected && <div className="w-2 h-2 rounded-full bg-black" />}
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-emerald-400 hover:bg-emerald-300 text-black font-medium rounded-full transition-all hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send My Inquiry
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-xs text-white/40 text-center">
                By submitting, you agree to receive a response from Kavi Automation. We never share your info.
              </p>
            </form>
          </div>
        ) : (
          <div className="p-10 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-black" />
            </div>
            <h3 className="font-display text-3xl text-white mb-3">
              Thank you,{' '}
              <em className="italic text-emerald-400">
                {form.name.split(' ')[0] || 'friend'}!
              </em>
            </h3>
            <p className="text-white/70 leading-relaxed max-w-sm mx-auto mb-6">
              Your inquiry has been received. Hansani will personally respond within{' '}
              <span className="text-white">{responseTime}</span>.
            </p>
            <p className="text-white/40 text-sm mb-8">
              You'll receive a confirmation shortly. Check your spam folder just in case.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://calendly.com/kaviautomation/discovery-call"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-emerald-400 hover:bg-emerald-300 text-black font-medium rounded-full transition-all hover:scale-[1.02] text-sm flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Book a 15-min Strategy Call Now
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => setOpen(false)}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full transition-colors text-sm border border-white/10"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// =====================================================
// MAIN PAGE
// =====================================================
export default function KaviAutomationLanding() {
  return (
    <div className="min-h-screen bg-black text-white font-body antialiased relative overflow-x-hidden">
      <FontLoader />
      <Nav />
      <main>
        <Hero />
        <PainSection />
        <TransformSection />
        <KaviHansaniSection />
        <ServicesSection />
        <MethodSection />
        <CaseStudiesSection />
        <IndustriesSection />
        <ProcessSection />
        <FounderSection />
        <WhyUsSection />
        <PackagesSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
      <ChatbotWidget />
      <BookingModal />
    </div>
  );
}
