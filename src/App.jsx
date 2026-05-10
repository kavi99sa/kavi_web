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
} from 'lucide-react';

// =====================================================
// BOOKING MODAL TRIGGER (Global Event Helper)
// =====================================================
const openBookingModal = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('kavi:openBooking'));
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

    .grain::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E");
      opacity: 0.04;
      pointer-events: none;
      mix-blend-mode: overlay;
    }

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

    .draw-underline {
      background-image: linear-gradient(currentColor, currentColor);
      background-size: 0% 1px;
      background-repeat: no-repeat;
      background-position: 0 100%;
      transition: background-size 0.4s ease;
    }
    .draw-underline:hover { background-size: 100% 1px; }

    ::-webkit-scrollbar { width: 10px; }
    ::-webkit-scrollbar-track { background: var(--bg-deep); }
    ::-webkit-scrollbar-thumb { background: #262624; border-radius: 10px; }
    ::-webkit-scrollbar-thumb:hover { background: #3f3f3a; }

    ::selection { background: var(--emerald); color: black; }
  `}</style>
);

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

const ChapterMark = ({ part, title, color = 'emerald' }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className={`h-px w-8 ${color === 'amber' ? 'bg-amber-300' : 'bg-emerald-400'}`} />
    <span className={`text-[10px] uppercase tracking-[0.4em] ${color === 'amber' ? 'text-amber-300' : 'text-emerald-400'}`}>
      {part}
    </span>
    <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">— {title}</span>
  </div>
);

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
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9">
            <div className="absolute inset-0 rounded-full bg-emerald-400 group-hover:bg-emerald-300 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-black font-bold font-display text-base">K</span>
            </div>
          </div>
          <div className="leading-tight">
            <div className="font-display text-[17px] font-medium tracking-tight">Kavi Automation</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">AI Systems Studio</div>
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
          Book Free Audit
        </button>
      </div>
    </nav>
  );
};

const WorkflowViz = () => (
  <div className="relative w-full h-full min-h-[400px] hidden lg:block">
    <svg viewBox="0 0 400 500" className="w-full h-full">
      <defs>
        <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0" />
          <stop offset="50%" stopColor="#34d399" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="node-glow">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g stroke="url(#line-grad)" strokeWidth="1.5" fill="none" strokeDasharray="4 4">
        <path d="M 80 80 Q 200 80 200 200" className="data-flow" />
        <path d="M 320 80 Q 200 80 200 200" className="data-flow" />
        <path d="M 200 240 L 200 320" className="data-flow" />
        <path d="M 200 360 Q 80 400 80 440" className="data-flow" />
        <path d="M 200 360 Q 320 400 320 440" className="data-flow" />
      </g>

      <g className="float-1">
        <circle cx="80" cy="80" r="40" fill="url(#node-glow)" />
        <circle cx="80" cy="80" r="26" fill="#1c1c1a" stroke="#34d399" strokeOpacity="0.4" />
        <text x="80" y="85" textAnchor="middle" fill="#fafaf9" fontSize="11" fontFamily="Manrope" fontWeight="600">WhatsApp</text>
      </g>

      <g className="float-2">
        <circle cx="320" cy="80" r="40" fill="url(#node-glow)" />
        <circle cx="320" cy="80" r="26" fill="#1c1c1a" stroke="#34d399" strokeOpacity="0.4" />
        <text x="320" y="85" textAnchor="middle" fill="#fafaf9" fontSize="11" fontFamily="Manrope" fontWeight="600">Voice</text>
      </g>

      <g className="float-3">
        <circle cx="200" cy="220" r="55" fill="url(#node-glow)" />
        <circle cx="200" cy="220" r="38" fill="#34d399" />
        <text x="200" y="218" textAnchor="middle" fill="#0a0a09" fontSize="11" fontFamily="Manrope" fontWeight="700">AI AGENT</text>
        <text x="200" y="232" textAnchor="middle" fill="#0a0a09" fontSize="9" fontFamily="Manrope" fontWeight="500" opacity="0.7">Human-Approved</text>
      </g>

      <g className="float-4">
        <polygon points="200,320 220,340 200,360 180,340" fill="#1c1c1a" stroke="#fcd34d" strokeOpacity="0.5" strokeWidth="1.5" />
      </g>

      <g className="float-1">
        <circle cx="80" cy="440" r="40" fill="url(#node-glow)" />
        <circle cx="80" cy="440" r="26" fill="#1c1c1a" stroke="#34d399" strokeOpacity="0.4" />
        <text x="80" y="445" textAnchor="middle" fill="#fafaf9" fontSize="11" fontFamily="Manrope" fontWeight="600">CRM</text>
      </g>

      <g className="float-2">
        <circle cx="320" cy="440" r="40" fill="url(#node-glow)" />
        <circle cx="320" cy="440" r="26" fill="#1c1c1a" stroke="#34d399" strokeOpacity="0.4" />
        <text x="320" y="445" textAnchor="middle" fill="#fafaf9" fontSize="11" fontFamily="Manrope" fontWeight="600">Calendar</text>
      </g>

      <circle cx="100" cy="60" r="3" fill="#34d399" className="blink" />
      <circle cx="340" cy="60" r="3" fill="#34d399" className="blink" />
    </svg>
  </div>
);

const Hero = () => (
  <section className="relative min-h-screen flex items-center pt-28 pb-12 overflow-hidden grain">
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
            message can mean a
            <br />
            <span className="text-white/40">customer lost.</span>
          </h1>

          <p className="reveal reveal-d2 mt-8 text-lg md:text-xl text-white/70 max-w-xl leading-relaxed">
            We build AI automation systems for WhatsApp, voice, CRM, and customer workflows — so your business responds faster without losing the human touch.
          </p>

          <div className="reveal reveal-d3 mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={openBookingModal}
              className="group inline-flex items-center gap-3 px-7 py-4 bg-emerald-400 hover:bg-emerald-300 text-black font-medium rounded-full transition-all hover:scale-105"
            >
              Book Your Free Audit
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#work"
              className="group inline-flex items-center gap-2 px-7 py-4 text-white/80 hover:text-white transition-colors"
            >
              See our work
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>

          <div className="reveal reveal-d4 mt-10">
            <div className="text-xs uppercase tracking-[0.3em] text-white/30 mb-4">
              Built with the tools your business already trusts
            </div>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 font-display italic text-white/60 text-sm md:text-base">
              <span>n8n</span>
              <span className="text-white/20">·</span>
              <span>OpenAI</span>
              <span className="text-white/20">·</span>
              <span>Gemini</span>
              <span className="text-white/20">·</span>
              <span>WhatsApp API</span>
              <span className="text-white/20">·</span>
              <span>Telegram</span>
              <span className="text-white/20">·</span>
              <span>Airtable</span>
              <span className="text-white/20">·</span>
              <span>Google Workspace</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 reveal reveal-d3">
          <WorkflowViz />
        </div>
      </div>
    </div>
  </section>
);

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
  <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 bg-gradient-to-b from-black via-zinc-950 to-black">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="max-w-3xl mb-14">
        <ChapterMark part="Pt. 01" title="The Problem" color="amber" />
        <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-white">
          The cost of being{' '}
          <em className="italic text-white/50">human</em>
          <br />
          in a 24/7 world.
        </h2>
        <p className="mt-6 text-lg text-white/50 max-w-xl leading-relaxed">
          You can't be everywhere. Your business shouldn't have to choose.
        </p>
      </div>

      <div className="space-y-12 md:space-y-16 max-w-3xl mx-auto">
        <PainScenario
          time="11:43 PM"
          mood="Exhausted"
          title="Your phone buzzes. Again."
          body="Another customer asking the same question you've answered 50 times today. You're tired. You'll reply tomorrow. By tomorrow, they've already bought from someone else."
          delay={0}
        />
        <PainScenario
          time="2:17 PM"
          mood="In a meeting"
          title="The phone rings — you can't answer."
          body="A potential client calls during your meeting. You miss it. They don't leave a voicemail. They simply call your competitor instead. You'll never know who they were."
          delay={100}
        />
        <PainScenario
          time="9:04 AM"
          mood="Stuck in traffic"
          title="Three inquiries. Two missed calls. Zero replies."
          body="By the time you reach the office, your day is already behind. Hot leads have gone cold. Opportunities have walked away. And you haven't even had your coffee."
          delay={200}
        />
        <PainScenario
          time="Every week"
          mood="Drowning"
          title="15 hours lost to data entry."
          body="Your team types lead info into the CRM. Manually. Repeatedly. That's a full-time job — wasted on tasks a machine should be doing. While they type, sales calls go unmade."
          delay={300}
        />
      </div>
    </div>
  </section>
);

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
          Your business{' '}
          <em className="italic text-emerald-400">runs itself.</em>
          <br />
          You finally{' '}
          <em className="italic text-white/60">breathe.</em>
        </h2>
        <p className="mt-6 text-lg text-white/50 max-w-xl leading-relaxed">
          Same scenarios. Different ending. Now imagine this instead.
        </p>
      </div>

      <div className="space-y-12 md:space-y-16 max-w-3xl mx-auto">
        <TransformScenario
          time="11:43 PM"
          mood="Asleep"
          title="Your AI replies in 3 seconds."
          body="Friendly. Accurate. On-brand. The customer asks, gets answered, and buys. Your AI logs the sale, updates inventory, and sends a thank-you message. You sleep through all of it."
          delay={0}
        />
        <TransformScenario
          time="2:17 PM"
          mood="In a meeting"
          title="Your voice AI answers the call."
          body="It greets the caller, qualifies their inquiry, and books a callback in your calendar. After your meeting, you see a hot lead waiting — already scheduled, already warm."
          delay={100}
        />
        <TransformScenario
          time="9:04 AM"
          mood="Driving in"
          title="Your dashboard greets you."
          body="WhatsApp inquiries answered. Calls handled. Leads qualified, scored, synced to your CRM. You arrive to opportunities — not catch-up. You start the day already ahead."
          delay={200}
        />
        <TransformScenario
          time="Every week"
          mood="Focused"
          title="Your team closes deals."
          body="Every lead auto-logged. Every follow-up auto-sent. Every report auto-generated. Sales conversations replace data entry. Revenue replaces busywork."
          delay={300}
        />
      </div>
    </div>
  </section>
);

const ServiceCard = ({ icon: Icon, label, title, body, features, featured, delay }) => {
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

      <ul className="space-y-2.5 text-sm text-white/60">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="text-emerald-400 mt-1 text-xs">→</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ServicesSection = () => (
  <section id="services" className="relative py-20 md:py-28 bg-gradient-to-b from-black to-zinc-950">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="max-w-3xl mb-16">
        <ChapterMark part="Pt. 03" title="What We Build" />
        <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-white">
          From first hello to{' '}
          <em className="italic text-emerald-400">final sale</em> — fully automated.
        </h2>
        <p className="mt-6 text-lg text-white/60 max-w-2xl">
          Four layers that work together as one system. Not features. Foundations.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <ServiceCard
          icon={MessageCircle}
          label="01 — Conversational AI"
          title="WhatsApp, Voice & Chat Agents"
          body="Wherever your customers talk — WhatsApp, phone, Telegram, web chat — your AI answers. Smart, on-brand, and supports multiple languages. Multilingual support ensures global reach."
          features={[
            'WhatsApp Business API + Voice AI agents',
            'Guardrails to reduce hallucinations & keep humans in control',
            'Lead qualification & smart routing',
            '24/7 availability with human escalation',
          ]}
          featured
          delay={0}
        />
        <ServiceCard
          icon={Target}
          label="02 — Sales Pipelines"
          title="B2B Outreach & Lead Automation"
          body="From discovery to first reply — the entire sales pipeline, automated. Lead enrichment, email verification, AI-personalized outreach, smart follow-ups. Built for B2B agencies and sales teams."
          features={[
            'Lead discovery, enrichment & email verification',
            'AI-drafted outreach with human approval',
            'Multi-step follow-up sequences',
            'Reply detection & CRM auto-sync',
          ]}
          featured
          delay={100}
        />
        <ServiceCard
          icon={Workflow}
          label="03 — Internal Operations"
          title="Back-Office Workflow Automation"
          body="The invisible engine. Document automation, calendar sync, report generation, cross-tool data flows. Connect Gmail, Notion, Sheets, Airtable — designed to reduce repetitive manual work."
          features={[
            'Email-to-document pipelines',
            'Calendar & scheduling automation',
            'Auto-generated reports & summaries',
            'Cross-platform data synchronization',
          ]}
          delay={200}
        />
        <ServiceCard
          icon={Brain}
          label="04 — AI Agents"
          title="Custom AI Agents & Integrations"
          body="Bespoke AI agents with tools and decision logic. AI drafts replies, scores leads, generates reports — you approve. Your workflows run smoother — with less manual work."
          features={[
            'Multi-tool AI agents (Sheets, Gmail, Calendar)',
            'Human-in-the-loop approval flows',
            'Custom GPT & Gemini integrations',
            'Conversational memory & context',
          ]}
          delay={300}
        />
      </div>
    </div>
  </section>
);

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
          <ChapterMark part="Pt. 04" title="The Method" />
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
            Reminders feed your reports. Your workflows run smoother.
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
        </div>
      </div>
    </section>
  );
};

const caseStudies = [
  {
    badge: 'Featured',
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
    impact: '10+ hours/day reclaimed. Zero off-brand outreach. Compliance-friendly architecture.',
    accent: 'amber',
  },
  {
    badge: 'Live',
    industry: 'E-commerce / Service Business',
    title: 'WhatsApp Customer Service AI Agent',
    challenge: 'After-hours inquiries lost as missed messages. Every missed message can become lost revenue.',
    solution: 'A WhatsApp + Telegram AI agent with memory, integrated with Google Sheets as a real-time database. Handles inquiries 24/7.',
    pipeline: [
      'WhatsApp message → AI agent with conversational memory',
      'Auto-logs customer data to Google Sheets database',
      'Smart escalation to human via Telegram on edge cases',
      'Multi-language support with brand voice consistency',
    ],
    stack: ['WhatsApp API', 'OpenAI', 'Google Sheets', 'Telegram'],
    impact: 'Zero missed inquiries. 80% auto-resolved. Customer satisfaction up.',
    accent: 'emerald',
  },
  {
    badge: 'Internal Ops',
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
    impact: 'Document turnaround: 2 hours → 2 minutes.',
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
        <ChapterMark part="Pt. 05" title="Featured Work" color="amber" />
        <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-white">
          Real systems.{' '}
          <em className="italic text-amber-300">Real impact.</em>
        </h2>
        <p className="mt-6 text-lg text-white/60 max-w-2xl leading-relaxed">
          The architectures are real. The results are measured. The methodologies are repeatable.
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

const industries = [
  {
    name: 'E-commerce Shops',
    body: 'Your store never closes. We build AI agents that handle WhatsApp inquiries, answer phone calls about orders, recover abandoned carts, and sync everything to Shopify automatically.',
    tag: 'Shopify · WooCommerce',
  },
  {
    name: 'Real Estate Agencies',
    body: 'Our AI handles WhatsApp leads, answers property inquiry calls, qualifies buyers, and books viewings — directly into your calendar.',
    tag: 'Agencies · Solo agents',
  },
  {
    name: 'Salons & Clinics',
    body: 'Your phone shouldn\'t ring during appointments. Our voice AI takes booking calls, our WhatsApp AI handles questions, our automation sends reminders and fills cancellations.',
    tag: 'Beauty · Dental · Medical',
  },
  {
    name: 'Coaches & Consultants',
    body: 'We automate discovery, qualify fit, deliver content, and handle onboarding — so you only spend time with ready-to-buy clients.',
    tag: 'Coaching · Consulting',
  },
  {
    name: 'Hotels & Hospitality',
    body: 'Booking inquiries arrive at all hours. Our voice AI takes reservation calls, WhatsApp AI handles guest questions, and automation manages check-in flows.',
    tag: 'Hotels · Restaurants · Delivery',
  },
  {
    name: 'B2B Sales Teams',
    body: 'We build complete outreach engines — lead discovery, enrichment, AI-personalized emails, follow-up sequences. Your reps close, AI does the rest.',
    tag: 'Agencies · SaaS · Services',
  },
];

const IndustriesSection = () => {
  const [active, setActive] = useState(0);

  return (
    <section id="industries" className="relative py-20 md:py-28 bg-gradient-to-b from-zinc-950 to-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mb-16">
          <ChapterMark part="Pt. 06" title="Who We Serve" />
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
    body: 'WhatsApp API, voice agents, AI models, your CRM — all connected, all tested. You see progress every step.',
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
        <ChapterMark part="Pt. 07" title="The Journey" />
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

const FounderSection = () => {
  const [ref, visible] = useReveal();
  return (
    <section id="about" ref={ref} className="relative py-20 md:py-28 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className={`lg:col-span-5 transition-all duration-1000 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="relative aspect-[4/5] max-w-md">
              <div className="absolute -inset-4 bg-gradient-to-br from-emerald-400/20 to-amber-400/10 rounded-3xl blur-2xl" />
              <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                   <img src="/hansani.jpg" alt="Hansani Kavindi" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 px-4 py-3 bg-emerald-400 text-black rounded-2xl font-display italic shadow-xl">
                Hansani Kavindi
              </div>
            </div>
          </div>

          <div className={`lg:col-span-7 transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <ChapterMark part="Pt. 08" title="The Founder" color="amber" />

            <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-white mb-8">
              Built by an{' '}
              <em className="italic text-amber-300">automation</em>
              <br />
              specialist.
            </h2>

            <div className="space-y-5 text-lg text-white/70 leading-relaxed mb-10 pb-10 border-b border-white/10">
              <p>
                Hi, I'm <span className="text-white font-medium">Hansani Kavindi</span> — founder of Kavi Automation.
              </p>
              <p>
                I build AI automation systems for small businesses that want faster replies, cleaner workflows, and less manual work.
              </p>
              <p className="text-white/90">
                My approach is simple: <em className="italic text-emerald-400">AI handles repetitive tasks, humans stay in control, and every workflow is designed with approval, safety, and brand consistency in mind.</em>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-white/50">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>From Romania. Reaching the world.</span>
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

const whyUs = [
  {
    icon: Shield,
    title: 'You stay in control.',
    body: 'Our Human Approval System means AI suggests, you decide. Always. No hallucinations. No off-brand replies. No chaos.',
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
    body: 'Most experts build one piece. We connect every piece. One unified system. Your entire business, running itself.',
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
        <ChapterMark part="Pt. 09" title="Why Us" />
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

const packages = [
  {
    icon: '🌱',
    name: 'Starter',
    tagline: 'Test the waters',
    body: 'Curious about AI automation? Start here with a focused WhatsApp AI bot that handles your most common customer questions.',
    features: ['Basic WhatsApp FAQ Bot', 'OpenAI/Gemini integration', '7–10 day delivery', 'Unlimited revisions'],
    cta: 'Book a Call to Learn More',
    featured: false,
  },
  {
    icon: '🚀',
    name: 'Business',
    tagline: 'Scale with confidence',
    body: 'Ready to grow? Get advanced AI support, CRM integration, and human approval flows that scale with your business.',
    features: [
      'Advanced AI Support Agent',
      'CRM integration (Airtable / Sheets)',
      'Conditional logic & data syncing',
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
    body: 'Going all-in? Full enterprise automation with our signature Human Approval System, multi-platform integration, and ongoing partnership.',
    features: [
      'Complete Business AI Transformation',
      'Voice + WhatsApp + Telegram unified',
      'Sales pipeline automation included',
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
      <p className="text-emerald-400 text-sm uppercase tracking-[0.25em] mb-6">{pkg.tagline}</p>

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
          <ChapterMark part="Pt. 10" title="Investment" />
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
    </div>
  </section>
);

const faqs = [
  {
    q: 'How long does setup typically take?',
    a: 'Anywhere from 1 week for a focused starter project to 4–6 weeks for full enterprise automation. We\'ll give you exact timelines after the discovery call based on your specific scope.',
  },
  {
    q: 'Do I need any technical knowledge to use this?',
    a: 'No. We handle all the technical setup. You\'ll get an intuitive interface — usually WhatsApp itself or a simple dashboard. We also train your team.',
  },
  {
    q: 'What happens if the AI makes a mistake?',
    a: 'AI drafts the response — you approve it before it sends. For high-stakes conversations, you stay in the loop. Always.',
  },
  {
    q: 'Can you integrate with my existing tools?',
    a: 'Almost certainly yes. We work with Airtable, Google Workspace, Notion, Telegram, WhatsApp API, and 400+ other tools.',
  },
  {
    q: 'What\'s the difference between WhatsApp AI and Voice AI?',
    a: 'WhatsApp AI handles text-based conversations. Voice AI handles actual phone calls in natural conversation. Many clients use both.',
  },
  {
    q: 'Do you offer ongoing support after launch?',
    a: 'Yes. Every package includes post-launch support and revisions.',
  },
];

const FAQSection = () => {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-black to-zinc-950">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <ChapterMark part="Pt. 11" title="Questions" />
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
        Book a free 30-minute automation audit. We'll show you exactly where your business is
        leaking time and money — and how to fix it.
      </p>

      <button
        onClick={openBookingModal}
        className="group inline-flex items-center gap-3 px-8 py-5 bg-emerald-400 hover:bg-emerald-300 text-black font-medium rounded-full transition-all hover:scale-105 text-lg"
      >
        Book Your Free Audit
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>

      <p className="mt-8 text-sm text-white/40">
        30 minutes · Free · No commitment
      </p>
    </div>
  </section>
);

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
            We build AI automation systems for WhatsApp, voice, CRM, and customer workflows.
          </p>
          <p className="text-xs text-white/30 italic font-display">
            From Romania. Reaching the world.
          </p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4">Services</h4>
          <ul className="space-y-2 text-white/70 text-sm">
            <li><a href="#services" className="hover:text-emerald-400 transition-colors">Conversational AI</a></li>
            <li><a href="#services" className="hover:text-emerald-400 transition-colors">Voice AI Agents</a></li>
            <li><a href="#services" className="hover:text-emerald-400 transition-colors">Sales Pipelines</a></li>
            <li><a href="#services" className="hover:text-emerald-400 transition-colors">Internal Operations</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4">Connect</h4>
          <ul className="space-y-2 text-white/70 text-sm">
            <li><a href="#" className="hover:text-emerald-400 transition-colors">LinkedIn</a></li>
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

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! I'm Kavi 👋 — Hansani's AI assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState('');

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
      botResponse = "Great! What kind of business do you run? E-commerce, real estate, hospitality, or something else?";
    } else if (reply.includes('pricing')) {
      botResponse = "We have 3 packages — Starter, Business, and Enterprise. Pricing best discussed on a free audit.";
    } else if (reply.includes('Book')) {
      botResponse = "Opening the booking form for you now... ✨";
      setTimeout(() => openBookingModal(), 600);
    } else {
      botResponse = "We automate WhatsApp/Voice conversations, sales pipelines, and internal ops. What's the most repetitive task in your business right now?";
    }

    setMessages([...messages, userMsg, { from: 'bot', text: botResponse }]);
    setStep(step + 1);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input };
    setMessages([
      ...messages,
      userMsg,
      {
        from: 'bot',
        text: "Thanks! Hansani will personally respond within 24 hours. For faster booking, click 'Book Free Audit' above.",
      },
    ]);
    setInput('');
    setStep(step + 1);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl transition-all hover:scale-110 ${
          open ? 'bg-zinc-800' : 'bg-emerald-400'
        }`}
      >
        {open ? (
          <X className="w-6 h-6 text-white mx-auto" />
        ) : (
          <MessageCircle className="w-6 h-6 text-black mx-auto" strokeWidth={2} />
        )}
      </button>

      <div
        className={`fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 max-h-[600px] bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl transition-all overflow-hidden flex flex-col ${
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        <div className="p-5 bg-gradient-to-br from-emerald-950/40 to-zinc-900 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center">
              <span className="font-display font-bold text-black">K</span>
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

        {step === 0 && (
          <div className="px-5 pb-3 flex flex-wrap gap-2">
            {quickReplies.map((reply, i) => (
              <button
                key={i}
                onClick={() => handleQuickReply(reply)}
                className="text-xs px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/70 hover:text-white transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>
        )}

        <div className="p-4 border-t border-white/10 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400/50"
          />
          <button
            onClick={handleSend}
            className="w-10 h-10 bg-emerald-400 hover:bg-emerald-300 rounded-full flex items-center justify-center"
          >
            <Send className="w-4 h-4 text-black" />
          </button>
        </div>
      </div>
    </>
  );
};

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

  useEffect(() => {
    const handler = () => {
      setOpen(true);
      setSubmitted(false);
    };
    window.addEventListener('kavi:openBooking', handler);
    return () => window.removeEventListener('kavi:openBooking', handler);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitted(true);
    setSubmitting(false);
  };

  if (!open) return null;

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
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center z-10"
        >
          <X className="w-4 h-4 text-white/60" />
        </button>

        {!submitted ? (
          <div className="p-8 md:p-10">
            <div className="mb-8">
              <div className="text-xs uppercase tracking-[0.3em] text-emerald-400 mb-3">
                Free Automation Audit
              </div>
              <h3 className="font-display text-3xl md:text-4xl text-white leading-tight mb-3">
                Tell us about your <em className="italic text-emerald-400">business.</em>
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm"
                />
                <input
                  type="email"
                  required
                  placeholder="Email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm"
                />
              </div>
              <input
                type="tel"
                required
                placeholder="WhatsApp Number"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm"
              />
              <select required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm appearance-none">
                <option value="">Select industry</option>
                <option value="ecommerce">E-commerce</option>
                <option value="realestate">Real Estate</option>
                <option value="other">Other</option>
              </select>
              <textarea
                required
                rows={3}
                placeholder="What's your biggest automation challenge?"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm resize-none"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-emerald-400 hover:bg-emerald-300 text-black font-medium rounded-full transition-all flex items-center justify-center gap-2"
              >
                {submitting ? 'Sending...' : 'Send Inquiry'}
              </button>
            </form>
          </div>
        ) : (
          <div className="p-10 text-center">
            <CheckCircle2 className="w-16 h-16 mx-auto mb-6 text-emerald-400" />
            <h3 className="font-display text-3xl text-white mb-3">Thank you!</h3>
            <p className="text-white/70 mb-8">Hansani will personally respond within 12-24 hours.</p>
            <button onClick={() => setOpen(false)} className="px-6 py-3 bg-white/5 text-white rounded-full border border-white/10">Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function KaviAutomationLanding() {
  return (
    <div className="min-h-screen bg-black text-white font-body antialiased relative overflow-x-hidden">
      <FontLoader />
      <Nav />
      <main>
        <Hero />
        <PainSection />
        <TransformSection />
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
