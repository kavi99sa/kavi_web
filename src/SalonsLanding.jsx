import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Calendar,
  Clock,
  Layers,
  Mail,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react';

const salonHeroImage = '/salon-hero-premium.png';
const languageStorageKey = 'kavi-salons-language';
const auditCalendlyUrl = 'https://calendly.com/kavi-kaviautomation/audit-gratuit-pentru-salon-15-min';

const isExternalLink = (href) => /^https?:\/\//.test(href);

const salonCopy = {
  ro: {
    meta: {
      brandLine: 'Creștere salon',
      heroAlt: 'Interior elegant de salon premium cu oglinzi calde și detalii champagne',
      detailAlt: 'Detalii calde dintr-un salon premium',
    },
    nav: {
      story: 'Poveste',
      tools: 'Instrumente',
      experience: 'Experiență',
      services: 'Servicii',
      audit: 'Audit gratuit',
    },
    hero: {
      badge: 'Frumusețe premium + tehnologie calmă',
      headline: 'Nu mai pierde cliente din cauza mesajelor necitite.',
      subheadline:
        'Un mesaj întârziat poate deveni o programare pierdută. Kavi Automation ajută saloanele din România să răspundă mai clar, să reducă no-show-urile și să transforme primul mesaj într-o experiență mai bună.',
      coreLine: 'Experiența clientei nu începe când intră în salon. Începe de la primul mesaj.',
      primaryCta: 'Primește auditul gratuit',
      secondaryCta: 'Calculează pierderile din no-show-uri',
      messageLabel: 'mesaj nou',
      message: 'Bună seara, aveți un loc liber săptămâna asta pentru balayage?',
      messageHint: 'Răspunsul rapid păstrează intenția caldă.',
    },
    story: {
      eyebrow: 'Povestea reală',
      title: 'Totul începe cu un mesaj',
      body: 'În salon, calitatea se vede la oglindă. Înainte de salon, calitatea se simte în felul în care clienta este întâmpinată.',
      steps: [
        {
          time: '19:42',
          title: 'Clienta trimite mesajul',
          body: 'A văzut un rezultat pe Instagram și are deja intenția de programare.',
        },
        {
          time: '20:18',
          title: 'Așteptarea schimbă emoția',
          body: 'Nu știe dacă salonul a văzut mesajul, dacă are loc sau dacă prețul i se potrivește.',
        },
        {
          time: '20:31',
          title: 'Rezervă în altă parte',
          body: 'Alt salon răspunde simplu, clar și cald. Programarea se mută fără zgomot.',
        },
      ],
      chatTitle: 'Salon Elegant',
      chatStatus: 'online acum 2h',
      chatMessages: [
        { from: 'client', text: 'Bună, aveți disponibil joi sau vineri?' },
        { from: 'salon', text: 'Bună! Îți verific imediat intervalele potrivite.' },
        { from: 'salon', text: 'Pentru balayage avem joi la 17:30 sau vineri la 12:00. Vrei să îți rezerv?' },
      ],
    },
    problems: {
      eyebrow: 'Unde se pierde creșterea',
      title: 'Problemele mici devin scurgeri mari în agendă.',
      body: 'Nu este despre a lucra mai mult. Este despre a închide buclele care se repetă în fiecare săptămână.',
      cards: [
        {
          title: 'Mesaje pierdute',
          body: 'Cereri care rămân jos în inbox exact când clienta caută un interval liber.',
          icon: MessageCircle,
        },
        {
          title: 'Răspunsuri întârziate',
          body: 'Un răspuns venit după câteva ore schimbă energia conversației și reduce șansa de rezervare.',
          icon: Clock,
        },
        {
          title: 'No-show-uri',
          body: 'Programări uitate sau confirmări neclare care lasă scaunul gol în mijlocul zilei.',
          icon: Calendar,
        },
        {
          title: 'Puține recenzii Google',
          body: 'Cliente mulțumite care pleacă frumos, dar nu primesc niciodată mesajul potrivit de follow-up.',
          icon: Award,
        },
        {
          title: 'Lipsă de idei pentru Reels',
          body: 'Conținutul se amână până devine presiune, nu un ritm simplu de promovare.',
          icon: Sparkles,
        },
        {
          title: 'Follow-up uitat',
          body: 'Cliente care ar reveni mai repede dacă ar primi un mesaj cald, personal și la timp.',
          icon: Send,
        },
      ],
    },
    tools: {
      eyebrow: 'Instrumente gratuite',
      title: 'Începe cu o claritate mică. Apoi transform-o într-un sistem.',
      body: 'Aceste resurse sunt gândite pentru proprietare și manageri de saloane care vor să vadă rapid unde se pierde valoare.',
      freeLabel: 'gratuit',
      openLabel: 'Deschide',
      items: [
        {
          title: 'Calculator pierderi no-show',
          body: 'Vezi cât costă lunar programările la care clientele nu mai ajung.',
          href: '/salons/no-show-calculator',
          icon: TrendingUp,
        },
        {
          title: 'Scor automatizare salon',
          body: 'Un scor rapid pentru mesaje, confirmări, recenzii și follow-up-ul salonului.',
          href: '/salons/guides',
          icon: Target,
        },
        {
          title: 'Generator mesaje recenzii Google',
          body: 'Texte elegante pentru a cere recenzii fără să pară insistent sau rece.',
          href: '/salons/guides',
          icon: Award,
        },
        {
          title: 'Generator răspunsuri cliente',
          body: 'Răspunsuri clare pentru prețuri, disponibilitate, anulări și întrebări repetitive.',
          href: '/salons/guides',
          icon: MessageCircle,
        },
        {
          title: 'Generator calendar marketing salon',
          body: 'Idei de campanii, postări și oferte potrivite pentru ritmul unui salon.',
          href: '/salons/guides',
          icon: Calendar,
        },
        {
          title: 'Generator hook-uri Reels',
          body: 'Hook-uri scurte pentru rezultate, transformări, educație și oferte sezoniere.',
          href: '/salons/guides',
          icon: Zap,
        },
      ],
    },
    ask: {
      eyebrow: 'Asistent Kavi',
      title: 'Întreabă Asistentul Kavi pentru salonul tău',
      body: 'Nu știi de unde pierde salonul tău programări? Asistentul Kavi te poate ghida prin câteva întrebări simple și îți poate recomanda primul pas: audit, calculator, mesaje, recenzii sau automatizare.',
      cta: 'Vorbește cu Kavi AI',
      chips: [
        'De ce pierd programări?',
        'Cum reduc no-show-urile?',
        'Ce să postez pe Instagram?',
        'Cum cer recenzii Google?',
        'Ce pot automatiza in salon?',
      ],
    },
    experience: {
      eyebrow: 'Experiența clientei',
      title: 'Clienta vine pentru serviciu. Dar revine pentru sentiment.',
      body: 'Un salon premium nu se simte premium doar la scaun. Se simte în confirmare, în tonul mesajului, în liniștea că programarea este clară și în follow-up-ul care nu forțează.',
      chips: ['Claritate', 'Grijă', 'Ritm'],
      imageLine: 'O clientă liniștită confirmă mai ușor, revine mai firesc și recomandă mai des.',
    },
    services: {
      eyebrow: 'Sistem de creștere',
      title: 'Servicii create pentru ritmul unui salon.',
      body: 'Nu ai nevoie de încă o platformă rece. Ai nevoie de mesaje, fluxuri și idei care se potrivesc cu felul în care clientele aleg un salon.',
      cta: 'Vezi serviciile pentru saloane',
      startAudit: 'Începe cu auditul',
      items: [
        {
          title: 'Plan personalizat de creștere pentru salon',
          body: 'O hartă clară pentru unde se pierd cliente, timp și recenzii în fluxul tău actual.',
          icon: Target,
        },
        {
          title: 'Kit de comunicare pentru salon',
          body: 'Mesaje pentru prețuri, programări, reprogramări, confirmări și întrebări frecvente.',
          icon: Mail,
        },
        {
          title: 'Kit de conținut și oferte',
          body: 'Idei de conținut și oferte care se simt premium, nu agresive.',
          icon: Sparkles,
        },
        {
          title: 'Automatizare no-show',
          body: 'Confirmări și remindere discrete, create pentru a proteja agenda salonului.',
          icon: Calendar,
        },
        {
          title: 'Automatizare recenzii Google',
          body: 'Follow-up după vizită, cu mesaje naturale care cresc șansele de recenzii bune.',
          icon: Award,
        },
        {
          title: 'Asistent digital de recepție pentru saloane',
          body: 'Un asistent de conversație pentru întrebări repetitive, programări și triere elegantă.',
          icon: Phone,
        },
        {
          title: 'Sistem lunar de creștere pentru salon',
          body: 'Un ritm lunar de optimizare pentru comunicare, conținut, oferte și retenție.',
          icon: Layers,
        },
      ],
    },
    metrics: [
      { value: '1 mesaj', label: 'poate decide unde merge clienta' },
      { value: '24/7', label: 'claritate fără presiune pe echipă' },
      { value: 'mai mult', label: 'spațiu pentru servicii, recenzii și reveniri' },
    ],
    finalCta: {
      eyebrow: 'Următorul pas',
      title: 'Vrei să vezi unde pierde salonul tău timp, programări sau recenzii?',
      body: 'Primești o privire clară asupra comunicării salonului tău și câteva recomandări simple pe care le poți folosi imediat.',
      cta: 'Primește auditul gratuit',
    },
    footer: {
      brandLine: 'Creștere saloane România',
      audit: 'Audit gratuit',
      services: 'Servicii',
      guides: 'Ghiduri',
    },
    placeholders: {
      '/salons/audit': {
        eyebrow: 'Audit gratuit',
        title: 'Auditul gratuit pentru salonul tău este pregătit aici.',
        body: 'Această rută este rezervată pentru formularul de audit. Până la conectarea formularului, pagina păstrează experiența pentru saloane și direcționează clienta înapoi către povestea completă.',
        cta: 'Înapoi la pagina pentru saloane',
        href: '/salons',
        secondary: 'Calculează no-show-uri',
        secondaryHref: '/salons/no-show-calculator',
      },
      '/salons/no-show-calculator': {
        eyebrow: 'Calculator no-show',
        title: 'Calculatorul de pierderi din no-show-uri va locui aici.',
        body: 'Ruta este gata pentru un instrument dedicat care să estimeze impactul programărilor ratate și să transforme problema într-un număr ușor de înțeles.',
        cta: 'Vezi pagina pentru saloane',
        href: '/salons',
        secondary: 'Primește auditul gratuit',
        secondaryHref: auditCalendlyUrl,
      },
      '/salons/services': {
        eyebrow: 'Servicii pentru saloane',
        title: 'Serviciile dedicate saloanelor vor fi detaliate aici.',
        body: 'Această rută poate deveni o pagină separată pentru pachete, livrabile, exemple de mesaje și modul în care Kavi Automation implementează sistemul lunar de creștere.',
        cta: 'Înapoi la servicii',
        href: '/salons#services',
        secondary: 'Primește auditul gratuit',
        secondaryHref: auditCalendlyUrl,
      },
      '/salons/guides': {
        eyebrow: 'Ghiduri si instrumente',
        title: 'Ghidurile gratuite pentru saloane vor apărea aici.',
        body: 'Ruta este pregătită pentru generatoare, calendare de marketing și resurse rapide care ajută salonul să comunice mai clar.',
        cta: 'Vezi instrumentele gratuite',
        href: '/salons#tools',
        secondary: 'Primește auditul gratuit',
        secondaryHref: auditCalendlyUrl,
      },
    },
  },
  en: {
    meta: {
      brandLine: 'Salon Growth',
      heroAlt: 'Elegant premium salon interior with warm mirrors and champagne details',
      detailAlt: 'Warm details from a premium salon',
    },
    nav: {
      story: 'Story',
      tools: 'Tools',
      experience: 'Experience',
      services: 'Services',
      audit: 'Free audit',
    },
    hero: {
      badge: 'Premium Beauty + Calm Tech',
      headline: 'Stop losing clients because of unread messages.',
      subheadline:
        'A delayed message can become a lost booking. Kavi Automation helps salons in Romania reply more clearly, reduce no-shows, and turn the first message into a better client experience.',
      coreLine: 'The client experience does not start when she walks into the salon. It starts with the first message.',
      primaryCta: 'Get the free audit',
      secondaryCta: 'Calculate no-show losses',
      messageLabel: 'new message',
      message: 'Good evening, do you have an opening this week for balayage?',
      messageHint: 'A fast reply keeps the booking intent warm.',
    },
    story: {
      eyebrow: 'Real story',
      title: 'Everything starts with a message',
      body: 'In the salon, quality is seen in the mirror. Before the salon, quality is felt in the way the client is welcomed.',
      steps: [
        {
          time: '7:42 PM',
          title: 'The client sends a message',
          body: 'She saw a result on Instagram and already has booking intent.',
        },
        {
          time: '8:18 PM',
          title: 'Waiting changes the feeling',
          body: 'She does not know if the salon saw the message, has availability, or fits her budget.',
        },
        {
          time: '8:31 PM',
          title: 'She books somewhere else',
          body: 'Another salon replies simply, clearly, and warmly. The booking moves quietly.',
        },
      ],
      chatTitle: 'Elegant Salon',
      chatStatus: 'online 2h ago',
      chatMessages: [
        { from: 'client', text: 'Hi, do you have availability on Thursday or Friday?' },
        { from: 'salon', text: 'Hi! I am checking the best times for you now.' },
        { from: 'salon', text: 'For balayage, we have Thursday at 5:30 PM or Friday at 12:00. Would you like me to reserve it?' },
      ],
    },
    problems: {
      eyebrow: 'Where growth leaks',
      title: 'Small problems become major gaps in the calendar.',
      body: 'It is not about working more. It is about closing the loops that repeat every week.',
      cards: [
        {
          title: 'Lost messages',
          body: 'Requests that stay buried in the inbox exactly when a client is looking for an available slot.',
          icon: MessageCircle,
        },
        {
          title: 'Delayed replies',
          body: 'A reply sent hours later changes the energy of the conversation and lowers the chance of booking.',
          icon: Clock,
        },
        {
          title: 'No-shows',
          body: 'Forgotten appointments or unclear confirmations that leave an empty chair in the middle of the day.',
          icon: Calendar,
        },
        {
          title: 'Too few Google reviews',
          body: 'Happy clients leave beautifully, but never receive the right follow-up message.',
          icon: Award,
        },
        {
          title: 'Not enough Reels ideas',
          body: 'Content gets delayed until it becomes pressure instead of a simple marketing rhythm.',
          icon: Sparkles,
        },
        {
          title: 'Forgotten follow-up',
          body: 'Clients who would return sooner if they received a warm, personal message at the right time.',
          icon: Send,
        },
      ],
    },
    tools: {
      eyebrow: 'Free tools',
      title: 'Start with a small moment of clarity. Then turn it into a system.',
      body: 'These resources are built for salon owners and managers who want to see quickly where value is being lost.',
      freeLabel: 'free',
      openLabel: 'Open',
      items: [
        {
          title: 'No-show Loss Calculator',
          body: 'See how much missed appointments cost your salon each month.',
          href: '/salons/no-show-calculator',
          icon: TrendingUp,
        },
        {
          title: 'Salon Automation Score',
          body: 'A quick score for your messages, confirmations, reviews, and follow-up.',
          href: '/salons/guides',
          icon: Target,
        },
        {
          title: 'Google Review Message Generator',
          body: 'Elegant messages for asking for reviews without sounding pushy or cold.',
          href: '/salons/guides',
          icon: Award,
        },
        {
          title: 'Client Reply Generator',
          body: 'Clear replies for prices, availability, cancellations, and repetitive questions.',
          href: '/salons/guides',
          icon: MessageCircle,
        },
        {
          title: 'Salon Marketing Calendar Generator',
          body: 'Campaign, post, and offer ideas that fit the rhythm of a salon.',
          href: '/salons/guides',
          icon: Calendar,
        },
        {
          title: 'Reel Hook Generator',
          body: 'Short hooks for results, transformations, education, and seasonal offers.',
          href: '/salons/guides',
          icon: Zap,
        },
      ],
    },
    ask: {
      eyebrow: 'Kavi assistant',
      title: 'Ask Kavi AI for your salon',
      body: 'Not sure where your salon is losing bookings? Kavi AI can guide you through a few simple questions and recommend the first step: audit, calculator, messages, reviews, or automation.',
      cta: 'Talk to Kavi AI',
      chips: [
        'Why am I losing bookings?',
        'How do I reduce no-shows?',
        'What should I post on Instagram?',
        'How do I ask for Google reviews?',
        'What can I automate in my salon?',
      ],
    },
    experience: {
      eyebrow: 'Client experience',
      title: 'She comes for the service. But she returns for the feeling.',
      body: 'A premium salon does not feel premium only in the chair. It feels premium in the confirmation, in the tone of the message, in the calm of a clear booking, and in the follow-up that does not push.',
      chips: ['Clarity', 'Care', 'Rhythm'],
      imageLine: 'A calm client confirms more easily, returns more naturally, and recommends you more often.',
    },
    services: {
      eyebrow: 'Growth system',
      title: 'Services built for the rhythm of a salon.',
      body: 'You do not need another cold platform. You need messages, flows, and ideas that match the way clients choose a salon.',
      cta: 'See salon services',
      startAudit: 'Start with the audit',
      items: [
        {
          title: 'Personalized Salon Growth Plan',
          body: 'A clear map of where clients, time, and reviews are being lost in your current flow.',
          icon: Target,
        },
        {
          title: 'Salon Communication Kit',
          body: 'Messages for prices, bookings, rescheduling, confirmations, and frequently asked questions.',
          icon: Mail,
        },
        {
          title: 'Content & Offer Kit',
          body: 'Content and offer ideas that feel premium, not aggressive.',
          icon: Sparkles,
        },
        {
          title: 'No-show Automation',
          body: 'Discreet confirmations and reminders created to protect the salon calendar.',
          icon: Calendar,
        },
        {
          title: 'Google Review Automation',
          body: 'Post-visit follow-up with natural messages that increase the chance of strong reviews.',
          icon: Award,
        },
        {
          title: 'AI Receptionist for Salons',
          body: 'A conversation assistant for repetitive questions, bookings, and elegant triage.',
          icon: Phone,
        },
        {
          title: 'Monthly Salon Growth System',
          body: 'A monthly rhythm for improving communication, content, offers, and retention.',
          icon: Layers,
        },
      ],
    },
    metrics: [
      { value: '1 message', label: 'can decide where the client books' },
      { value: '24/7', label: 'clarity without pressure on your team' },
      { value: 'more', label: 'space for services, reviews, and returns' },
    ],
    finalCta: {
      eyebrow: 'Next step',
      title: 'Want to see where your salon is losing time, bookings, or reviews?',
      body: 'You get a clear look at your salon communication and a few simple recommendations you can use immediately.',
      cta: 'Get the free audit',
    },
    footer: {
      brandLine: 'Salon Growth Romania',
      audit: 'Free audit',
      services: 'Services',
      guides: 'Guides',
    },
    placeholders: {
      '/salons/audit': {
        eyebrow: 'Free audit',
        title: 'The free audit for your salon is prepared here.',
        body: 'This route is reserved for the audit form. Until the form is connected, the page keeps the salon-friendly experience and sends the client back to the full story.',
        cta: 'Back to the salon page',
        href: '/salons',
        secondary: 'Calculate no-shows',
        secondaryHref: '/salons/no-show-calculator',
      },
      '/salons/no-show-calculator': {
        eyebrow: 'No-show calculator',
        title: 'The no-show loss calculator will live here.',
        body: 'This route is ready for a dedicated tool that estimates the impact of missed appointments and turns the problem into an easy-to-understand number.',
        cta: 'See the salon page',
        href: '/salons',
        secondary: 'Get the free audit',
        secondaryHref: auditCalendlyUrl,
      },
      '/salons/services': {
        eyebrow: 'Salon services',
        title: 'The dedicated salon services will be detailed here.',
        body: 'This route can become a separate page for packages, deliverables, message examples, and how Kavi Automation implements the monthly growth system.',
        cta: 'Back to services',
        href: '/salons#services',
        secondary: 'Get the free audit',
        secondaryHref: auditCalendlyUrl,
      },
      '/salons/guides': {
        eyebrow: 'Guides and tools',
        title: 'The free salon guides will appear here.',
        body: 'This route is prepared for generators, marketing calendars, and quick resources that help the salon communicate more clearly.',
        cta: 'See free tools',
        href: '/salons#tools',
        secondary: 'Get the free audit',
        secondaryHref: auditCalendlyUrl,
      },
    },
  },
};

const getInitialLanguage = () => {
  if (typeof window === 'undefined') return 'ro';

  try {
    return window.localStorage.getItem(languageStorageKey) === 'en' ? 'en' : 'ro';
  } catch {
    return 'ro';
  }
};

const SalonStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');

    .salon-page {
      --salon-espresso: #110b09;
      --salon-charcoal: #171514;
      --salon-ivory: #fbf4e8;
      --salon-muted: #cbbcac;
      --salon-blush: #d8a89b;
      --salon-gold: #d8b46a;
      --salon-emerald: #0f8f67;
      --salon-emerald-soft: #38c995;
      font-family: 'Manrope', system-ui, sans-serif;
      background: var(--salon-espresso);
      color: var(--salon-ivory);
    }

    .salon-display {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-feature-settings: "liga", "kern";
    }

    .salon-grain::before {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: 0.055;
      mix-blend-mode: soft-light;
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.65'/%3E%3C/svg%3E");
    }

    .salon-reveal {
      opacity: 0;
      transform: translateY(22px);
      transition: opacity 760ms cubic-bezier(0.16, 1, 0.3, 1), transform 760ms cubic-bezier(0.16, 1, 0.3, 1);
      will-change: opacity, transform;
    }

    .salon-reveal.is-visible {
      opacity: 1;
      transform: translateY(0);
    }

    .salon-card {
      transition: transform 360ms ease, border-color 360ms ease, background 360ms ease, box-shadow 360ms ease;
    }

    .salon-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 22px 60px rgba(0, 0, 0, 0.28);
    }

    .salon-section-glow {
      background:
        linear-gradient(180deg, rgba(216, 180, 106, 0.075), transparent 28rem),
        linear-gradient(90deg, rgba(15, 143, 103, 0.045), transparent 52%);
    }

    @media (prefers-reduced-motion: reduce) {
      .salon-reveal,
      .salon-card,
      .salon-page * {
        animation: none !important;
        transition: none !important;
        scroll-behavior: auto !important;
      }
      .salon-reveal {
        opacity: 1 !important;
        transform: none !important;
      }
    }
  `}</style>
);

const useSalonReveal = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
};

const Reveal = ({ children, className = '', delay = 0, as: Tag = 'div' }) => {
  const [ref, visible] = useSalonReveal();

  return (
    <Tag
      ref={ref}
      className={`salon-reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  );
};

const Eyebrow = ({ children }) => (
  <div className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.34em] text-[#d8b46a]">
    <span className="h-px w-8 bg-[#d8b46a]/70" />
    <span>{children}</span>
  </div>
);

const SectionHeader = ({ eyebrow, title, body, centered = false }) => (
  <Reveal className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
    <div className={centered ? 'flex justify-center' : ''}>
      <Eyebrow>{eyebrow}</Eyebrow>
    </div>
    <h2 className="salon-display text-4xl font-semibold leading-[1.02] text-[#fbf4e8] sm:text-5xl md:text-6xl">
      {title}
    </h2>
    {body && <p className="mt-5 text-base leading-8 text-[#cbbcac] sm:text-lg">{body}</p>}
  </Reveal>
);

const CTAButton = ({ children, href, variant = 'primary', className = '' }) => {
  const isExternal = isExternalLink(href);
  const base =
    'group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#110b09]';
  const variants = {
    primary:
      'bg-[#0f8f67] text-white shadow-[0_16px_40px_rgba(15,143,103,0.28)] hover:bg-[#10a879] hover:shadow-[0_20px_52px_rgba(15,143,103,0.34)] focus:ring-[#38c995]',
    secondary:
      'border border-[#fbf4e8]/18 bg-[#fbf4e8]/8 text-[#fbf4e8] hover:border-[#d8b46a]/45 hover:bg-[#fbf4e8]/12 focus:ring-[#d8b46a]',
  };

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      className={`${base} ${variants[variant]} ${className}`}
    >
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
};

const LanguageToggle = ({ language, onChange }) => (
  <div className="flex items-center rounded-full border border-[#fbf4e8]/14 bg-[#fbf4e8]/7 p-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#cbbcac]">
    {['ro', 'en'].map((option) => (
      <button
        key={option}
        type="button"
        onClick={() => onChange(option)}
        className={`rounded-full px-2.5 py-1.5 transition-all sm:px-3 ${
          language === option
            ? 'bg-[#fbf4e8] text-[#110b09]'
            : 'text-[#cbbcac] hover:text-[#fbf4e8]'
        }`}
        aria-pressed={language === option}
      >
        {option.toUpperCase()}
      </button>
    ))}
  </div>
);

const SalonNav = ({ t, language, onLanguageChange }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-[#fbf4e8]/10 bg-[#110b09]/86 shadow-2xl shadow-black/20 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4 sm:px-6 lg:px-10">
        <a href="/salons" className="group flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d8b46a]/45 bg-[#fbf4e8]/8 text-[#fbf4e8] transition-colors group-hover:border-[#0f8f67]/60">
            <span className="salon-display text-xl font-bold leading-none">K</span>
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-sm font-bold text-[#fbf4e8]">Kavi Automation</span>
            <span className="block truncate text-[10px] uppercase tracking-[0.24em] text-[#cbbcac]/70">{t.meta.brandLine}</span>
          </span>
        </a>

        <div className="hidden items-center gap-7 text-sm font-medium text-[#cbbcac] md:flex">
          <a href="/salons#story" className="transition-colors hover:text-[#fbf4e8]">{t.nav.story}</a>
          <a href="/salons#tools" className="transition-colors hover:text-[#fbf4e8]">{t.nav.tools}</a>
          <a href="/salons#experience" className="transition-colors hover:text-[#fbf4e8]">{t.nav.experience}</a>
          <a href="/salons#services" className="transition-colors hover:text-[#fbf4e8]">{t.nav.services}</a>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <LanguageToggle language={language} onChange={onLanguageChange} />
          <a
            href={auditCalendlyUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#0f8f67] px-3 py-2 text-xs font-bold text-white shadow-lg shadow-[#0f8f67]/20 transition-all hover:bg-[#10a879] sm:px-5 sm:text-sm"
          >
            {t.nav.audit}
          </a>
        </div>
      </div>
    </nav>
  );
};

const SalonLayout = ({ children, t, language, onLanguageChange }) => (
  <div className="salon-page min-h-screen overflow-x-hidden antialiased">
    <SalonStyles />
    <SalonNav t={t} language={language} onLanguageChange={onLanguageChange} />
    {children}
    <SalonFooter t={t} />
  </div>
);

const Hero = ({ t }) => (
  <section className="salon-grain relative flex min-h-[92svh] items-end overflow-hidden pt-28">
    <img
      src={salonHeroImage}
      alt={t.meta.heroAlt}
      className="absolute inset-0 h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,11,9,0.96)_0%,rgba(17,11,9,0.86)_34%,rgba(17,11,9,0.48)_66%,rgba(17,11,9,0.58)_100%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,11,9,0.08),#110b09_98%),linear-gradient(90deg,rgba(216,180,106,0.12),transparent_42%)]" />

    <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-5 pb-16 sm:px-6 sm:pb-20 lg:grid-cols-12 lg:px-10">
      <div className="max-w-4xl lg:col-span-8">
        <Reveal>
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#d8b46a]/24 bg-[#fbf4e8]/8 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#d8b46a] backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            {t.hero.badge}
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="salon-display max-w-4xl text-5xl font-semibold leading-[0.96] text-[#fbf4e8] sm:text-6xl md:text-7xl lg:text-8xl">
            {t.hero.headline}
          </h1>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-7 max-w-2xl text-base leading-8 text-[#f1e4d4]/86 sm:text-lg md:text-xl">
            {t.hero.subheadline}
          </p>
        </Reveal>
        <Reveal delay={220}>
          <p className="mt-7 max-w-2xl border-l border-[#d8b46a]/55 pl-5 text-lg leading-8 text-[#fbf4e8] sm:text-xl">
            {t.hero.coreLine}
          </p>
        </Reveal>
        <Reveal delay={280} className="mt-9 flex flex-col gap-3 sm:flex-row">
          <CTAButton href={auditCalendlyUrl}>{t.hero.primaryCta}</CTAButton>
          <CTAButton href="/salons/no-show-calculator" variant="secondary">
            {t.hero.secondaryCta}
          </CTAButton>
        </Reveal>
      </div>

      <Reveal delay={340} className="hidden self-end lg:col-span-4 lg:block">
        <div className="ml-auto max-w-sm rounded-lg border border-[#fbf4e8]/14 bg-[#1a1210]/68 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-[#cbbcac]/70">
            <span>{t.hero.messageLabel}</span>
            <span>19:42</span>
          </div>
          <div className="rounded-lg bg-[#fbf4e8]/10 p-4 text-sm leading-7 text-[#fbf4e8]">
            {t.hero.message}
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-[#cbbcac]">
            <span className="h-2 w-2 rounded-full bg-[#0f8f67]" />
            <span>{t.hero.messageHint}</span>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

const StorySection = ({ t }) => (
  <section id="story" className="salon-section-glow relative bg-[#110b09] py-20 sm:py-24 lg:py-32">
    <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-12 lg:px-10">
      <div className="lg:col-span-5">
        <SectionHeader eyebrow={t.story.eyebrow} title={t.story.title} body={t.story.body} />
      </div>

      <div className="lg:col-span-7">
        <Reveal className="relative">
          <div className="relative grid gap-8 md:grid-cols-[0.92fr_1.08fr] md:items-center">
            <div className="space-y-5">
              {t.story.steps.map((item, index) => (
                <div key={item.title} className="relative border-l border-[#d8b46a]/24 pl-6">
                  <span className="absolute -left-2 top-1 flex h-4 w-4 rounded-full border border-[#d8b46a]/50 bg-[#19110f]" />
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#d8b46a]">{item.time}</div>
                  <h3 className="salon-display mt-2 text-2xl font-semibold text-[#fbf4e8]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#cbbcac]">{item.body}</p>
                  {index < 2 && <div className="mt-5 h-px w-20 bg-[#fbf4e8]/8" />}
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-[#fbf4e8]/14 bg-[#0d0908]/80 p-4 shadow-2xl shadow-black/24">
              <div className="mb-4 flex items-center justify-between border-b border-[#fbf4e8]/10 pb-4">
                <div>
                  <div className="text-sm font-bold text-[#fbf4e8]">{t.story.chatTitle}</div>
                  <div className="text-xs text-[#cbbcac]/70">{t.story.chatStatus}</div>
                </div>
                <MessageCircle className="h-5 w-5 text-[#d8b46a]" />
              </div>
              <div className="space-y-3 text-sm leading-6">
                {t.story.chatMessages.map((message) => (
                  <div
                    key={message.text}
                    className={`max-w-[86%] rounded-lg px-4 py-3 ${
                      message.from === 'salon'
                        ? 'ml-auto rounded-br-sm bg-[#0f8f67] text-white'
                        : 'rounded-bl-sm bg-[#fbf4e8]/10 text-[#fbf4e8]'
                    }`}
                  >
                    {message.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

const ProblemSection = ({ t }) => (
  <section className="relative bg-[#171514] py-20 sm:py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
      <SectionHeader eyebrow={t.problems.eyebrow} title={t.problems.title} body={t.problems.body} />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {t.problems.cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Reveal key={card.title} delay={index * 55}>
              <article className="salon-card h-full rounded-lg border border-[#fbf4e8]/10 bg-[#fbf4e8]/[0.045] p-6">
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full border border-[#d8b46a]/24 bg-[#d8b46a]/10 text-[#d8b46a]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="salon-display text-2xl font-semibold text-[#fbf4e8]">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#cbbcac]">{card.body}</p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

const ToolsSection = ({ t }) => (
  <section id="tools" className="relative bg-[#110b09] py-20 sm:py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
      <SectionHeader eyebrow={t.tools.eyebrow} title={t.tools.title} body={t.tools.body} centered />

      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {t.tools.items.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <Reveal key={tool.title} delay={index * 50}>
              <a
                href={tool.href}
                className="salon-card group flex h-full min-h-[210px] flex-col justify-between rounded-lg border border-[#fbf4e8]/10 bg-[linear-gradient(145deg,rgba(251,244,232,0.075),rgba(251,244,232,0.028))] p-6"
              >
                <div>
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0f8f67]/16 text-[#38c995]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-[#d8b46a]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#d8b46a]">
                      {t.tools.freeLabel}
                    </span>
                  </div>
                  <h3 className="salon-display text-2xl font-semibold text-[#fbf4e8]">{tool.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#cbbcac]">{tool.body}</p>
                </div>
                <div className="mt-7 flex items-center gap-2 text-sm font-bold text-[#38c995]">
                  <span>{t.tools.openLabel}</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </a>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

const AskKaviSection = ({ t }) => (
  <section id="ask-kavi" className="relative overflow-hidden bg-[#171514] py-20 sm:py-24 lg:py-28">
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d8b46a]/28 to-transparent" />
    <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-10">
      <SectionHeader eyebrow={t.ask.eyebrow} title={t.ask.title} body={t.ask.body} />

      <Reveal delay={120}>
        <div className="rounded-lg border border-[#fbf4e8]/10 bg-[#110b09]/54 p-5 shadow-2xl shadow-black/24 sm:p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0f8f67]/16 text-[#38c995]">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#fbf4e8]">Kavi AI</div>
              <div className="text-xs text-[#cbbcac]/70">{t.ask.eyebrow}</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {t.ask.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-[#d8b46a]/20 bg-[#fbf4e8]/6 px-3 py-2 text-xs font-semibold text-[#f1e4d4]"
              >
                {chip}
              </span>
            ))}
          </div>
          <div className="mt-7">
            <CTAButton href="/salons/audit">{t.ask.cta}</CTAButton>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

const ClientExperienceSection = ({ t }) => (
  <section id="experience" className="relative overflow-hidden bg-[#171514] py-20 sm:py-24 lg:py-32">
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d8b46a]/28 to-transparent" />
    <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-10">
      <div className="lg:col-span-6">
        <SectionHeader eyebrow={t.experience.eyebrow} title={t.experience.title} body={t.experience.body} />
        <Reveal delay={120} className="mt-8 grid gap-3 sm:grid-cols-3">
          {t.experience.chips.map((word) => (
            <div key={word} className="rounded-full border border-[#fbf4e8]/10 bg-[#fbf4e8]/6 px-4 py-3 text-center text-sm font-bold text-[#fbf4e8]">
              {word}
            </div>
          ))}
        </Reveal>
      </div>

      <Reveal delay={160} className="lg:col-span-6">
        <div className="relative overflow-hidden rounded-lg border border-[#fbf4e8]/12 bg-[#110b09] shadow-2xl shadow-black/30">
          <img
            src={salonHeroImage}
            alt={t.meta.detailAlt}
            loading="lazy"
            className="h-[420px] w-full object-cover object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#110b09] via-[#110b09]/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="max-w-md">
              <p className="salon-display text-2xl font-semibold leading-tight text-[#fbf4e8] drop-shadow">
                {t.experience.imageLine}
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

const ServicesSection = ({ t }) => (
  <section id="services" className="relative bg-[#110b09] py-20 sm:py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
      <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
        <SectionHeader eyebrow={t.services.eyebrow} title={t.services.title} body={t.services.body} />
        <Reveal className="lg:justify-self-end">
          <CTAButton href="/salons/services" variant="secondary">{t.services.cta}</CTAButton>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {t.services.items.map((service, index) => {
          const Icon = service.icon;
          const featured = index === 6;
          return (
            <Reveal key={service.title} delay={index * 45} className={featured ? 'xl:col-span-3' : ''}>
              <article
                className={`salon-card h-full rounded-lg border p-6 ${
                  featured
                    ? 'border-[#0f8f67]/35 bg-[linear-gradient(135deg,rgba(15,143,103,0.2),rgba(216,180,106,0.08))] md:flex md:items-center md:justify-between md:gap-8'
                    : 'border-[#fbf4e8]/10 bg-[#fbf4e8]/[0.045]'
                }`}
              >
                <div>
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#fbf4e8]/10 bg-[#fbf4e8]/8 text-[#d8b46a]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="salon-display text-2xl font-semibold text-[#fbf4e8]">{service.title}</h3>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-[#cbbcac]">{service.body}</p>
                </div>
                {featured && (
                  <a
                    href={auditCalendlyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#38c995] md:mt-0"
                  >
                    {t.services.startAudit}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                )}
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

const MetricsBand = ({ t }) => (
  <section className="bg-[#171514] py-10">
    <div className="mx-auto grid max-w-7xl gap-3 px-5 sm:grid-cols-3 sm:px-6 lg:px-10">
      {t.metrics.map((item) => (
        <Reveal key={item.value}>
          <div className="rounded-lg border border-[#fbf4e8]/10 bg-[#110b09]/54 px-5 py-6 text-center">
            <div className="salon-display text-3xl font-semibold text-[#d8b46a]">{item.value}</div>
            <div className="mt-1 text-sm text-[#cbbcac]">{item.label}</div>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

const FinalCTA = ({ t }) => (
  <section className="salon-grain relative overflow-hidden bg-[#110b09] py-20 sm:py-24 lg:py-32">
    <div className="absolute inset-0">
      <img src={salonHeroImage} alt="" className="h-full w-full object-cover opacity-18" loading="lazy" />
      <div className="absolute inset-0 bg-[#110b09]/86" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(216,180,106,0.14),transparent_58%)]" />
    </div>
    <Reveal className="relative mx-auto max-w-4xl px-5 text-center sm:px-6">
      <Eyebrow>{t.finalCta.eyebrow}</Eyebrow>
      <h2 className="salon-display text-4xl font-semibold leading-[1.03] text-[#fbf4e8] sm:text-5xl md:text-6xl">
        {t.finalCta.title}
      </h2>
      <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#cbbcac] sm:text-lg">
        {t.finalCta.body}
      </p>
      <div className="mt-9 flex justify-center">
        <CTAButton href={auditCalendlyUrl}>{t.finalCta.cta}</CTAButton>
      </div>
    </Reveal>
  </section>
);

const SalonFooter = ({ t }) => (
  <footer className="border-t border-[#fbf4e8]/10 bg-[#0d0908] px-5 py-8 sm:px-6 lg:px-10">
    <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-[#cbbcac]/70 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <span className="font-bold text-[#fbf4e8]">Kavi Automation</span>
        <span className="mx-2 text-[#d8b46a]/60">/</span>
        {t.footer.brandLine}
      </div>
      <div className="flex flex-wrap gap-4">
        <a href={auditCalendlyUrl} target="_blank" rel="noreferrer" className="hover:text-[#fbf4e8]">{t.footer.audit}</a>
        <a href="/salons/services" className="hover:text-[#fbf4e8]">{t.footer.services}</a>
        <a href="/salons/guides" className="hover:text-[#fbf4e8]">{t.footer.guides}</a>
      </div>
    </div>
  </footer>
);

const SalonHome = ({ t, language, onLanguageChange }) => (
  <SalonLayout t={t} language={language} onLanguageChange={onLanguageChange}>
    <main>
      <Hero t={t} />
      <StorySection t={t} />
      <ProblemSection t={t} />
      <ToolsSection t={t} />
      <AskKaviSection t={t} />
      <ClientExperienceSection t={t} />
      <ServicesSection t={t} />
      <MetricsBand t={t} />
      <FinalCTA t={t} />
    </main>
  </SalonLayout>
);

const PlaceholderPage = ({ route, t, language, onLanguageChange }) => (
  <SalonLayout t={t} language={language} onLanguageChange={onLanguageChange}>
    <main className="salon-grain relative min-h-screen overflow-hidden pt-28">
      <img src={salonHeroImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#110b09_0%,rgba(17,11,9,0.94)_45%,rgba(17,11,9,0.76)_100%)]" />
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] max-w-7xl items-center px-5 py-16 sm:px-6 lg:px-10">
        <Reveal className="max-w-3xl">
          <Eyebrow>{route.eyebrow}</Eyebrow>
          <h1 className="salon-display text-5xl font-semibold leading-[0.98] text-[#fbf4e8] sm:text-6xl md:text-7xl">
            {route.title}
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-[#cbbcac] sm:text-lg">{route.body}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <CTAButton href={route.href}>{route.cta}</CTAButton>
            <CTAButton href={route.secondaryHref} variant="secondary">{route.secondary}</CTAButton>
          </div>
        </Reveal>
      </div>
    </main>
  </SalonLayout>
);

export default function SalonsLanding() {
  const [language, setLanguage] = useState(getInitialLanguage);
  const t = salonCopy[language];
  const pathname =
    typeof window === 'undefined'
      ? '/salons'
      : window.location.pathname.replace(/\/$/, '') || '/salons';
  const route = t.placeholders[pathname];

  useEffect(() => {
    try {
      window.localStorage.setItem(languageStorageKey, language);
    } catch {
      // localStorage can be unavailable in private or restricted browser modes.
    }
    document.documentElement.lang = language;
  }, [language]);

  if (route) {
    return (
      <PlaceholderPage
        route={route}
        t={t}
        language={language}
        onLanguageChange={setLanguage}
      />
    );
  }

  return <SalonHome t={t} language={language} onLanguageChange={setLanguage} />;
}
