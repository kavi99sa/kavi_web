import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Calendar,
  Check,
  ChevronLeft,
  Clock,
  Copy,
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

/* ============================================================
   KAVI AUTOMATION — /salons  (v2, conversion + trust rewrite)
   ------------------------------------------------------------
   PRODUCTION TODOs (marked inline as well):
   1. WHATSAPP_URL  → replace with your real wa.me number.
   2. View state → map to real routes (/salons, /salons/no-show-calculator,
      /salons/tools/recenzii) in your router. In this preview, navigation
      is in-memory so every page can be tested here.
   3. Language persistence → in production you may re-add localStorage;
      it is intentionally removed here (preview sandboxes block it).
   ============================================================ */

const AUDIT_URL =
  'https://calendly.com/kavi-kaviautomation/audit-gratuit-pentru-salon-15-min';

// TODO(production): replace with the real WhatsApp number.
const WHATSAPP_NUMBER = '40700000000';
const WHATSAPP_TEXT = {
  ro: 'Bună! Aș dori auditul gratuit pentru salonul meu.',
  en: 'Hi! I would like the free audit for my salon.',
};
const waUrl = (lang) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_TEXT[lang] || WHATSAPP_TEXT.ro
  )}`;

const calculatorDefaults = {
  averagePrice: 250,
  appointmentsPerMonth: 120,
  noShowsPerMonth: 8,
};

/* ------------------------------------------------------------
   COPY — Romanian first (default), English mirror.
   ------------------------------------------------------------ */

const salonCopy = {
  ro: {
    meta: { brandLine: 'Creștere salon' },
    nav: {
      story: 'Poveste',
      tools: 'Instrumente',
      services: 'Servicii',
      process: 'Cum lucrăm',
      audit: 'Audit gratuit',
    },
    hero: {
      badge: 'Frumusețe premium + tehnologie calmă',
      headline: 'Nu mai pierde cliente din cauza mesajelor necitite.',
      subheadline:
        'Un mesaj întârziat poate deveni o programare pierdută. Kavi Automation ajută saloanele din România să răspundă mai repede, să reducă no-show-urile și să transforme primul mesaj într-o experiență premium.',
      coreLine:
        'Experiența clientei nu începe când intră în salon. Începe de la primul mesaj.',
      primaryCta: 'Primește auditul gratuit',
      whatsappCta: 'Scrie-ne pe WhatsApp',
      calcLink: 'Sau calculează pierderile din no-show-uri',
      messageLabel: 'mesaj nou',
      messageTime: '19:42',
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
      chatStatus: 'răspunde instant',
      chatMessages: [
        { from: 'client', text: 'Bună, aveți disponibil joi sau vineri?' },
        { from: 'salon', text: 'Bună! Îți verific imediat intervalele potrivite.' },
        {
          from: 'salon',
          text: 'Pentru balayage avem joi la 17:30 sau vineri la 12:00. Vrei să îți rezerv?',
        },
      ],
    },
    problems: {
      eyebrow: 'Unde se pierde creșterea',
      title: 'Problemele mici devin scurgeri mari în agendă.',
      body: 'Nu este despre a lucra mai mult. Este despre a închide buclele care se repetă în fiecare săptămână.',
      cards: [
        {
          title: 'Mesaje pierdute',
          body: 'Cereri care se pierd în inbox exact când clienta caută un interval liber.',
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
      body: 'Două instrumente sunt gata de folosit chiar acum. Restul se lansează pe rând — fără promisiuni goale.',
      freeLabel: 'gratuit',
      openLabel: 'Deschide',
      soonLabel: 'în curând',
      items: [
        {
          id: 'calculator',
          title: 'Calculator pierderi no-show',
          body: 'Vezi cât costă lunar programările la care clientele nu mai ajung.',
          icon: TrendingUp,
          live: true,
        },
        {
          id: 'reviews',
          title: 'Generator mesaje recenzii Google',
          body: 'Texte elegante pentru a cere recenzii fără să sune insistent sau rece.',
          icon: Award,
          live: true,
        },
        {
          id: 'score',
          title: 'Scor automatizare salon',
          body: 'Un scor rapid pentru mesaje, confirmări, recenzii și follow-up-ul salonului.',
          icon: Target,
          live: false,
        },
        {
          id: 'replies',
          title: 'Generator răspunsuri cliente',
          body: 'Răspunsuri clare pentru prețuri, disponibilitate, anulări și întrebări repetitive.',
          icon: MessageCircle,
          live: false,
        },
        {
          id: 'marketing',
          title: 'Generator calendar marketing',
          body: 'Idei de campanii, postări și oferte potrivite pentru ritmul unui salon.',
          icon: Calendar,
          live: false,
        },
        {
          id: 'reels',
          title: 'Generator hook-uri Reels',
          body: 'Hook-uri scurte pentru rezultate, transformări, educație și oferte sezoniere.',
          icon: Zap,
          live: false,
        },
      ],
    },
    guide: {
      eyebrow: 'Ghid rapid',
      title: 'Întrebările pe care le auzim cel mai des',
      body: 'Atinge o întrebare și primești un răspuns scurt, sincer — plus primul pas concret. Așa va simți și clienta ta un asistent care răspunde imediat.',
      hint: 'Atinge o întrebare',
      qa: [
        {
          q: 'De ce pierd programări?',
          a: 'În majoritatea saloanelor, pierderile vin din două locuri: mesaje rămase fără răspuns în primele ore și programări neconfirmate. Clienta nu pleacă supărată — pleacă în liniște, către salonul care a răspuns primul.',
          actionLabel: 'Vezi unde pierzi tu',
          action: { type: 'audit' },
        },
        {
          q: 'Cum reduc no-show-urile?',
          a: 'Confirmare imediată la programare, un reminder cald cu 24 de ore înainte și o variantă simplă de reprogramare. Doar acești trei pași recuperează o parte importantă din scaunele goale.',
          actionLabel: 'Calculează pierderea ta',
          action: { type: 'view', view: 'calculator' },
        },
        {
          q: 'Cum cer recenzii Google?',
          a: 'Cu un mesaj personal, trimis la 2–24 de ore după vizită, cu link direct către pagina de recenzii. Tonul contează mai mult decât momentul — cald, scurt, fără presiune.',
          actionLabel: 'Generează mesajul acum',
          action: { type: 'view', view: 'reviews' },
        },
        {
          q: 'Ce să postez pe Instagram?',
          a: 'Trei tipuri de conținut funcționează constant: rezultate înainte / după, micro-educație despre îngrijire și un mod clar de programare în bio. Ritmul bate perfecțiunea.',
          actionLabel: 'Discutăm strategia ta',
          action: { type: 'whatsapp' },
        },
        {
          q: 'Ce pot automatiza în salon?',
          a: 'Confirmările, reminderele, răspunsurile la întrebări repetitive și follow-up-ul pentru recenzii. Totul cu un ton cald, în limba ta — automatizarea bună nu se simte robotică.',
          actionLabel: 'Primește auditul gratuit',
          action: { type: 'audit' },
        },
      ],
    },
    experience: {
      eyebrow: 'Experiența clientei',
      title: 'Clienta vine pentru serviciu. Dar revine pentru sentiment.',
      body: 'Un salon premium nu se simte premium doar la scaun. Se simte în confirmare, în tonul mesajului, în liniștea că programarea este clară și în follow-up-ul care nu forțează.',
      chips: ['Claritate', 'Grijă', 'Ritm'],
      imageLine:
        'O clientă liniștită confirmă mai ușor, revine mai firesc și recomandă mai des.',
    },
    services: {
      eyebrow: 'Sistem de creștere',
      title: 'Servicii create pentru ritmul unui salon.',
      body: 'Nu ai nevoie de încă o platformă rece. Ai nevoie de mesaje, fluxuri și idei care se potrivesc cu felul în care clientele aleg un salon.',
      startAudit: 'Începe cu auditul',
      items: [
        {
          title: 'Plan personalizat de creștere',
          body: 'O hartă clară a locurilor unde se pierd cliente, timp și recenzii în fluxul tău actual.',
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
          title: 'Asistent digital de recepție',
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
    process: {
      eyebrow: 'Cum lucrăm',
      title: 'Trei pași. Fără jargon, fără presiune.',
      body: 'Un studio mic și tehnic din România. Lucrezi direct cu persoana care construiește sistemul — nu cu un departament de vânzări.',
      steps: [
        {
          n: '1',
          title: 'Audit de 15 minute',
          body: 'Ne uităm împreună la felul în care salonul tău răspunde azi: mesaje, confirmări, recenzii. Pleci cu 2–3 observații concrete, indiferent dacă lucrăm împreună sau nu.',
        },
        {
          n: '2',
          title: 'Plan clar, în limba ta',
          body: 'Primești o propunere simplă: ce automatizăm, în ce ordine și ce rezultat urmărim. Folosim doar WhatsApp Cloud API oficial — niciodată instrumente neoficiale.',
        },
        {
          n: '3',
          title: 'Implementare și ajustare',
          body: 'Construim, testăm cu mesaje reale și ajustăm tonul până sună exact ca salonul tău. Apoi sistemul lucrează în liniște.',
        },
      ],
      note: 'Conform GDPR. Doar WhatsApp Cloud API oficial.',
    },
    metrics: [
      { value: '1 mesaj', label: 'poate decide unde merge clienta' },
      { value: '24/7', label: 'claritate fără presiune pe echipă' },
      { value: 'zero', label: 'mesaje lăsate fără răspuns — obiectivul sistemului' },
    ],
    finalCta: {
      eyebrow: 'Următorul pas',
      title: 'Vrei să vezi unde pierde salonul tău timp, programări sau recenzii?',
      body: 'Primești o privire clară asupra comunicării salonului tău și câteva recomandări simple pe care le poți folosi imediat. Gratuit, în 15 minute.',
      cta: 'Primește auditul gratuit',
      whatsapp: 'Scrie-ne pe WhatsApp',
    },
    footer: {
      brandLine: 'Creștere saloane România',
      audit: 'Audit gratuit',
      services: 'Servicii',
      tools: 'Instrumente',
      privacy: 'Confidențialitate',
      terms: 'Termeni',
      legal: '© 2026 Kavi Automation. Conform GDPR.',
    },
    back: 'Înapoi la pagina pentru saloane',
  },

  en: {
    meta: { brandLine: 'Salon Growth' },
    nav: {
      story: 'Story',
      tools: 'Tools',
      services: 'Services',
      process: 'How we work',
      audit: 'Free audit',
    },
    hero: {
      badge: 'Premium beauty + calm technology',
      headline: 'Stop losing clients to unread messages.',
      subheadline:
        'A delayed reply can become a lost booking. Kavi Automation helps salons in Romania reply faster, reduce no-shows, and turn the first message into a premium experience.',
      coreLine:
        'The client experience does not start at the salon door. It starts with the first message.',
      primaryCta: 'Get the free audit',
      whatsappCta: 'Message us on WhatsApp',
      calcLink: 'Or calculate your no-show losses',
      messageLabel: 'new message',
      messageTime: '7:42 PM',
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
      chatStatus: 'replies instantly',
      chatMessages: [
        { from: 'client', text: 'Hi, do you have availability on Thursday or Friday?' },
        { from: 'salon', text: 'Hi! Checking the best times for you now.' },
        {
          from: 'salon',
          text: 'For balayage we have Thursday at 5:30 PM or Friday at 12:00. Want me to reserve it?',
        },
      ],
    },
    problems: {
      eyebrow: 'Where growth leaks',
      title: 'Small problems become major gaps in the calendar.',
      body: 'It is not about working more. It is about closing the loops that repeat every week.',
      cards: [
        {
          title: 'Lost messages',
          body: 'Requests buried in the inbox exactly when a client is looking for a free slot.',
          icon: MessageCircle,
        },
        {
          title: 'Delayed replies',
          body: 'A reply sent hours later changes the energy of the conversation and lowers the chance of booking.',
          icon: Clock,
        },
        {
          title: 'No-shows',
          body: 'Forgotten appointments or unclear confirmations that leave an empty chair mid-day.',
          icon: Calendar,
        },
        {
          title: 'Too few Google reviews',
          body: 'Happy clients leave beautifully, but never receive the right follow-up message.',
          icon: Award,
        },
        {
          title: 'Not enough Reels ideas',
          body: 'Content gets delayed until it becomes pressure instead of a simple rhythm.',
          icon: Sparkles,
        },
        {
          title: 'Forgotten follow-up',
          body: 'Clients who would return sooner with a warm, personal message at the right time.',
          icon: Send,
        },
      ],
    },
    tools: {
      eyebrow: 'Free tools',
      title: 'Start with a small moment of clarity. Then turn it into a system.',
      body: 'Two tools are ready to use right now. The rest launch one by one — no empty promises.',
      freeLabel: 'free',
      openLabel: 'Open',
      soonLabel: 'coming soon',
      items: [
        {
          id: 'calculator',
          title: 'No-show loss calculator',
          body: 'See how much missed appointments cost your salon each month.',
          icon: TrendingUp,
          live: true,
        },
        {
          id: 'reviews',
          title: 'Google review message generator',
          body: 'Elegant messages for asking for reviews without sounding pushy or cold.',
          icon: Award,
          live: true,
        },
        {
          id: 'score',
          title: 'Salon automation score',
          body: 'A quick score for your messages, confirmations, reviews, and follow-up.',
          icon: Target,
          live: false,
        },
        {
          id: 'replies',
          title: 'Client reply generator',
          body: 'Clear replies for prices, availability, cancellations, and repeat questions.',
          icon: MessageCircle,
          live: false,
        },
        {
          id: 'marketing',
          title: 'Marketing calendar generator',
          body: 'Campaign, post, and offer ideas that fit the rhythm of a salon.',
          icon: Calendar,
          live: false,
        },
        {
          id: 'reels',
          title: 'Reel hook generator',
          body: 'Short hooks for results, transformations, education, and seasonal offers.',
          icon: Zap,
          live: false,
        },
      ],
    },
    guide: {
      eyebrow: 'Quick guide',
      title: 'The questions we hear most often',
      body: 'Tap a question and get a short, honest answer — plus a concrete first step. This is how an instant assistant will feel for your clients too.',
      hint: 'Tap a question',
      qa: [
        {
          q: 'Why am I losing bookings?',
          a: 'In most salons, losses come from two places: messages left unanswered in the first hours, and unconfirmed appointments. The client does not leave upset — she leaves quietly, toward the salon that replied first.',
          actionLabel: 'See where you lose them',
          action: { type: 'audit' },
        },
        {
          q: 'How do I reduce no-shows?',
          a: 'Instant confirmation at booking, a warm reminder 24 hours before, and a simple way to reschedule. These three steps alone recover a meaningful share of empty chairs.',
          actionLabel: 'Calculate your loss',
          action: { type: 'view', view: 'calculator' },
        },
        {
          q: 'How do I ask for Google reviews?',
          a: 'With a personal message sent 2–24 hours after the visit, with a direct link to your review page. Tone matters more than timing — warm, short, no pressure.',
          actionLabel: 'Generate the message now',
          action: { type: 'view', view: 'reviews' },
        },
        {
          q: 'What should I post on Instagram?',
          a: 'Three content types work consistently: before / after results, micro-education about care, and a clear way to book in your bio. Rhythm beats perfection.',
          actionLabel: 'Talk strategy with us',
          action: { type: 'whatsapp' },
        },
        {
          q: 'What can I automate in my salon?',
          a: 'Confirmations, reminders, replies to repeat questions, and review follow-up. All in a warm tone, in your language — good automation never feels robotic.',
          actionLabel: 'Get the free audit',
          action: { type: 'audit' },
        },
      ],
    },
    experience: {
      eyebrow: 'Client experience',
      title: 'She comes for the service. But she returns for the feeling.',
      body: 'A premium salon does not feel premium only in the chair. It feels premium in the confirmation, in the tone of the message, in the calm of a clear booking, and in the follow-up that does not push.',
      chips: ['Clarity', 'Care', 'Rhythm'],
      imageLine:
        'A calm client confirms more easily, returns more naturally, and recommends you more often.',
    },
    services: {
      eyebrow: 'Growth system',
      title: 'Services built for the rhythm of a salon.',
      body: 'You do not need another cold platform. You need messages, flows, and ideas that match the way clients choose a salon.',
      startAudit: 'Start with the audit',
      items: [
        {
          title: 'Personalized growth plan',
          body: 'A clear map of where clients, time, and reviews are being lost in your current flow.',
          icon: Target,
        },
        {
          title: 'Salon communication kit',
          body: 'Messages for prices, bookings, rescheduling, confirmations, and FAQs.',
          icon: Mail,
        },
        {
          title: 'Content & offer kit',
          body: 'Content and offer ideas that feel premium, not aggressive.',
          icon: Sparkles,
        },
        {
          title: 'No-show automation',
          body: 'Discreet confirmations and reminders that protect the salon calendar.',
          icon: Calendar,
        },
        {
          title: 'Google review automation',
          body: 'Post-visit follow-up with natural messages that earn strong reviews.',
          icon: Award,
        },
        {
          title: 'Digital reception assistant',
          body: 'A conversation assistant for repeat questions, bookings, and elegant triage.',
          icon: Phone,
        },
        {
          title: 'Monthly salon growth system',
          body: 'A monthly rhythm for improving communication, content, offers, and retention.',
          icon: Layers,
        },
      ],
    },
    process: {
      eyebrow: 'How we work',
      title: 'Three steps. No jargon, no pressure.',
      body: 'A small, technical studio in Romania. You work directly with the person building the system — not with a sales department.',
      steps: [
        {
          n: '1',
          title: '15-minute audit',
          body: 'We look together at how your salon replies today: messages, confirmations, reviews. You leave with 2–3 concrete observations, whether we work together or not.',
        },
        {
          n: '2',
          title: 'A clear plan, in your language',
          body: 'You get a simple proposal: what we automate, in what order, and what result we aim for. Official WhatsApp only — never unofficial tools.',
        },
        {
          n: '3',
          title: 'Build and fine-tune',
          body: 'We build, test with real messages, and adjust the tone until it sounds exactly like your salon. Then the system works quietly.',
        },
      ],
      note: 'GDPR compliant. Official WhatsApp Cloud API only.',
    },
    metrics: [
      { value: '1 message', label: 'can decide where the client books' },
      { value: '24/7', label: 'clarity without pressure on your team' },
      { value: 'zero', label: 'messages left unanswered — the goal of the system' },
    ],
    finalCta: {
      eyebrow: 'Next step',
      title: 'Want to see where your salon loses time, bookings, or reviews?',
      body: 'You get a clear look at your salon communication and a few simple recommendations you can use immediately. Free, in 15 minutes.',
      cta: 'Get the free audit',
      whatsapp: 'Message us on WhatsApp',
    },
    footer: {
      brandLine: 'Salon Growth Romania',
      audit: 'Free audit',
      services: 'Services',
      tools: 'Tools',
      privacy: 'Privacy',
      terms: 'Terms',
      legal: '© 2026 Kavi Automation. GDPR compliant.',
    },
    back: 'Back to the salon page',
  },
};

/* ------------------------------------------------------------
   No-show calculator copy
   ------------------------------------------------------------ */

const noShowCopy = {
  ro: {
    eyebrow: 'Calculator no-show',
    title: 'Cât te costă scaunul gol?',
    body: 'Estimează rapid cât poate pierde salonul într-o lună din programări ratate. Introdu trei valori simple și vezi impactul lunar și anual în RON.',
    averagePrice: 'Preț mediu serviciu',
    appointmentsPerMonth: 'Programări pe lună',
    noShowsPerMonth: 'No-show-uri pe lună',
    perMonth: '/ lună',
    resultEyebrow: 'Pierdere estimată',
    monthlyLoss: 'Pierdere lunară',
    yearlyLoss: 'Pierdere anuală',
    rate: 'Rata no-show estimată',
    note: 'Aceasta este o estimare orientativă, pe baza valorilor introduse de tine.',
    insight:
      'Un sistem simplu de confirmare și remindere recuperează de obicei o parte importantă din această sumă.',
    audit: 'Primește auditul gratuit',
  },
  en: {
    eyebrow: 'No-show calculator',
    title: 'What does the empty chair cost you?',
    body: 'Quickly estimate how much your salon may be losing each month from missed appointments. Add three simple numbers and see the monthly and yearly impact in RON.',
    averagePrice: 'Average service price',
    appointmentsPerMonth: 'Appointments per month',
    noShowsPerMonth: 'No-shows per month',
    perMonth: '/ month',
    resultEyebrow: 'Estimated loss',
    monthlyLoss: 'Monthly loss',
    yearlyLoss: 'Yearly loss',
    rate: 'Estimated no-show rate',
    note: 'This is an indicative estimate based on the numbers you entered.',
    insight:
      'A simple confirmation and reminder system usually recovers a meaningful share of this amount.',
    audit: 'Get the free audit',
  },
};

/* ------------------------------------------------------------
   Review message generator copy + templates
   {salon} {serviciu} are replaced; [nume] and [link] stay as
   visible placeholders the owner fills per client.
   ------------------------------------------------------------ */

const reviewCopy = {
  ro: {
    eyebrow: 'Generator recenzii',
    title: 'Mesajul potrivit aduce recenzia potrivită.',
    body: 'Completează numele salonului, alege tonul și primești un mesaj gata de trimis. Înlocuiește [nume] cu numele clientei și [link] cu linkul tău de recenzii Google.',
    salonLabel: 'Numele salonului',
    salonPlaceholder: 'ex. Salon Aria',
    serviceLabel: 'Serviciul (opțional)',
    servicePlaceholder: 'ex. balayage',
    toneLabel: 'Tonul mesajului',
    tones: [
      { id: 'warm', label: 'Cald' },
      { id: 'short', label: 'Scurt' },
      { id: 'elegant', label: 'Elegant' },
    ],
    resultLabel: 'Mesajul tău',
    copyLabel: 'Copiază mesajul',
    copiedLabel: 'Copiat',
    anotherLabel: 'Altă variantă',
    tip: 'Trimite mesajul la 2–24 de ore după vizită — atunci experiența este încă vie.',
    fallbackSalon: 'salonul nostru',
  },
  en: {
    eyebrow: 'Review generator',
    title: 'The right message earns the right review.',
    body: 'Add your salon name, pick a tone, and get a ready-to-send message. Replace [name] with the client name and [link] with your Google review link.',
    salonLabel: 'Salon name',
    salonPlaceholder: 'e.g. Salon Aria',
    serviceLabel: 'Service (optional)',
    servicePlaceholder: 'e.g. balayage',
    toneLabel: 'Message tone',
    tones: [
      { id: 'warm', label: 'Warm' },
      { id: 'short', label: 'Short' },
      { id: 'elegant', label: 'Elegant' },
    ],
    resultLabel: 'Your message',
    copyLabel: 'Copy message',
    copiedLabel: 'Copied',
    anotherLabel: 'Another version',
    tip: 'Send it 2–24 hours after the visit — while the experience is still vivid.',
    fallbackSalon: 'our salon',
  },
};

const reviewTemplates = {
  ro: {
    warm: [
      'Bună, [nume]! Ne-am bucurat tare să te avem azi la {salon}{srvPhrase}. Dacă ai un minut, o recenzie pe Google ne-ar ajuta enorm să ajungem la cliente ca tine: [link]. Mulțumim din suflet!',
      'Bună, [nume]! Sperăm că îți place rezultatul{srvPhrase}. Părerea ta contează mult pentru noi — dacă ai 30 de secunde, ne-ar bucura câteva cuvinte aici: [link]. O zi frumoasă!',
    ],
    short: [
      'Bună, [nume]! Mulțumim pentru vizita la {salon}. O recenzie scurtă ne ajută mult: [link]',
      'Bună, [nume]! Ne bucurăm că ai ales {salon}{srvPhrase}. Dacă ai un moment: [link]. Mulțumim!',
    ],
    elegant: [
      'Bună, [nume]. Îți mulțumim că ai ales {salon}{srvPhrase}. Dacă experiența a fost pe măsura așteptărilor, câteva cuvinte pe Google ne-ar onora: [link]. Cu drag, echipa {salon}.',
      'Bună, [nume]. A fost o plăcere să te primim la {salon}. Recomandarea ta este cel mai frumos compliment — dacă dorești, ne poți lăsa o recenzie aici: [link]. Te mai așteptăm cu drag.',
    ],
  },
  en: {
    warm: [
      'Hi [name]! It was lovely having you at {salon} today{srvPhrase}. If you have a minute, a Google review would help us so much: [link]. Thank you!',
      'Hi [name]! We hope you love the result{srvPhrase}. Your opinion means a lot — if you have 30 seconds, a few words here would make our day: [link]. Have a lovely day!',
    ],
    short: [
      'Hi [name]! Thank you for visiting {salon}. A short review helps us a lot: [link]',
      'Hi [name]! So glad you chose {salon}{srvPhrase}. If you have a moment: [link]. Thank you!',
    ],
    elegant: [
      'Hi [name]. Thank you for choosing {salon}{srvPhrase}. If the experience met your expectations, a few words on Google would honor us: [link]. Warmly, the {salon} team.',
      'Hi [name]. It was a pleasure to welcome you at {salon}. Your recommendation is the finest compliment — if you wish, you can leave a review here: [link]. We look forward to seeing you again.',
    ],
  },
};

const buildReviewMessage = (lang, tone, variant, salonName, serviceName) => {
  const tpls = (reviewTemplates[lang] || reviewTemplates.ro)[tone] || [];
  const tpl = tpls[variant % tpls.length] || '';
  const salon = salonName.trim() || reviewCopy[lang].fallbackSalon;
  const srv = serviceName.trim();
  const srvPhrase = srv
    ? lang === 'ro'
      ? ` pentru ${srv}`
      : ` for the ${srv}`
    : '';
  return tpl.split('{salon}').join(salon).split('{srvPhrase}').join(srvPhrase);
};

const ronFormatter = new Intl.NumberFormat('ro-RO', {
  style: 'currency',
  currency: 'RON',
  maximumFractionDigits: 0,
});
const formatRon = (value) => ronFormatter.format(Math.max(0, value));

/* ============================================================
   DESIGN SYSTEM — self-contained CSS (no Tailwind compiler
   needed, fully portable). Signature motif: vanity-mirror
   bulbs — soft champagne lights used in the hero, eyebrows
   and the "mirror" panel.
   ============================================================ */

const SalonStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');

    .kv-root {
      --espresso: #110b09;
      --espresso-2: #171210;
      --char: #1b1614;
      --ivory: #fbf4e8;
      --ivory-soft: #f1e4d4;
      --muted: #cbbcac;
      --gold: #d8b46a;
      --blush: #d8a89b;
      --emerald: #0f8f67;
      --emerald-soft: #38c995;
      --wa: #25d366;
      font-family: 'Manrope', system-ui, sans-serif;
      background: var(--espresso);
      color: var(--ivory);
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }
    .kv-root *, .kv-root *::before, .kv-root *::after { box-sizing: border-box; }
    .kv-root a { color: inherit; text-decoration: none; }
    .kv-root :where(button) { font: inherit; color: inherit; background: none; border: 0; cursor: pointer; padding: 0; }
    .kv-root button:disabled { opacity: 0.6; cursor: wait; }
    .kv-root :focus-visible { outline: 2px solid var(--emerald-soft); outline-offset: 3px; border-radius: 4px; }

    .kv-display { font-family: 'Cormorant Garamond', Georgia, serif; font-feature-settings: 'liga', 'kern'; }

    .kv-wrap { width: 100%; max-width: 1180px; margin: 0 auto; padding: 0 20px; }
    @media (min-width: 640px) { .kv-wrap { padding: 0 28px; } }
    @media (min-width: 1024px) { .kv-wrap { padding: 0 40px; } }

    .kv-section { position: relative; padding: 76px 0; }
    @media (min-width: 640px) { .kv-section { padding: 96px 0; } }
    @media (min-width: 1024px) { .kv-section { padding: 120px 0; } }
    .kv-alt { background: var(--espresso-2); }
    .kv-hairline { position: absolute; inset: 0 0 auto 0; height: 1px;
      background: linear-gradient(90deg, transparent, rgba(216,180,106,0.30), transparent); }

    /* grain */
    .kv-grain::after {
      content: ''; position: absolute; inset: 0; pointer-events: none; opacity: 0.05;
      mix-blend-mode: soft-light; opacity: 0.07;
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.65'/%3E%3C/svg%3E");
    }

    /* mirror bulbs */
    .kv-bulbs { position: absolute; display: flex; pointer-events: none; }
    .kv-bulb { width: 9px; height: 9px; border-radius: 50%;
      background: radial-gradient(circle at 35% 30%, #ffe9bd, var(--gold) 60%, rgba(216,180,106,0.4));
      box-shadow: 0 0 16px 5px rgba(216,180,106,0.30);
      animation: kvGlow 4.5s ease-in-out infinite; }
    .kv-bulb:nth-child(2n) { animation-delay: 1.1s; }
    .kv-bulb:nth-child(3n) { animation-delay: 2.3s; }
    @keyframes kvGlow {
      0%, 100% { opacity: 0.55; box-shadow: 0 0 10px 3px rgba(216,180,106,0.18); }
      50% { opacity: 1; box-shadow: 0 0 20px 7px rgba(216,180,106,0.38); }
    }

    /* eyebrow */
    .kv-eyebrow { display: inline-flex; align-items: center; gap: 10px;
      font-size: 11px; font-weight: 800; letter-spacing: 0.26em; text-transform: uppercase; color: var(--gold); }
    .kv-eyebrow i { width: 5px; height: 5px; border-radius: 50%; background: var(--gold);
      box-shadow: 0 0 8px 2px rgba(216,180,106,0.45); display: inline-block; }
    .kv-eyebrow i:nth-of-type(2) { opacity: 0.65; } .kv-eyebrow i:nth-of-type(3) { opacity: 0.35; }

    .kv-h1 { font-size: clamp(2.55rem, 8.6vw, 5.4rem); line-height: 1.0; font-weight: 600;
      letter-spacing: -0.01em; color: var(--ivory); margin: 18px 0 0; }
    .kv-h2 { font-size: clamp(1.9rem, 4.6vw, 3.1rem); line-height: 1.06; font-weight: 600; color: var(--ivory); margin: 14px 0 0; }
    .kv-h3 { font-size: 1.45rem; line-height: 1.15; font-weight: 600; color: var(--ivory); margin: 0; }
    .kv-lead { font-size: clamp(1rem, 2.2vw, 1.15rem); line-height: 1.85; color: var(--muted); margin: 18px 0 0; max-width: 620px; }
    .kv-quote { margin: 26px 0 0; padding-left: 18px; border-left: 1px solid rgba(216,180,106,0.55);
      font-size: clamp(1.05rem, 2.4vw, 1.25rem); line-height: 1.7; color: var(--ivory); max-width: 560px; }

    /* buttons */
    .kv-btn { display: inline-flex; align-items: center; justify-content: center; gap: 9px;
      min-height: 48px; padding: 12px 24px; border-radius: 999px;
      font-size: 0.92rem; font-weight: 800; letter-spacing: 0.01em;
      transition: transform 200ms ease, background 200ms ease, border-color 200ms ease, box-shadow 200ms ease; }
    .kv-btn:hover { transform: translateY(-1px); }
    .kv-btn:active { transform: translateY(0); }
    .kv-btn-primary { background: var(--emerald); color: #fff; box-shadow: 0 10px 30px rgba(15,143,103,0.28); }
    .kv-btn-primary:hover { background: #10a879; }
    .kv-btn-ghost { border: 1px solid rgba(251,244,232,0.22); color: var(--ivory); background: rgba(251,244,232,0.05); backdrop-filter: blur(8px); }
    .kv-btn-ghost:hover { border-color: rgba(216,180,106,0.5); }
    .kv-btn-wa { border: 1px solid rgba(37,211,102,0.38); color: var(--ivory); background: rgba(37,211,102,0.08); }
    .kv-btn-wa:hover { background: rgba(37,211,102,0.14); border-color: rgba(37,211,102,0.6); }
    .kv-btn-wa svg.kv-waicon { color: var(--wa); }
    .kv-textlink { display: inline-flex; align-items: center; gap: 7px; margin-top: 16px;
      font-size: 0.9rem; font-weight: 700; color: var(--muted);
      border-bottom: 1px solid rgba(203,188,172,0.35); padding-bottom: 2px; transition: color 200ms ease, border-color 200ms ease; }
    .kv-textlink:hover { color: var(--ivory); border-color: var(--gold); }

    /* nav */
    .kv-nav { position: fixed; inset: 0 0 auto 0; z-index: 60; transition: background 400ms ease, border-color 400ms ease, box-shadow 400ms ease; border-bottom: 1px solid transparent; }
    .kv-nav.scrolled { background: rgba(17,11,9,0.88); border-color: rgba(251,244,232,0.10);
      backdrop-filter: blur(14px); box-shadow: 0 18px 40px rgba(0,0,0,0.32); }
    .kv-nav-inner { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 0; }
    .kv-logo { display: flex; align-items: center; gap: 11px; min-width: 0; }
    .kv-logo-mark { width: 40px; height: 40px; flex: none; display: flex; align-items: center; justify-content: center;
      border-radius: 50%; border: 1px solid rgba(216,180,106,0.5); background: rgba(251,244,232,0.07);
      font-size: 1.25rem; font-weight: 700; transition: border-color 250ms ease; }
    .kv-logo:hover .kv-logo-mark { border-color: rgba(56,201,149,0.7); }
    .kv-logo-name { font-size: 0.875rem; font-weight: 800; line-height: 1.2; white-space: nowrap; }
    .kv-logo-sub { font-size: 9px; font-weight: 700; letter-spacing: 0.24em; text-transform: uppercase; color: rgba(203,188,172,0.7); white-space: nowrap; }
    .kv-nav-links { display: none; align-items: center; gap: 26px; font-size: 0.875rem; font-weight: 600; color: var(--muted); }
    @media (min-width: 1024px) { .kv-nav-links { display: flex; } }
    .kv-nav-links button { transition: color 200ms ease; }
    .kv-nav-links button:hover { color: var(--ivory); }
    .kv-nav-cta { display: inline-flex; align-items: center; min-height: 40px; padding: 9px 16px;
      border-radius: 999px; background: var(--emerald); color: #fff; font-size: 0.78rem; font-weight: 800;
      box-shadow: 0 8px 22px rgba(15,143,103,0.25); transition: background 200ms ease; white-space: nowrap; }
    .kv-nav-cta:hover { background: #10a879; }
    @media (min-width: 640px) { .kv-nav-cta { padding: 10px 20px; font-size: 0.875rem; } }

    .kv-langs { display: flex; align-items: center; gap: 2px; padding: 3px; border-radius: 999px;
      border: 1px solid rgba(251,244,232,0.14); background: rgba(251,244,232,0.06);
      font-size: 10.5px; font-weight: 800; letter-spacing: 0.16em; }
    .kv-langs button { padding: 7px 11px; border-radius: 999px; color: var(--muted); transition: all 200ms ease; }
    .kv-langs button[aria-pressed='true'] { background: var(--ivory); color: var(--espresso); }

    /* hero */
    .kv-hero { position: relative; min-height: 92svh; display: flex; align-items: flex-end; padding: 130px 0 64px; overflow: hidden;
      background:
        radial-gradient(58% 46% at 76% 26%, rgba(216,180,106,0.16), transparent 70%),
        radial-gradient(42% 38% at 10% 86%, rgba(216,168,155,0.10), transparent 72%),
        linear-gradient(180deg, #1a120e 0%, var(--espresso) 74%); }
    .kv-hero .kv-bulbs { flex-direction: column; gap: 30px; right: 5.5%; top: 13%; opacity: 0.85; }
    @media (max-width: 1023px) { .kv-hero .kv-bulbs { gap: 22px; right: 7%; top: 9%; opacity: 0.5; } }
    .kv-hero-grid { position: relative; z-index: 2; display: grid; gap: 44px; align-items: end; }
    @media (min-width: 1024px) { .kv-hero-grid { grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); } }
    .kv-badge { display: inline-flex; align-items: center; gap: 9px; padding: 9px 16px; border-radius: 999px;
      border: 1px solid rgba(216,180,106,0.26); background: rgba(251,244,232,0.07); backdrop-filter: blur(8px);
      font-size: 10px; font-weight: 800; letter-spacing: 0.27em; text-transform: uppercase; color: var(--gold); }
    .kv-hero-ctas { display: flex; flex-direction: column; gap: 12px; margin-top: 34px; }
    @media (min-width: 640px) { .kv-hero-ctas { flex-direction: row; flex-wrap: wrap; align-items: center; } }

    /* message card */
    .kv-msgcard { border-radius: 14px; border: 1px solid rgba(251,244,232,0.14);
      background: rgba(24,16,13,0.72); backdrop-filter: blur(14px);
      box-shadow: 0 28px 70px rgba(0,0,0,0.38); padding: 20px; max-width: 400px; }
    .kv-msgcard-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;
      font-size: 10.5px; font-weight: 800; letter-spacing: 0.24em; text-transform: uppercase; color: rgba(203,188,172,0.7); }
    .kv-msgcard-body { border-radius: 12px; background: rgba(251,244,232,0.10); padding: 15px 16px;
      font-size: 0.92rem; line-height: 1.7; color: var(--ivory); }
    .kv-msgcard-hint { display: flex; align-items: center; gap: 9px; margin-top: 14px; font-size: 0.85rem; color: var(--muted); }
    .kv-pulse { width: 8px; height: 8px; flex: none; border-radius: 50%; background: var(--emerald-soft); animation: kvPulse 2.2s ease-in-out infinite; }
    @keyframes kvPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(56,201,149,0.45); } 55% { box-shadow: 0 0 0 7px rgba(56,201,149,0); } }

    /* cards */
    .kv-grid { display: grid; gap: 16px; margin-top: 46px; }
    @media (min-width: 640px) { .kv-grid-2 { grid-template-columns: 1fr 1fr; } }
    @media (min-width: 1024px) { .kv-grid-3 { grid-template-columns: 1fr 1fr 1fr; } }
    .kv-card { position: relative; height: 100%; border-radius: 14px; padding: 26px;
      border: 1px solid rgba(251,244,232,0.10); background: rgba(251,244,232,0.045);
      transition: transform 320ms ease, border-color 320ms ease, box-shadow 320ms ease, background 320ms ease; }
    .kv-card.hoverable:hover { transform: translateY(-4px); border-color: rgba(216,180,106,0.30);
      box-shadow: 0 22px 56px rgba(0,0,0,0.30); }
    .kv-icon { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;
      border: 1px solid rgba(216,180,106,0.24); background: rgba(216,180,106,0.10); color: var(--gold); }
    .kv-icon.green { border-color: rgba(15,143,103,0.3); background: rgba(15,143,103,0.14); color: var(--emerald-soft); }
    .kv-card p { margin: 11px 0 0; font-size: 0.9rem; line-height: 1.8; color: var(--muted); }
    .kv-pill { display: inline-block; padding: 5px 12px; border-radius: 999px; font-size: 10px; font-weight: 800;
      letter-spacing: 0.2em; text-transform: uppercase; border: 1px solid rgba(216,180,106,0.22); color: var(--gold); }
    .kv-pill.dim { opacity: 0.55; }
    .kv-card-foot { display: flex; align-items: center; gap: 8px; margin-top: 24px;
      font-size: 0.9rem; font-weight: 800; color: var(--emerald-soft); }
    .kv-card-foot svg { transition: transform 220ms ease; }
    .kv-toolbtn:hover .kv-card-foot svg { transform: translate(3px, -3px); }
    .kv-toolbtn { display: flex; flex-direction: column; justify-content: space-between; text-align: left; width: 100%; min-height: 218px; }
    .kv-card.soon { opacity: 0.62; }

    /* chat (story + guide) */
    .kv-chat { border-radius: 14px; border: 1px solid rgba(251,244,232,0.13); background: rgba(13,9,8,0.82);
      box-shadow: 0 26px 64px rgba(0,0,0,0.30); padding: 18px; }
    .kv-chat-top { display: flex; align-items: center; justify-content: space-between; gap: 10px;
      border-bottom: 1px solid rgba(251,244,232,0.10); padding-bottom: 14px; margin-bottom: 15px; }
    .kv-chat-name { font-size: 0.9rem; font-weight: 800; }
    .kv-chat-status { display: flex; align-items: center; gap: 7px; margin-top: 3px; font-size: 0.75rem; color: rgba(203,188,172,0.75); }
    .kv-bubble { max-width: 86%; border-radius: 13px; padding: 12px 15px; font-size: 0.9rem; line-height: 1.65;
      animation: kvBubble 420ms cubic-bezier(0.2, 0.9, 0.3, 1) both; }
    .kv-bubble + .kv-bubble { margin-top: 10px; }
    .kv-bubble.client { background: rgba(251,244,232,0.10); color: var(--ivory); border-bottom-left-radius: 4px; }
    .kv-bubble.salon { background: var(--emerald); color: #fff; margin-left: auto; border-bottom-right-radius: 4px; }
    @keyframes kvBubble { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }

    /* timeline */
    .kv-step { position: relative; padding-left: 26px; border-left: 1px solid rgba(216,180,106,0.24); }
    .kv-step + .kv-step { margin-top: 26px; }
    .kv-step::before { content: ''; position: absolute; left: -8px; top: 4px; width: 15px; height: 15px;
      border-radius: 50%; border: 1px solid rgba(216,180,106,0.55); background: #19110f;
      box-shadow: 0 0 10px rgba(216,180,106,0.25); }
    .kv-step-time { font-size: 11px; font-weight: 800; letter-spacing: 0.24em; color: var(--gold); }
    .kv-step h3 { margin-top: 8px; }
    .kv-step p { margin: 8px 0 0; font-size: 0.9rem; line-height: 1.75; color: var(--muted); }

    /* guide chips */
    .kv-chips { display: flex; flex-wrap: wrap; gap: 9px; }
    .kv-chip { padding: 10px 15px; border-radius: 999px; font-size: 0.82rem; font-weight: 700;
      border: 1px solid rgba(216,180,106,0.22); background: rgba(251,244,232,0.06); color: var(--ivory-soft);
      transition: all 220ms ease; }
    .kv-chip:hover { border-color: rgba(216,180,106,0.55); }
    .kv-chip[aria-pressed='true'] { background: var(--gold); border-color: var(--gold); color: var(--espresso); }
    .kv-guide-hint { font-size: 0.85rem; color: rgba(203,188,172,0.7); font-style: italic; }
    .kv-answer-action { display: inline-flex; align-items: center; gap: 7px; margin-top: 14px; margin-left: auto;
      padding: 9px 16px; border-radius: 999px; font-size: 0.82rem; font-weight: 800;
      border: 1px solid rgba(216,180,106,0.4); color: var(--gold); transition: all 200ms ease; }
    .kv-answer-action:hover { background: rgba(216,180,106,0.12); }

    /* mirror panel (experience) */
    .kv-mirror-wrap { display: flex; justify-content: center; }
    .kv-mirror { position: relative; width: min(100%, 420px); aspect-ratio: 4 / 5.1;
      border-radius: 999px 999px 18px 18px; border: 1px solid rgba(216,180,106,0.36);
      background:
        radial-gradient(75% 56% at 50% 26%, rgba(216,180,106,0.17), transparent 72%),
        radial-gradient(60% 44% at 50% 90%, rgba(216,168,155,0.10), transparent 70%),
        linear-gradient(180deg, #201611, #130d0a 78%);
      box-shadow: inset 0 0 70px rgba(0,0,0,0.45), 0 34px 80px rgba(0,0,0,0.38);
      display: flex; align-items: flex-end; padding: 30px; overflow: hidden; }
    .kv-mirror::before { content: ''; position: absolute; inset: 10px; border-radius: inherit;
      border: 1px solid rgba(251,244,232,0.07); pointer-events: none; }
    .kv-mirror .kv-bulbs { flex-direction: row; gap: 19px; top: 7.5%; left: 50%; transform: translateX(-50%); }
    .kv-mirror .kv-bulb { width: 7px; height: 7px; }
    .kv-mirror-quote { position: relative; z-index: 1; font-size: clamp(1.3rem, 3vw, 1.6rem); line-height: 1.35;
      font-weight: 600; color: var(--ivory); text-wrap: balance; }
    .kv-chipline { display: grid; gap: 11px; margin-top: 30px; }
    @media (min-width: 640px) { .kv-chipline { grid-template-columns: repeat(3, 1fr); } }
    .kv-chipline div { border-radius: 999px; border: 1px solid rgba(251,244,232,0.10); background: rgba(251,244,232,0.06);
      padding: 13px; text-align: center; font-size: 0.9rem; font-weight: 800; }

    /* services featured */
    .kv-featured { border-color: rgba(15,143,103,0.36);
      background: linear-gradient(135deg, rgba(15,143,103,0.20), rgba(216,180,106,0.08)); }
    @media (min-width: 1024px) {
      .kv-featured { grid-column: 1 / -1; display: flex; align-items: center; justify-content: space-between; gap: 36px; }
      .kv-featured .kv-card-foot { margin-top: 0; flex: none; }
    }

    /* process */
    .kv-procgrid { display: grid; gap: 16px; margin-top: 46px; }
    @media (min-width: 1024px) { .kv-procgrid { grid-template-columns: repeat(3, 1fr); } }
    .kv-procnum { font-size: 2.6rem; line-height: 1; font-weight: 600; color: var(--gold);
      font-family: 'Cormorant Garamond', Georgia, serif; }
    .kv-procnote { display: inline-flex; align-items: center; gap: 9px; margin-top: 28px; padding: 11px 18px;
      border-radius: 999px; border: 1px solid rgba(251,244,232,0.12); background: rgba(251,244,232,0.05);
      font-size: 0.8rem; font-weight: 700; color: var(--muted); }

    /* metrics */
    .kv-metrics { display: grid; gap: 12px; padding: 44px 0; }
    @media (min-width: 640px) { .kv-metrics { grid-template-columns: repeat(3, 1fr); } }
    .kv-metric { border-radius: 14px; border: 1px solid rgba(251,244,232,0.10); background: rgba(17,11,9,0.55);
      padding: 26px 20px; text-align: center; }
    .kv-metric-v { font-size: 2rem; font-weight: 600; color: var(--gold); font-family: 'Cormorant Garamond', Georgia, serif; }
    .kv-metric-l { margin-top: 6px; font-size: 0.85rem; line-height: 1.6; color: var(--muted); }

    /* final cta */
    .kv-final { text-align: center;
      background:
        radial-gradient(50% 42% at 50% 0%, rgba(216,180,106,0.15), transparent 75%),
        var(--espresso); }
    .kv-final-ctas { display: flex; flex-direction: column; gap: 12px; align-items: center; justify-content: center; margin-top: 36px; }
    @media (min-width: 640px) { .kv-final-ctas { flex-direction: row; } }

    /* footer */
    .kv-footer { border-top: 1px solid rgba(251,244,232,0.10); background: #0d0908; padding: 34px 0; }
    .kv-footer-inner { display: flex; flex-direction: column; gap: 16px; font-size: 0.875rem; color: rgba(203,188,172,0.75); }
    @media (min-width: 640px) { .kv-footer-inner { flex-direction: row; align-items: center; justify-content: space-between; } }
    .kv-footer-links { display: flex; flex-wrap: wrap; gap: 18px; }
    .kv-footer-links a, .kv-footer-links button { font-weight: 600; transition: color 200ms ease; }
    .kv-footer-links a:hover, .kv-footer-links button:hover { color: var(--ivory); }
    .kv-legal { font-size: 0.75rem; color: rgba(203,188,172,0.5); }

    /* whatsapp FAB */
    .kv-fab { position: fixed; right: 18px; bottom: 18px; z-index: 70; width: 56px; height: 56px;
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
      background: var(--wa); color: #fff; box-shadow: 0 14px 36px rgba(37,211,102,0.36);
      transition: transform 200ms ease, box-shadow 200ms ease; }
    .kv-fab:hover { transform: translateY(-3px) scale(1.04); box-shadow: 0 20px 44px rgba(37,211,102,0.44); }

    /* tool pages */
    .kv-page { position: relative; min-height: 100vh; padding: 130px 0 90px; overflow: hidden;
      background:
        radial-gradient(52% 40% at 82% 16%, rgba(216,180,106,0.15), transparent 70%),
        radial-gradient(40% 36% at 8% 92%, rgba(216,168,155,0.08), transparent 70%),
        var(--espresso); }
    .kv-pagegrid { position: relative; z-index: 1; display: grid; gap: 40px; align-items: start; }
    @media (min-width: 1024px) { .kv-pagegrid { grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); align-items: center; } }
    .kv-back { display: inline-flex; align-items: center; gap: 7px; margin-bottom: 26px;
      font-size: 0.85rem; font-weight: 700; color: var(--muted); transition: color 200ms ease; }
    .kv-back:hover { color: var(--ivory); }

    .kv-panel { border-radius: 16px; border: 1px solid rgba(251,244,232,0.11);
      background: linear-gradient(145deg, rgba(251,244,232,0.085), rgba(251,244,232,0.03));
      box-shadow: 0 30px 80px rgba(0,0,0,0.30); padding: 22px; }
    @media (min-width: 640px) { .kv-panel { padding: 30px; } }
    .kv-field { display: block; }
    .kv-field + .kv-field { margin-top: 16px; }
    .kv-label { display: block; margin-bottom: 9px; font-size: 11px; font-weight: 800;
      letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); }
    .kv-inputrow { display: flex; align-items: center; min-height: 54px; padding: 0 16px; border-radius: 12px;
      border: 1px solid rgba(251,244,232,0.13); background: rgba(17,11,9,0.70);
      transition: border-color 200ms ease; }
    .kv-inputrow:focus-within { border-color: rgba(56,201,149,0.7); }
    .kv-inputrow input { flex: 1; min-width: 0; background: transparent; border: 0; outline: none;
      font: inherit; font-size: 1.05rem; font-weight: 600; color: var(--ivory); }
    .kv-inputrow input::placeholder { color: rgba(203,188,172,0.45); font-weight: 500; }
    .kv-suffix { margin-left: 12px; flex: none; font-size: 11px; font-weight: 800;
      letter-spacing: 0.14em; text-transform: uppercase; color: rgba(203,188,172,0.7); }

    .kv-resultbox { margin-top: 22px; border-radius: 14px; border: 1px solid rgba(216,180,106,0.20);
      background: rgba(251,244,232,0.06); padding: 22px; }
    .kv-results { display: grid; gap: 18px; margin-top: 16px; }
    @media (min-width: 640px) { .kv-results { grid-template-columns: 1fr 1fr; } }
    .kv-result-l { font-size: 0.85rem; color: var(--muted); }
    .kv-result-v { margin-top: 6px; font-size: clamp(1.7rem, 5vw, 2.3rem); font-weight: 800; color: var(--ivory);
      font-variant-numeric: tabular-nums; }
    .kv-ratebar { margin-top: 20px; }
    .kv-ratebar-track { height: 8px; border-radius: 999px; background: rgba(251,244,232,0.10); overflow: hidden; }
    .kv-ratebar-fill { height: 100%; border-radius: 999px;
      background: linear-gradient(90deg, var(--gold), var(--emerald-soft));
      transition: width 500ms cubic-bezier(0.2, 0.9, 0.3, 1); }
    .kv-ratebar-label { display: flex; justify-content: space-between; margin-top: 9px;
      font-size: 0.82rem; font-weight: 700; color: var(--ivory-soft); }

    .kv-tones { display: flex; gap: 7px; padding: 4px; border-radius: 999px;
      border: 1px solid rgba(251,244,232,0.13); background: rgba(17,11,9,0.55); }
    .kv-tones button { flex: 1; padding: 10px 8px; border-radius: 999px; font-size: 0.85rem; font-weight: 800;
      color: var(--muted); transition: all 200ms ease; }
    .kv-tones button[aria-pressed='true'] { background: var(--gold); color: var(--espresso); }
    .kv-msgout { margin-top: 16px; border-radius: 13px; border-bottom-right-radius: 4px;
      background: var(--emerald); color: #fff; padding: 17px 18px; font-size: 0.93rem; line-height: 1.75;
      white-space: pre-wrap; }
    .kv-genbtns { display: flex; flex-direction: column; gap: 11px; margin-top: 18px; }
    @media (min-width: 640px) { .kv-genbtns { flex-direction: row; } }
    .kv-tip { display: flex; align-items: flex-start; gap: 9px; margin-top: 18px; font-size: 0.83rem; line-height: 1.65; color: var(--muted); }
    .kv-tip svg { flex: none; margin-top: 2px; color: var(--gold); }

    /* reveal */
    .kv-reveal { opacity: 0; transform: translateY(22px);
      transition: opacity 760ms cubic-bezier(0.16, 1, 0.3, 1), transform 760ms cubic-bezier(0.16, 1, 0.3, 1); }
    .kv-reveal.in { opacity: 1; transform: none; }

    @media (prefers-reduced-motion: reduce) {
      .kv-root * { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
      .kv-reveal { opacity: 1 !important; transform: none !important; }
    }
  `}</style>
);

/* ============================================================
   PRIMITIVES
   ============================================================ */

const useReveal = () => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -7% 0px' }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const Reveal = ({ children, className = '', delay = 0, as: Tag = 'div' }) => {
  const [ref, inView] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`kv-reveal ${inView ? 'in' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
};

const Bulbs = ({ count = 5 }) => (
  <div className="kv-bulbs" aria-hidden="true">
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} className="kv-bulb" />
    ))}
  </div>
);

const Eyebrow = ({ children }) => (
  <span className="kv-eyebrow">
    <i /><i /><i />
    {children}
  </span>
);

const SectionHead = ({ eyebrow, title, body, centered = false }) => (
  <Reveal>
    <div style={centered ? { textAlign: 'center', maxWidth: 680, margin: '0 auto' } : { maxWidth: 620 }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="kv-h2 kv-display">{title}</h2>
      {body ? (
        <p className="kv-lead" style={centered ? { marginLeft: 'auto', marginRight: 'auto' } : undefined}>
          {body}
        </p>
      ) : null}
    </div>
  </Reveal>
);

const WaIcon = ({ size = 18 }) => (
  <svg
    className="kv-waicon"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

/* ============================================================
   NAV + SHELL
   ============================================================ */

const Nav = ({ t, lang, setLang, goSection, goHome, goAudit }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`kv-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="kv-wrap kv-nav-inner">
        <button type="button" className="kv-logo" onClick={goHome} aria-label="Kavi Automation">
          <span className="kv-logo-mark kv-display">K</span>
          <span>
            <span className="kv-logo-name" style={{ display: 'block' }}>Kavi Automation</span>
            <span className="kv-logo-sub" style={{ display: 'block' }}>{t.meta.brandLine}</span>
          </span>
        </button>

        <div className="kv-nav-links">
          <button type="button" onClick={() => goSection('story')}>{t.nav.story}</button>
          <button type="button" onClick={() => goSection('tools')}>{t.nav.tools}</button>
          <button type="button" onClick={() => goSection('services')}>{t.nav.services}</button>
          <button type="button" onClick={() => goSection('process')}>{t.nav.process}</button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 'none' }}>
          <div className="kv-langs" role="group" aria-label="Language">
            {['ro', 'en'].map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={lang === option}
                onClick={() => setLang(option)}
              >
                {option.toUpperCase()}
              </button>
            ))}
          </div>
          <button type="button" className="kv-nav-cta" onClick={goAudit}>
            {t.nav.audit}
          </button>
        </div>
      </div>
    </nav>
  );
};

const WhatsAppFab = ({ lang }) => (
  <a
    className="kv-fab"
    href={waUrl(lang)}
    target="_blank"
    rel="noreferrer"
    aria-label="WhatsApp"
  >
    <WaIcon size={26} />
  </a>
);

const Footer = ({ t, goSection, setView }) => (
  <footer className="kv-footer">
    <div className="kv-wrap kv-footer-inner">
      <div>
        <span style={{ fontWeight: 800, color: 'var(--ivory)' }}>Kavi Automation</span>
        <span style={{ margin: '0 9px', color: 'rgba(216,180,106,0.6)' }}>/</span>
        {t.footer.brandLine}
      </div>
      <div className="kv-footer-links">
        <button type="button" onClick={() => setView('audit')}>{t.footer.audit}</button>
        <button type="button" onClick={() => goSection('services')}>{t.footer.services}</button>
        <button type="button" onClick={() => goSection('tools')}>{t.footer.tools}</button>
        <button type="button" onClick={() => setView('privacy')}>{t.footer.privacy}</button>
        <button type="button" onClick={() => setView('terms')}>{t.footer.terms}</button>
      </div>
      <div className="kv-legal">
        {t.footer.legal}
        <span style={{ margin: '0 8px', opacity: 0.5 }}>&middot;</span>
        <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>ANPC SAL</a>
        <span style={{ margin: '0 6px', opacity: 0.5 }}>&middot;</span>
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>SOL</a>
      </div>
    </div>
  </footer>
);

/* ============================================================
   HOME SECTIONS
   ============================================================ */

const Hero = ({ t, lang, setView }) => (
  <header className="kv-hero kv-grain">
    {HERO_IMAGE ? <img className="kv-hero-img" src={HERO_IMAGE} alt="" aria-hidden="true" /> : null}
    <div className="kv-hero-veil" aria-hidden="true" />
    <div className="kv-hero-ring" aria-hidden="true" />
    <Bulbs count={6} />
    <div className="kv-wrap kv-hero-grid">
      <div>
        <Reveal>
          <span className="kv-badge">
            <Sparkles size={13} />
            {t.hero.badge}
          </span>
        </Reveal>
        <Reveal delay={90}>
          <h1 className="kv-h1 kv-display">{t.hero.headline}</h1>
        </Reveal>
        <Reveal delay={170}>
          <p className="kv-lead">{t.hero.subheadline}</p>
        </Reveal>
        <Reveal delay={240}>
          <p className="kv-quote">{t.hero.coreLine}</p>
        </Reveal>
        <Reveal delay={310}>
          <div className="kv-hero-ctas">
            <button type="button" className="kv-btn kv-btn-primary" onClick={() => setView('audit')}>
              {t.hero.primaryCta}
              <ArrowRight size={17} />
            </button>
            <a className="kv-btn kv-btn-wa" href={waUrl(lang)} target="_blank" rel="noreferrer">
              <WaIcon />
              {t.hero.whatsappCta}
            </a>
          </div>
          <button type="button" className="kv-textlink" onClick={() => setView('calculator')}>
            {t.hero.calcLink}
            <ArrowUpRight size={14} />
          </button>
        </Reveal>
      </div>

      <Reveal delay={430}>
        <div className="kv-msgcard">
          <div className="kv-msgcard-top">
            <span>{t.hero.messageLabel}</span>
            <span>{t.hero.messageTime}</span>
          </div>
          <div className="kv-msgcard-body">{t.hero.message}</div>
          <div className="kv-msgcard-hint">
            <span className="kv-pulse" />
            <span>{t.hero.messageHint}</span>
          </div>
        </div>
      </Reveal>
    </div>
  </header>
);

const StorySection = ({ t }) => (
  <section id="story" className="kv-section">
    <div className="kv-wrap" style={{ display: 'grid', gap: 48 }}>
      <SectionHead eyebrow={t.story.eyebrow} title={t.story.title} body={t.story.body} />
      <Reveal>
        <div
          style={{
            display: 'grid',
            gap: 36,
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            alignItems: 'center',
          }}
        >
          <div>
            {t.story.steps.map((item) => (
              <div key={item.title} className="kv-step">
                <div className="kv-step-time">{item.time}</div>
                <h3 className="kv-h3 kv-display">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
          <div className="kv-chat">
            <div className="kv-chat-top">
              <div>
                <div className="kv-chat-name">{t.story.chatTitle}</div>
                <div className="kv-chat-status">
                  <span className="kv-pulse" />
                  {t.story.chatStatus}
                </div>
              </div>
              <MessageCircle size={19} color="#d8b46a" />
            </div>
            <div>
              {t.story.chatMessages.map((m, i) => (
                <div
                  key={m.text}
                  className={`kv-bubble ${m.from}`}
                  style={{ animationDelay: `${i * 160}ms` }}
                >
                  {m.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

const ProblemsSection = ({ t }) => (
  <section className="kv-section kv-alt">
    <div className="kv-hairline" />
    <div className="kv-wrap">
      <SectionHead eyebrow={t.problems.eyebrow} title={t.problems.title} body={t.problems.body} />
      <div className="kv-grid kv-grid-2 kv-grid-3">
        {t.problems.cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Reveal key={card.title} delay={index * 50}>
              <article className="kv-card hoverable">
                <div className="kv-icon"><Icon size={19} /></div>
                <h3 className="kv-h3 kv-display">{card.title}</h3>
                <p>{card.body}</p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

const ToolsSection = ({ t, setView }) => (
  <section id="tools" className="kv-section">
    <div className="kv-wrap">
      <SectionHead eyebrow={t.tools.eyebrow} title={t.tools.title} body={t.tools.body} centered />
      <div className="kv-grid kv-grid-2 kv-grid-3">
        {t.tools.items.map((tool, index) => {
          const Icon = tool.icon;
          const inner = (
            <>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                  <div className="kv-icon green" style={{ marginBottom: 0 }}>
                    <Icon size={19} />
                  </div>
                  <span className={`kv-pill ${tool.live ? '' : 'dim'}`}>
                    {tool.live ? t.tools.freeLabel : t.tools.soonLabel}
                  </span>
                </div>
                <h3 className="kv-h3 kv-display">{tool.title}</h3>
                <p>{tool.body}</p>
              </div>
              {tool.live ? (
                <div className="kv-card-foot">
                  <span>{t.tools.openLabel}</span>
                  <ArrowUpRight size={16} />
                </div>
              ) : null}
            </>
          );
          return (
            <Reveal key={tool.id} delay={index * 45}>
              {tool.live ? (
                <button
                  type="button"
                  className="kv-card hoverable kv-toolbtn"
                  onClick={() => setView(tool.id)}
                >
                  {inner}
                </button>
              ) : (
                <div className="kv-card soon kv-toolbtn" style={{ cursor: 'default' }}>
                  {inner}
                </div>
              )}
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

const GuideSection = ({ t, lang, setView }) => {
  const [active, setActive] = useState(null);
  const item = active === null ? null : t.guide.qa[active];

  const runAction = (action) => {
    if (!action) return;
    if (action.type === 'view') setView(action.view);
    if (action.type === 'audit') setView('audit');
    if (action.type === 'whatsapp') window.open(waUrl(lang), '_blank', 'noopener');
  };

  return (
    <section className="kv-section kv-alt">
      <div className="kv-hairline" />
      <div
        className="kv-wrap"
        style={{ display: 'grid', gap: 40, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', alignItems: 'start' }}
      >
        <SectionHead eyebrow={t.guide.eyebrow} title={t.guide.title} body={t.guide.body} />
        <Reveal delay={120}>
          <div className="kv-chat">
            <div className="kv-chat-top">
              <div>
                <div className="kv-chat-name">Kavi</div>
                <div className="kv-chat-status">
                  <span className="kv-pulse" />
                  {t.guide.eyebrow}
                </div>
              </div>
              <MessageCircle size={19} color="#38c995" />
            </div>
            <div className="kv-chips" style={{ marginBottom: 16 }}>
              {t.guide.qa.map((qa, i) => (
                <button
                  key={qa.q}
                  type="button"
                  className="kv-chip"
                  aria-pressed={active === i}
                  onClick={() => setActive(i)}
                >
                  {qa.q}
                </button>
              ))}
            </div>
            {item ? (
              <div key={item.q}>
                <div className="kv-bubble client">{item.q}</div>
                <div className="kv-bubble salon" style={{ animationDelay: '180ms' }}>{item.a}</div>
                <div style={{ display: 'flex' }}>
                  <button
                    type="button"
                    className="kv-answer-action"
                    style={{ animation: 'kvBubble 420ms 340ms both' }}
                    onClick={() => runAction(item.action)}
                  >
                    {item.actionLabel}
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <p className="kv-guide-hint">{t.guide.hint}</p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const ExperienceSection = ({ t }) => (
  <section className="kv-section">
    <div
      className="kv-wrap"
      style={{ display: 'grid', gap: 48, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', alignItems: 'center' }}
    >
      <div>
        <SectionHead eyebrow={t.experience.eyebrow} title={t.experience.title} body={t.experience.body} />
        <Reveal delay={120}>
          <div className="kv-chipline">
            {t.experience.chips.map((word) => (
              <div key={word}>{word}</div>
            ))}
          </div>
        </Reveal>
      </div>
      <Reveal delay={160}>
        <div className="kv-mirror-wrap">
          <figure className="kv-mirror" style={{ margin: 0 }}>
            <Bulbs count={7} />
            <figcaption className="kv-mirror-quote kv-display">{t.experience.imageLine}</figcaption>
          </figure>
        </div>
      </Reveal>
    </div>
  </section>
);

const ServicesSection = ({ t, setView }) => (
  <section id="services" className="kv-section kv-alt">
    <div className="kv-hairline" />
    <div className="kv-wrap">
      <SectionHead eyebrow={t.services.eyebrow} title={t.services.title} body={t.services.body} />
      <div className="kv-grid kv-grid-2 kv-grid-3">
        {t.services.items.map((service, index) => {
          const Icon = service.icon;
          const featured = index === t.services.items.length - 1;
          return (
            <Reveal key={service.title} delay={index * 40} className={featured ? 'kv-featured-slot' : ''}>
              <article className={`kv-card hoverable ${featured ? 'kv-featured' : ''}`}>
                <div>
                  <div className="kv-icon"><Icon size={19} /></div>
                  <h3 className="kv-h3 kv-display">{service.title}</h3>
                  <p style={{ maxWidth: 640 }}>{service.body}</p>
                </div>
                {featured ? (
                  <button
                    type="button"
                    className="kv-card-foot"
                    onClick={() => setView('audit')}
                  >
                    {t.services.startAudit}
                    <ArrowRight size={16} />
                  </button>
                ) : null}
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

const ProcessSection = ({ t }) => (
  <section id="process" className="kv-section">
    <div className="kv-wrap">
      <SectionHead eyebrow={t.process.eyebrow} title={t.process.title} body={t.process.body} />
      <div className="kv-procgrid">
        {t.process.steps.map((step, index) => (
          <Reveal key={step.n} delay={index * 70}>
            <article className="kv-card hoverable">
              <div className="kv-procnum">{step.n}</div>
              <h3 className="kv-h3 kv-display" style={{ marginTop: 14 }}>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal delay={240}>
        <div className="kv-procnote">
          <Check size={15} color="#38c995" />
          {t.process.note}
        </div>
      </Reveal>
    </div>
  </section>
);

const MetricsBand = ({ t }) => (
  <section className="kv-alt">
    <div className="kv-wrap kv-metrics">
      {t.metrics.map((item) => (
        <Reveal key={item.value}>
          <div className="kv-metric">
            <div className="kv-metric-v">{item.value}</div>
            <div className="kv-metric-l">{item.label}</div>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

const FinalCTA = ({ t, lang, setView }) => (
  <section className="kv-section kv-final kv-grain">
    <div className="kv-wrap" style={{ position: 'relative', zIndex: 1 }}>
      <Reveal>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Eyebrow>{t.finalCta.eyebrow}</Eyebrow>
          <h2 className="kv-h2 kv-display">{t.finalCta.title}</h2>
          <p className="kv-lead" style={{ margin: '20px auto 0' }}>{t.finalCta.body}</p>
        </div>
        <div className="kv-final-ctas">
          <button type="button" className="kv-btn kv-btn-primary" onClick={() => setView('audit')}>
            {t.finalCta.cta}
            <ArrowRight size={17} />
          </button>
          <a className="kv-btn kv-btn-wa" href={waUrl(lang)} target="_blank" rel="noreferrer">
            <WaIcon />
            {t.finalCta.whatsapp}
          </a>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ============================================================
   TOOL PAGES
   ============================================================ */

const CalculatorView = ({ t, lang, goHome, setView }) => {
  const copy = noShowCopy[lang] || noShowCopy.ro;
  const [values, setValues] = useState(calculatorDefaults);

  const averagePrice = Math.max(0, Number(values.averagePrice) || 0);
  const appointments = Math.max(0, Number(values.appointmentsPerMonth) || 0);
  const noShows = Math.max(0, Number(values.noShowsPerMonth) || 0);
  const monthlyLoss = averagePrice * noShows;
  const yearlyLoss = monthlyLoss * 12;
  const rate = appointments > 0 ? Math.min(100, (noShows / appointments) * 100) : 0;

  const handleChange = (field) => (event) =>
    setValues((current) => ({ ...current, [field]: event.target.value }));

  const inputs = [
    { id: 'averagePrice', label: copy.averagePrice, suffix: 'RON' },
    { id: 'appointmentsPerMonth', label: copy.appointmentsPerMonth, suffix: copy.perMonth },
    { id: 'noShowsPerMonth', label: copy.noShowsPerMonth, suffix: copy.perMonth },
  ];

  return (
    <main className="kv-page kv-grain">
      <div className="kv-wrap">
        <Reveal>
          <button type="button" className="kv-back" onClick={goHome}>
            <ChevronLeft size={16} />
            {t.back}
          </button>
        </Reveal>
        <div className="kv-pagegrid">
          <Reveal delay={60}>
            <div>
              <Eyebrow>{copy.eyebrow}</Eyebrow>
              <h1 className="kv-h1 kv-display" style={{ fontSize: 'clamp(2.3rem, 6.5vw, 4.2rem)' }}>
                {copy.title}
              </h1>
              <p className="kv-lead">{copy.body}</p>
              <p className="kv-quote" style={{ fontSize: '1rem', color: 'var(--ivory-soft)' }}>
                {copy.insight}
              </p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="kv-panel">
              {inputs.map((input) => (
                <label key={input.id} htmlFor={`ns-${input.id}`} className="kv-field">
                  <span className="kv-label">{input.label}</span>
                  <span className="kv-inputrow">
                    <input
                      id={`ns-${input.id}`}
                      type="number"
                      min="0"
                      inputMode="decimal"
                      value={values[input.id]}
                      onChange={handleChange(input.id)}
                    />
                    <span className="kv-suffix">{input.suffix}</span>
                  </span>
                </label>
              ))}

              <div className="kv-resultbox">
                <span className="kv-eyebrow" style={{ fontSize: 10 }}>
                  <i /><i /><i />
                  {copy.resultEyebrow}
                </span>
                <div className="kv-results">
                  <div>
                    <div className="kv-result-l">{copy.monthlyLoss}</div>
                    <div className="kv-result-v">{formatRon(monthlyLoss)}</div>
                  </div>
                  <div>
                    <div className="kv-result-l">{copy.yearlyLoss}</div>
                    <div className="kv-result-v">{formatRon(yearlyLoss)}</div>
                  </div>
                </div>
                <div className="kv-ratebar">
                  <div className="kv-ratebar-track">
                    <div className="kv-ratebar-fill" style={{ width: `${rate}%` }} />
                  </div>
                  <div className="kv-ratebar-label">
                    <span>{copy.rate}</span>
                    <span>{rate.toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              <p className="kv-tip" style={{ marginTop: 16 }}>
                <Check size={14} />
                {copy.note}
              </p>

              <CaptureCard
                type="calculator_report"
                lang={lang}
                extra={{ monthlyLoss, yearlyLoss, averagePrice, appointments, noShows }}
              />

              <div className="kv-genbtns">
                <button type="button" className="kv-btn kv-btn-primary" style={{ flex: 1 }} onClick={() => setView('audit')}>
                  {copy.audit}
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
};

const ReviewsView = ({ t, lang, goHome }) => {
  const copy = reviewCopy[lang] || reviewCopy.ro;
  const [salonName, setSalonName] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [tone, setTone] = useState('warm');
  const [variant, setVariant] = useState(0);
  const [copied, setCopied] = useState(false);

  const message = buildReviewMessage(lang, tone, variant, salonName, serviceName);

  useEffect(() => {
    if (!copied) return undefined;
    const id = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(id);
  }, [copied]);

  const copyMessage = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(message);
      ok = true;
    } catch {
      try {
        const ta = document.createElement('textarea');
        ta.value = message;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand('copy');
        document.body.removeChild(ta);
      } catch {
        ok = false;
      }
    }
    if (ok) setCopied(true);
  };

  return (
    <main className="kv-page kv-grain">
      <div className="kv-wrap">
        <Reveal>
          <button type="button" className="kv-back" onClick={goHome}>
            <ChevronLeft size={16} />
            {t.back}
          </button>
        </Reveal>
        <div className="kv-pagegrid">
          <Reveal delay={60}>
            <div>
              <Eyebrow>{copy.eyebrow}</Eyebrow>
              <h1 className="kv-h1 kv-display" style={{ fontSize: 'clamp(2.3rem, 6.5vw, 4.2rem)' }}>
                {copy.title}
              </h1>
              <p className="kv-lead">{copy.body}</p>
              <p className="kv-tip">
                <Sparkles size={14} />
                {copy.tip}
              </p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="kv-panel">
              <label className="kv-field" htmlFor="rv-salon">
                <span className="kv-label">{copy.salonLabel}</span>
                <span className="kv-inputrow">
                  <input
                    id="rv-salon"
                    type="text"
                    value={salonName}
                    placeholder={copy.salonPlaceholder}
                    onChange={(e) => setSalonName(e.target.value)}
                  />
                </span>
              </label>
              <label className="kv-field" htmlFor="rv-service">
                <span className="kv-label">{copy.serviceLabel}</span>
                <span className="kv-inputrow">
                  <input
                    id="rv-service"
                    type="text"
                    value={serviceName}
                    placeholder={copy.servicePlaceholder}
                    onChange={(e) => setServiceName(e.target.value)}
                  />
                </span>
              </label>
              <div className="kv-field">
                <span className="kv-label">{copy.toneLabel}</span>
                <div className="kv-tones" role="group" aria-label={copy.toneLabel}>
                  {copy.tones.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={tone === option.id}
                      onClick={() => { setTone(option.id); setVariant(0); }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="kv-field" style={{ marginTop: 20 }}>
                <span className="kv-label">{copy.resultLabel}</span>
                <div className="kv-msgout" key={`${tone}-${variant}-${lang}`}>{message}</div>
              </div>

              <div className="kv-genbtns">
                <button type="button" className="kv-btn kv-btn-primary" style={{ flex: 1 }} onClick={copyMessage}>
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? copy.copiedLabel : copy.copyLabel}
                </button>
                <button
                  type="button"
                  className="kv-btn kv-btn-ghost"
                  onClick={() => setVariant((v) => v + 1)}
                >
                  <Sparkles size={15} />
                  {copy.anotherLabel}
                </button>
              </div>

              <CaptureCard type="reviews_pack" lang={lang} extra={{ tone, salonName }} />
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
};

/* ============================================================
   APP — in-memory "router" so every page previews here.
   PRODUCTION: map these views to real routes for SEO.
   ============================================================ */

export default function SalonsLanding() {
  const [lang, setLang] = useState('ro');
  const [view, _setView] = useState('home'); // 'home' | 'calculator' | 'reviews' | 'audit' | 'privacy' | 'terms'
  const homeScroll = useRef(0);
  const skipRestore = useRef(false);
  const t = salonCopy[lang];

  // Remember where the visitor was on the home page, so "back" from a tool
  // page returns them to the same spot instead of the top.
  const setView = (next) => {
    if (view === 'home' && next !== 'home') homeScroll.current = window.scrollY;
    _setView(next);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (view !== 'home') {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }
    if (skipRestore.current) {
      skipRestore.current = false;
      return;
    }
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        window.scrollTo({ top: homeScroll.current, behavior: 'auto' })
      )
    );
  }, [view]);

  const goHome = () => setView('home');

  const goSection = (id) => {
    if (view !== 'home') {
      skipRestore.current = true;
      setView('home');
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        })
      );
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="kv-root">
      <SalonStyles />
      <ExtraStyles />
      <Nav t={t} lang={lang} setLang={setLang} goSection={goSection} goHome={goHome} goAudit={() => setView('audit')} />

      {view === 'calculator' ? (
        <CalculatorView t={t} lang={lang} goHome={goHome} setView={setView} />
      ) : view === 'reviews' ? (
        <ReviewsView t={t} lang={lang} goHome={goHome} />
      ) : view === 'audit' ? (
        <AuditView lang={lang} goHome={goHome} />
      ) : view === 'privacy' || view === 'terms' ? (
        <LegalView lang={lang} kind={view} goHome={goHome} />
      ) : (
        <main>
          <Hero t={t} lang={lang} setView={setView} />
          <StatsStrip lang={lang} />
          <StorySection t={t} />
          <ProblemsSection t={t} />
          <ToolsSection t={t} setView={setView} />
          <MysterySection lang={lang} />
          <GuideSection t={t} lang={lang} setView={setView} />
          <ExperienceSection t={t} />
          <ServicesSection t={t} setView={setView} />
          <ProcessSection t={t} />
          <FounderSection lang={lang} setView={setView} />
          <MetricsBand t={t} />
          <SummerStrip lang={lang} />
          <FinalCTA t={t} lang={lang} setView={setView} />
        </main>
      )}

      <Footer t={t} goSection={goSection} setView={setView} />
      <WhatsAppFab lang={lang} />
    </div>
  );
}

/* ============================================================
   v3 ADDITIONS — Lead machine layer
   Audit form · capture gates · mystery client test · founder
   trust · stats strip · summer pack · legal pages
   ============================================================ */

// TODO(production): create this webhook in n8n (import kavi-lead-capture.json)
// and replace the path below. While it contains 'REPLACE', the preview
// simulates a successful submission so every flow can be tested here.
const LEADS_WEBHOOK_URL = 'https://n8n.kaviautomation.com/webhook/REPLACE-salon-leads';

// Optional hero photo for production (e.g. '/salon-hero-premium.png').
// Leave empty to keep the pure CSS art, which works everywhere incl. this preview.
const HERO_IMAGE = '';

async function submitLead(type, data, lang) {
  const payload = { type, lang, page: 'salons', ts: new Date().toISOString(), ...data };
  if (LEADS_WEBHOOK_URL.includes('REPLACE')) {
    await new Promise((r) => setTimeout(r, 700)); // preview simulation
    return true;
  }
  try {
    const res = await fetch(LEADS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/* ---------------- copy ---------------- */

const leadCopy = {
  ro: {
    placeholder: 'WhatsApp sau email',
    consent: 'Trimiterea înseamnă acordul tău de a primi acest material. Fără spam, fără liste.',
    sending: 'Se trimite...',
    error: 'Nu a mers. Mai încearcă o dată sau scrie-ne pe WhatsApp.',
    types: {
      calculator_report: {
        title: 'Vrei raportul complet, gratuit?',
        body: 'Îți trimitem analiza completă plus 3 soluții personalizate pentru a recupera această sumă.',
        button: 'Trimite-mi raportul',
        success: 'Gata! Raportul ajunge la tine în maximum 24 de ore. 🎉',
      },
      reviews_pack: {
        title: 'Vrei pachetul complet de 12 mesaje?',
        body: 'Mesaje pentru toate situațiile: după vizită, reminder blând, răspuns la recenzii bune și mai puțin bune.',
        button: 'Trimite-mi pachetul',
        success: 'Trimis! Pachetul ajunge la tine în maximum 24 de ore. 🎉',
      },
      summer_pack: {
        title: 'Vară fără scaune goale',
        body: 'Pachetul de campanii de vară pentru saloane: idei, mesaje și oferte gata de folosit. Gratuit.',
        button: 'Vreau pachetul',
        success: 'Trimis! Pachetul de vară ajunge la tine în curând. ☀️',
      },
    },
  },
  en: {
    placeholder: 'WhatsApp or email',
    consent: 'Submitting means you agree to receive this material. No spam, no lists.',
    sending: 'Sending...',
    error: 'Something went wrong. Try again or message us on WhatsApp.',
    types: {
      calculator_report: {
        title: 'Want the full report, free?',
        body: 'We will send the complete analysis plus 3 personalised fixes to recover this amount.',
        button: 'Send me the report',
        success: 'Done! The report reaches you within 24 hours. 🎉',
      },
      reviews_pack: {
        title: 'Want the full 12-message pack?',
        body: 'Messages for every situation: after the visit, gentle reminders, replying to good and bad reviews.',
        button: 'Send me the pack',
        success: 'Sent! The pack reaches you within 24 hours. 🎉',
      },
      summer_pack: {
        title: 'A summer without empty chairs',
        body: 'The summer campaign pack for salons: ideas, messages and offers ready to use. Free.',
        button: 'I want the pack',
        success: 'Sent! The summer pack is on its way. ☀️',
      },
    },
  },
};

const statsCopy = {
  ro: {
    items: [
      { value: '78%', label: 'dintre cliente verifică Instagramul salonului înainte să rezerve' },
      { value: '−38%', label: 'no-show-uri în saloanele cu remindere automate de confirmare' },
      { value: '3x', label: 'mai multe cliente noi pentru saloanele care adoptă tehnologia' },
    ],
    source: 'Surse: studii din industria beauty & wellness, 2025–2026',
  },
  en: {
    items: [
      { value: '78%', label: 'of clients check a salon\u2019s Instagram before booking' },
      { value: '−38%', label: 'no-shows in salons using automated confirmation reminders' },
      { value: '3x', label: 'more new clients for salons that adopt technology' },
    ],
    source: 'Sources: beauty & wellness industry studies, 2025–2026',
  },
};

const mysteryCopy = {
  ro: {
    eyebrow: 'Testul Clientei Misterioase',
    title: 'Cât de repede răspunde salonul tău? Hai să aflăm.',
    body: 'Cu acordul tău, trimitem salonului tău un mesaj realist de clientă, măsurăm timpul și calitatea răspunsului și îți trimitem un mini-raport pe WhatsApp, în 48 de ore. Discret, gratuit, fără nicio obligație.',
    steps: [
      'Ne lași Instagramul salonului și WhatsApp-ul tău.',
      'Trimitem un mesaj realist de clientă, ca oricare altul.',
      'Primești raportul: timp de răspuns, ton și 2 recomandări.',
    ],
    cap: 'Limităm testele la 5 pe săptămână — răspundem în ordinea cererilor.',
    igLabel: 'Instagramul salonului',
    igPlaceholder: '@salonul_tau',
    waLabel: 'WhatsApp-ul tău',
    waPlaceholder: '07xx xxx xxx',
    consent: 'Da, sunt proprietarul/proprietara salonului și accept testul.',
    button: 'Testează-mi salonul',
    success: 'Cererea a fost primită! Raportul tău ajunge pe WhatsApp în maximum 48 de ore. 🕵️‍♀️',
    badge: '5 locuri / săptămână',
  },
  en: {
    eyebrow: 'The Mystery Client Test',
    title: 'How fast does your salon reply? Let\u2019s find out.',
    body: 'With your permission, we send your salon a realistic client inquiry, measure the response time and quality, and send you a mini report on WhatsApp within 48 hours. Discreet, free, no obligation.',
    steps: [
      'Leave us the salon\u2019s Instagram and your WhatsApp.',
      'We send a realistic client message, like any other.',
      'You get the report: response time, tone and 2 recommendations.',
    ],
    cap: 'We limit tests to 5 per week — first come, first served.',
    igLabel: 'Salon Instagram',
    igPlaceholder: '@your_salon',
    waLabel: 'Your WhatsApp',
    waPlaceholder: '07xx xxx xxx',
    consent: 'Yes, I own this salon and I accept the test.',
    button: 'Test my salon',
    success: 'Request received! Your report reaches WhatsApp within 48 hours. 🕵️‍♀️',
    badge: '5 spots / week',
  },
};

const founderCopy = {
  ro: {
    eyebrow: 'Cine construiește',
    title: 'Un studio mic. O atenție mare.',
    p1: 'Kavi Automation este un studio tehnic independent din România. Nu există departament de vânzări și nici intermediari: persoana cu care vorbești este aceeași care construiește, testează și ajustează sistemul salonului tău.',
    p2: 'Folosim aceleași automatizări pentru propria afacere — fiecare instrument de pe acest site rulează pe exact sistemul pe care îl instalăm în saloane.',
    initials: 'HK',
    name: 'Hansani Kavindi',
    role: 'Fondator, Kavi Automation',
    chips: ['Conform GDPR', 'WhatsApp Cloud API oficial', 'AI transparent, revizuit de om', 'Răspuns în aceeași zi'],
    disclosure: 'Acolo unde folosim AI, spunem clar. Conținutul sensibil este întotdeauna revizuit de un om.',
    cta: 'Primește auditul gratuit',
  },
  en: {
    eyebrow: 'Who builds this',
    title: 'A small studio. A lot of care.',
    p1: 'Kavi Automation is an independent technical studio in Romania. There is no sales department and no middlemen: the person you talk to is the same person who builds, tests and fine-tunes your salon\u2019s system.',
    p2: 'We run our own business on the same automations — every tool on this site runs on the exact system we install in salons.',
    initials: 'HK',
    name: 'Hansani Kavindi',
    role: 'Founder, Kavi Automation',
    chips: ['GDPR compliant', 'Official WhatsApp Cloud API', 'Transparent, human-reviewed AI', 'Same-day replies'],
    disclosure: 'Where we use AI, we say so clearly. Sensitive content is always reviewed by a human.',
    cta: 'Get the free audit',
  },
};

const auditCopy = {
  ro: {
    eyebrow: 'Audit gratuit',
    title: 'Planul tău personalizat de creștere. Gratuit.',
    body: 'Răspunzi la câteva întrebări în 2 minute. În 24–48 de ore primești pe WhatsApp un raport personalizat: unde pierzi programări, 5 acțiuni rapide pentru săptămâna asta și ce ar merita automatizat. Fără nicio obligație.',
    note: '5 locuri pe săptămână · raport pregătit de un om, cu ajutor AI · conform GDPR',
    steps: ['Salonul tău', 'Provocările', 'Contact'],
    s1: {
      salonName: { label: 'Numele salonului', ph: 'ex. Salon Aria' },
      city: { label: 'Orașul', ph: 'ex. Cluj-Napoca' },
      type: { label: 'Tipul salonului', options: ['Coafor', 'Unghii', 'Gene & sprâncene', 'Barbershop', 'Beauty studio', 'Altul'] },
      team: { label: 'Echipa', options: ['Doar eu', '2–4', '5+'] },
    },
    s2: {
      problems: { label: 'Cele mai mari provocări (alege până la 3)', options: ['Mesaje fără răspuns', 'No-show-uri', 'Puține recenzii Google', 'Conținut / Instagram slab', 'Clientele nu revin', 'Puține programări noi'] },
      goals: { label: 'Ce îți dorești cel mai mult', options: ['Mai multe programări', 'Mai multe recenzii', 'Cliente care revin', 'Imagine premium', 'Automatizare / timp'] },
      slowDays: { label: 'Zile mai lente (opțional)', options: ['Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sâ', 'Du'] },
      booking: { label: 'Cum primești programările acum', options: ['WhatsApp', 'Instagram', 'Telefon', 'MERO / Booksy', 'Agendă pe hârtie'] },
    },
    s3: {
      name: { label: 'Numele tău', ph: 'ex. Andreea' },
      contact: { label: 'WhatsApp (sau email)', ph: '07xx xxx xxx' },
      instagram: { label: 'Instagramul salonului (opțional)', ph: '@salonul_tau' },
      consent: 'Sunt de acord ca datele trimise să fie folosite pentru pregătirea și trimiterea raportului meu. Detalii în Politica de confidențialitate.',
    },
    back: 'Înapoi',
    next: 'Continuă',
    submit: 'Trimite și primește raportul',
    required: 'Completează câmpurile marcate ca obligatorii.',
    successTitle: 'Mulțumim, {name}! 🎉',
    successBody: 'Raportul tău personalizat ajunge pe WhatsApp sau email în 24–48 de ore. Între timp poți încerca instrumentele gratuite — sau, dacă preferi să vorbim direct:',
    successCall: 'Rezervă un apel de 15 minute',
    successBack: 'Înapoi la pagină',
  },
  en: {
    eyebrow: 'Free audit',
    title: 'Your personalised growth plan. Free.',
    body: 'Answer a few questions in 2 minutes. Within 24–48 hours you get a personalised report on WhatsApp: where you lose bookings, 5 quick actions for this week, and what is worth automating. No obligation.',
    note: '5 spots per week · report prepared by a human, with AI help · GDPR compliant',
    steps: ['Your salon', 'Challenges', 'Contact'],
    s1: {
      salonName: { label: 'Salon name', ph: 'e.g. Salon Aria' },
      city: { label: 'City', ph: 'e.g. Cluj-Napoca' },
      type: { label: 'Salon type', options: ['Hair', 'Nails', 'Lashes & brows', 'Barbershop', 'Beauty studio', 'Other'] },
      team: { label: 'Team size', options: ['Just me', '2–4', '5+'] },
    },
    s2: {
      problems: { label: 'Biggest challenges (pick up to 3)', options: ['Unanswered messages', 'No-shows', 'Few Google reviews', 'Weak content / Instagram', 'Clients not returning', 'Few new bookings'] },
      goals: { label: 'What you want most', options: ['More bookings', 'More reviews', 'Returning clients', 'Premium image', 'Automation / time'] },
      slowDays: { label: 'Slow days (optional)', options: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'] },
      booking: { label: 'How you take bookings today', options: ['WhatsApp', 'Instagram', 'Phone', 'MERO / Booksy', 'Paper agenda'] },
    },
    s3: {
      name: { label: 'Your name', ph: 'e.g. Andreea' },
      contact: { label: 'WhatsApp (or email)', ph: '07xx xxx xxx' },
      instagram: { label: 'Salon Instagram (optional)', ph: '@your_salon' },
      consent: 'I agree that the submitted data is used to prepare and send my report. Details in the Privacy Policy.',
    },
    back: 'Back',
    next: 'Continue',
    submit: 'Send and get the report',
    required: 'Please fill in the required fields.',
    successTitle: 'Thank you, {name}! 🎉',
    successBody: 'Your personalised report reaches WhatsApp or email within 24–48 hours. Meanwhile you can try the free tools — or, if you prefer to talk directly:',
    successCall: 'Book a 15-minute call',
    successBack: 'Back to the page',
  },
};

const legalCopy = {
  ro: {
    privacy: {
      title: 'Politica de confidențialitate',
      updated: 'Ultima actualizare: iunie 2026',
      sections: [
        { h: 'Cine suntem', p: 'Kavi Automation este un studio de automatizare din România (kaviautomation.com). Pentru orice întrebare legată de date, scrie-ne la contact@kaviautomation.com.' },
        { h: 'Ce date colectăm', p: 'Doar datele pe care ni le trimiți prin formulare: nume, contact (WhatsApp sau email), informații despre salon (nume, oraș, tip, provocări) și, opțional, linkuri publice de social media.' },
        { h: 'De ce le colectăm', p: 'Pentru a pregăti și a-ți trimite materialele cerute (raport, pachet, test) și pentru a-ți răspunde. Temei legal: consimțământul tău, exprimat la trimiterea formularului.' },
        { h: 'Unde sunt stocate', p: 'În sisteme operate de noi (server n8n găzduit în UE) și în instrumente de lucru (Airtable). Nu vindem și nu închiriem datele nimănui.' },
        { h: 'Cât timp le păstrăm', p: 'Maximum 24 de luni de la ultima interacțiune sau până când ne ceri ștergerea lor.' },
        { h: 'Drepturile tale', p: 'Poți cere oricând accesul, corectarea sau ștergerea datelor tale, printr-un simplu mesaj la contact@kaviautomation.com. Răspundem în maximum 30 de zile.' },
        { h: 'AI și transparență', p: 'Unele materiale sunt pregătite cu ajutorul unui asistent AI și revizuite de un om. Nu folosim datele tale pentru a antrena modele AI.' },
        { h: 'Cookie-uri', p: 'Site-ul nu folosește cookie-uri de marketing sau de urmărire.' },
      ],
    },
    terms: {
      title: 'Termeni și condiții',
      updated: 'Ultima actualizare: iunie 2026',
      sections: [
        { h: 'Serviciile', p: 'Kavi Automation oferă materiale informative gratuite (rapoarte, calculatoare, ghiduri) și servicii plătite de automatizare și comunicare pentru saloane, conform ofertelor agreate individual.' },
        { h: 'Materialele gratuite', p: 'Rapoartele și instrumentele gratuite au caracter informativ și educațional. Ele nu reprezintă consultanță juridică, financiară sau medicală.' },
        { h: 'Rezultate', p: 'Lucrăm pe bază de date și bune practici, dar nu putem garanta rezultate specifice — performanța depinde și de implementarea în salon.' },
        { h: 'Plăți', p: 'Serviciile plătite se facturează conform ofertei acceptate în scris, înainte de începerea lucrului.' },
        { h: 'Proprietate intelectuală', p: 'Materialele livrate pot fi folosite liber de salonul client pentru propria activitate. Revânzarea sau redistribuirea lor nu este permisă.' },
        { h: 'Legea aplicabilă', p: 'Acești termeni sunt guvernați de legea română. Pentru soluționarea alternativă a litigiilor: ANPC SAL și platforma europeană SOL.' },
      ],
    },
  },
  en: {
    privacy: {
      title: 'Privacy Policy',
      updated: 'Last updated: June 2026',
      sections: [
        { h: 'Who we are', p: 'Kavi Automation is an automation studio based in Romania (kaviautomation.com). For any data questions, write to contact@kaviautomation.com.' },
        { h: 'What we collect', p: 'Only the data you send through forms: name, contact (WhatsApp or email), salon details (name, city, type, challenges) and, optionally, public social media links.' },
        { h: 'Why we collect it', p: 'To prepare and send the materials you requested (report, pack, test) and to reply to you. Legal basis: your consent, given when submitting a form.' },
        { h: 'Where it is stored', p: 'In systems we operate (an EU-hosted n8n server) and in work tools (Airtable). We never sell or rent your data.' },
        { h: 'How long we keep it', p: 'Up to 24 months from your last interaction, or until you ask us to delete it.' },
        { h: 'Your rights', p: 'You can request access, correction or deletion of your data at any time via contact@kaviautomation.com. We reply within 30 days.' },
        { h: 'AI and transparency', p: 'Some materials are prepared with the help of an AI assistant and reviewed by a human. We do not use your data to train AI models.' },
        { h: 'Cookies', p: 'This site does not use marketing or tracking cookies.' },
      ],
    },
    terms: {
      title: 'Terms and Conditions',
      updated: 'Last updated: June 2026',
      sections: [
        { h: 'Services', p: 'Kavi Automation provides free informational materials (reports, calculators, guides) and paid automation and communication services for salons, under individually agreed offers.' },
        { h: 'Free materials', p: 'Free reports and tools are informational and educational. They do not constitute legal, financial or medical advice.' },
        { h: 'Results', p: 'We work from data and good practice, but cannot guarantee specific results — performance also depends on in-salon implementation.' },
        { h: 'Payments', p: 'Paid services are invoiced according to the offer accepted in writing before work begins.' },
        { h: 'Intellectual property', p: 'Delivered materials may be freely used by the client salon for its own activity. Reselling or redistributing them is not permitted.' },
        { h: 'Governing law', p: 'These terms are governed by Romanian law. For alternative dispute resolution: ANPC SAL and the EU ODR platform.' },
      ],
    },
  },
};

/* ---------------- styles ---------------- */

const ExtraStyles = () => (
  <style>{`
    .kv-statsband { border-top: 1px solid rgba(251,244,232,0.08); border-bottom: 1px solid rgba(251,244,232,0.08);
      background: var(--espresso-2); padding: 30px 0 22px; }
    .kv-statsgrid { display: grid; gap: 18px; }
    @media (min-width: 640px) { .kv-statsgrid { grid-template-columns: repeat(3, 1fr); } }
    .kv-stat { text-align: center; }
    .kv-stat-v { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 2.1rem; font-weight: 600; color: var(--gold); line-height: 1; }
    .kv-stat-l { margin: 7px auto 0; max-width: 250px; font-size: 0.82rem; line-height: 1.55; color: var(--muted); }
    .kv-stat-src { margin-top: 16px; text-align: center; font-size: 0.68rem; letter-spacing: 0.08em; color: rgba(203,188,172,0.45); }

    .kv-choice { display: flex; flex-wrap: wrap; gap: 8px; }
    .kv-choice button { padding: 11px 15px; border-radius: 999px; font-size: 0.85rem; font-weight: 700;
      border: 1px solid rgba(251,244,232,0.16); background: rgba(17,11,9,0.55); color: var(--ivory-soft);
      transition: all 180ms ease; min-height: 42px; }
    .kv-choice button:hover { border-color: rgba(216,180,106,0.5); }
    .kv-choice button[aria-pressed='true'] { background: var(--emerald); border-color: var(--emerald); color: #fff; }

    .kv-prog { display: flex; align-items: center; gap: 8px; margin-bottom: 22px; }
    .kv-prog-step { display: flex; align-items: center; gap: 7px; font-size: 0.72rem; font-weight: 800;
      letter-spacing: 0.1em; text-transform: uppercase; color: rgba(203,188,172,0.55); }
    .kv-prog-dot { width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
      font-size: 0.7rem; border: 1px solid rgba(251,244,232,0.2); background: rgba(17,11,9,0.6); transition: all 250ms ease; }
    .kv-prog-step.active { color: var(--gold); }
    .kv-prog-step.active .kv-prog-dot { background: var(--gold); border-color: var(--gold); color: var(--espresso); }
    .kv-prog-step.done .kv-prog-dot { background: var(--emerald); border-color: var(--emerald); color: #fff; }
    .kv-prog-line { flex: 1; height: 1px; background: rgba(251,244,232,0.12); }

    .kv-check { display: flex; align-items: flex-start; gap: 11px; cursor: pointer; margin-top: 18px;
      font-size: 0.82rem; line-height: 1.6; color: var(--muted); }
    .kv-check-box { width: 21px; height: 21px; flex: none; margin-top: 1px; border-radius: 6px;
      border: 1px solid rgba(251,244,232,0.3); background: rgba(17,11,9,0.6); display: flex;
      align-items: center; justify-content: center; color: transparent; transition: all 180ms ease; }
    .kv-check[aria-pressed='true'] .kv-check-box { background: var(--emerald); border-color: var(--emerald); color: #fff; }

    .kv-capture { margin-top: 22px; border-radius: 14px; padding: 20px;
      border: 1px solid rgba(15,143,103,0.32);
      background: linear-gradient(135deg, rgba(15,143,103,0.16), rgba(216,180,106,0.06)); }
    .kv-capture h4 { margin: 0; font-size: 1.05rem; font-weight: 800; color: var(--ivory); }
    .kv-capture p { margin: 7px 0 0; font-size: 0.85rem; line-height: 1.65; color: var(--muted); }
    .kv-capture-row { display: flex; flex-direction: column; gap: 10px; margin-top: 14px; }
    @media (min-width: 640px) { .kv-capture-row { flex-direction: row; } .kv-capture-row .kv-inputrow { flex: 1; } }
    .kv-capture-consent { margin-top: 10px; font-size: 0.7rem; line-height: 1.55; color: rgba(203,188,172,0.6); }
    .kv-capture-success { display: flex; align-items: flex-start; gap: 10px; margin-top: 14px; padding: 14px 16px;
      border-radius: 12px; background: rgba(15,143,103,0.2); border: 1px solid rgba(56,201,149,0.4);
      font-size: 0.9rem; line-height: 1.6; color: var(--ivory); }

    .kv-mystery-badge { display: inline-flex; align-items: center; gap: 7px; padding: 7px 14px; border-radius: 999px;
      border: 1px solid rgba(216,180,106,0.4); background: rgba(216,180,106,0.1); font-size: 0.7rem;
      font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); }
    .kv-mystery-step { display: flex; gap: 13px; align-items: flex-start; }
    .kv-mystery-step + .kv-mystery-step { margin-top: 15px; }
    .kv-mystery-num { width: 27px; height: 27px; flex: none; border-radius: 50%; display: flex; align-items: center;
      justify-content: center; font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 700;
      border: 1px solid rgba(216,180,106,0.45); color: var(--gold); font-size: 0.95rem; }
    .kv-mystery-step p { margin: 3px 0 0; font-size: 0.9rem; line-height: 1.65; color: var(--muted); }

    .kv-avatar { width: 130px; height: 130px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
      font-family: 'Cormorant Garamond', Georgia, serif; font-size: 2.6rem; font-weight: 600; color: var(--gold);
      border: 1px solid rgba(216,180,106,0.55);
      background: radial-gradient(circle at 32% 28%, rgba(216,180,106,0.22), rgba(23,18,16,0.9) 70%);
      box-shadow: 0 0 36px rgba(216,180,106,0.18), inset 0 0 24px rgba(0,0,0,0.4); }
    .kv-founder-card { display: flex; flex-direction: column; align-items: center; gap: 14px; text-align: center; }
    .kv-founder-name { font-weight: 800; color: var(--ivory); }
    .kv-founder-role { font-size: 0.78rem; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(203,188,172,0.65); margin-top: 3px; }
    .kv-trust-chips { display: flex; flex-wrap: wrap; gap: 9px; margin-top: 20px; }
    .kv-trust-chips span { display: inline-flex; align-items: center; gap: 7px; padding: 9px 14px; border-radius: 999px;
      border: 1px solid rgba(251,244,232,0.13); background: rgba(251,244,232,0.05); font-size: 0.78rem; font-weight: 700; color: var(--ivory-soft); }

    .kv-banner { border-radius: 16px; border: 1px solid rgba(216,180,106,0.3); overflow: hidden;
      background:
        radial-gradient(60% 90% at 85% 10%, rgba(216,180,106,0.2), transparent 70%),
        linear-gradient(135deg, #221710, #16100c 70%);
      padding: 26px; }
    @media (min-width: 640px) { .kv-banner { padding: 34px; } }

    .kv-legal-prose h1 { font-family: 'Cormorant Garamond', Georgia, serif; font-size: clamp(2rem, 5vw, 2.9rem); margin: 14px 0 4px; color: var(--ivory); }
    .kv-legal-updated { font-size: 0.78rem; color: rgba(203,188,172,0.55); margin-bottom: 26px; }
    .kv-legal-prose h3 { font-size: 1rem; font-weight: 800; color: var(--gold); margin: 24px 0 7px; }
    .kv-legal-prose p { margin: 0; font-size: 0.93rem; line-height: 1.85; color: var(--muted); max-width: 660px; }

    /* hero + tool-page background art */
    .kv-hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.4; }
    .kv-hero-veil { position: absolute; inset: 0; pointer-events: none;
      background:
        radial-gradient(70% 60% at 72% 18%, rgba(216,180,106,0.10), transparent 70%),
        linear-gradient(180deg, rgba(26,18,14,0.45) 0%, rgba(17,11,9,0.78) 60%, var(--espresso) 100%); }
    .kv-hero-ring { position: absolute; right: -110px; top: 6%; width: 430px; height: 430px;
      border-radius: 50%; border: 1px solid rgba(216,180,106,0.20); pointer-events: none;
      box-shadow: inset 0 0 60px rgba(216,180,106,0.07), 0 0 80px rgba(216,180,106,0.06); }
    .kv-hero-ring::after { content: ''; position: absolute; inset: 26px; border-radius: 50%;
      border: 1px solid rgba(216,180,106,0.10); }
    @media (max-width: 1023px) { .kv-hero-ring { width: 270px; height: 270px; right: -100px; top: 4%; opacity: 0.65; } }
    .kv-page::before { content: ''; position: absolute; left: -130px; top: -110px; width: 380px; height: 380px;
      border-radius: 50%; border: 1px solid rgba(216,180,106,0.14); pointer-events: none;
      box-shadow: inset 0 0 60px rgba(216,180,106,0.05); }
  `}</style>
);

/* ---------------- shared pieces ---------------- */

const ConsentCheck = ({ checked, onToggle, children }) => (
  <button type="button" className="kv-check" aria-pressed={checked} onClick={onToggle}>
    <span className="kv-check-box"><Check size={13} /></span>
    <span style={{ textAlign: 'left' }}>{children}</span>
  </button>
);

const CaptureCard = ({ type, lang, extra = {}, bare = false }) => {
  const c = (leadCopy[lang] || leadCopy.ro);
  const tc = c.types[type];
  const [contact, setContact] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | done | error

  const send = async () => {
    if (!contact.trim() || status === 'sending') return;
    setStatus('sending');
    const ok = await submitLead(type, { contact: contact.trim(), ...extra }, lang);
    setStatus(ok ? 'done' : 'error');
  };

  const form = status === 'done' ? (
    <div className="kv-capture-success">
      <Check size={17} color="#38c995" style={{ flex: 'none', marginTop: 2 }} />
      <span>{tc.success}</span>
    </div>
  ) : (
    <>
      <div className="kv-capture-row">
        <span className="kv-inputrow">
          <input
            type="text"
            inputMode="email"
            value={contact}
            placeholder={c.placeholder}
            onChange={(e) => setContact(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
          />
        </span>
        <button type="button" className="kv-btn kv-btn-primary" onClick={send} disabled={status === 'sending'}>
          {status === 'sending' ? c.sending : tc.button}
          <Send size={15} />
        </button>
      </div>
      {status === 'error' ? (
        <p style={{ color: '#e8a0a0', fontSize: '0.8rem', marginTop: 10 }}>{c.error}</p>
      ) : null}
      <p className="kv-capture-consent">{c.consent}</p>
    </>
  );

  if (bare) {
    return (
      <div>
        <h4 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800, color: 'var(--ivory)' }} className="kv-display">{tc.title}</h4>
        <p style={{ margin: '8px 0 0', fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--muted)', maxWidth: 480 }}>{tc.body}</p>
        {form}
      </div>
    );
  }
  return (
    <div className="kv-capture">
      <h4>{tc.title}</h4>
      <p>{tc.body}</p>
      {form}
    </div>
  );
};

/* ---------------- home sections ---------------- */

const StatsStrip = ({ lang }) => {
  const c = statsCopy[lang] || statsCopy.ro;
  return (
    <section className="kv-statsband">
      <div className="kv-wrap">
        <div className="kv-statsgrid">
          {c.items.map((s) => (
            <Reveal key={s.value}>
              <div className="kv-stat">
                <div className="kv-stat-v">{s.value}</div>
                <div className="kv-stat-l">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="kv-stat-src">{c.source}</div>
      </div>
    </section>
  );
};

const MysterySection = ({ lang }) => {
  const c = mysteryCopy[lang] || mysteryCopy.ro;
  const [ig, setIg] = useState('');
  const [wa, setWa] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState('idle');
  const lc = leadCopy[lang] || leadCopy.ro;

  const send = async () => {
    if (!ig.trim() || !wa.trim() || !consent || status === 'sending') return;
    setStatus('sending');
    const ok = await submitLead('mystery_test', { instagram: ig.trim(), contact: wa.trim() }, lang);
    setStatus(ok ? 'done' : 'error');
  };

  return (
    <section className="kv-section">
      <div
        className="kv-wrap"
        style={{ display: 'grid', gap: 44, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', alignItems: 'center' }}
      >
        <Reveal>
          <div>
            <span className="kv-mystery-badge">🕵️‍♀️ {c.badge}</span>
            <div style={{ marginTop: 16 }}>
              <Eyebrow>{c.eyebrow}</Eyebrow>
            </div>
            <h2 className="kv-h2 kv-display">{c.title}</h2>
            <p className="kv-lead">{c.body}</p>
            <div style={{ marginTop: 24 }}>
              {c.steps.map((s, i) => (
                <div key={s} className="kv-mystery-step">
                  <span className="kv-mystery-num">{i + 1}</span>
                  <p>{s}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={140}>
          <div className="kv-panel">
            {status === 'done' ? (
              <div className="kv-capture-success" style={{ marginTop: 0 }}>
                <Check size={17} color="#38c995" style={{ flex: 'none', marginTop: 2 }} />
                <span>{c.success}</span>
              </div>
            ) : (
              <>
                <label className="kv-field" htmlFor="my-ig">
                  <span className="kv-label">{c.igLabel}</span>
                  <span className="kv-inputrow">
                    <input id="my-ig" type="text" value={ig} placeholder={c.igPlaceholder} onChange={(e) => setIg(e.target.value)} />
                  </span>
                </label>
                <label className="kv-field" htmlFor="my-wa">
                  <span className="kv-label">{c.waLabel}</span>
                  <span className="kv-inputrow">
                    <input id="my-wa" type="text" inputMode="tel" value={wa} placeholder={c.waPlaceholder} onChange={(e) => setWa(e.target.value)} />
                  </span>
                </label>
                <ConsentCheck checked={consent} onToggle={() => setConsent(!consent)}>{c.consent}</ConsentCheck>
                {status === 'error' ? (
                  <p style={{ color: '#e8a0a0', fontSize: '0.8rem', marginTop: 12 }}>{lc.error}</p>
                ) : null}
                <div className="kv-genbtns">
                  <button
                    type="button"
                    className="kv-btn kv-btn-primary"
                    style={{ flex: 1, opacity: ig.trim() && wa.trim() && consent ? 1 : 0.55 }}
                    onClick={send}
                  >
                    {status === 'sending' ? lc.sending : c.button}
                    <ArrowRight size={16} />
                  </button>
                </div>
                <p className="kv-capture-consent" style={{ marginTop: 12 }}>{c.cap}</p>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const FounderSection = ({ lang, setView }) => {
  const c = founderCopy[lang] || founderCopy.ro;
  return (
    <section className="kv-section kv-alt">
      <div className="kv-hairline" />
      <div
        className="kv-wrap"
        style={{ display: 'grid', gap: 44, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', alignItems: 'center' }}
      >
        <Reveal>
          {/* TODO(production): replace the initials avatar with a real founder photo —
              a real face is the #1 trust trigger for the Romanian market. */}
          <div className="kv-founder-card">
            <div className="kv-avatar kv-display">{c.initials}</div>
            <div>
              <div className="kv-founder-name">{c.name}</div>
              <div className="kv-founder-role">{c.role}</div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div>
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <h2 className="kv-h2 kv-display">{c.title}</h2>
            <p className="kv-lead">{c.p1}</p>
            <p className="kv-lead" style={{ marginTop: 12 }}>{c.p2}</p>
            <div className="kv-trust-chips">
              {c.chips.map((chip) => (
                <span key={chip}><Check size={13} color="#38c995" />{chip}</span>
              ))}
            </div>
            <p className="kv-capture-consent" style={{ marginTop: 16, maxWidth: 520 }}>{c.disclosure}</p>
            <button type="button" className="kv-textlink" onClick={() => setView('audit')}>
              {c.cta}
              <ArrowUpRight size={14} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const SummerStrip = ({ lang }) => (
  <section className="kv-section" style={{ paddingTop: 0 }}>
    <div className="kv-wrap">
      <Reveal>
        <div className="kv-banner">
          <CaptureCard type="summer_pack" lang={lang} bare />
        </div>
      </Reveal>
    </div>
  </section>
);

/* ---------------- audit wizard ---------------- */

const AuditView = ({ lang, goHome }) => {
  const c = auditCopy[lang] || auditCopy.ro;
  const lc = leadCopy[lang] || leadCopy.ro;
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState('idle');
  const [showErr, setShowErr] = useState(false);
  const [d, setD] = useState({
    salonName: '', city: '', type: '', team: '',
    problems: [], goals: [], slowDays: [], booking: '',
    name: '', contact: '', instagram: '', consent: false,
  });

  const set = (k, v) => { setShowErr(false); setD((cur) => ({ ...cur, [k]: v })); };
  const toggle = (k, v, cap = 99) =>
    setD((cur) => {
      setShowErr(false);
      const has = cur[k].includes(v);
      if (!has && cur[k].length >= cap) return cur;
      return { ...cur, [k]: has ? cur[k].filter((x) => x !== v) : [...cur[k], v] };
    });

  const stepValid = [
    () => d.salonName.trim() && d.city.trim() && d.type,
    () => d.problems.length > 0,
    () => d.name.trim() && d.contact.trim() && d.consent,
  ];

  const next = () => {
    if (!stepValid[step]()) { setShowErr(true); return; }
    setShowErr(false);
    setStep(step + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submit = async () => {
    if (!stepValid[2]()) { setShowErr(true); return; }
    setStatus('sending');
    const ok = await submitLead('audit', d, lang);
    setStatus(ok ? 'done' : 'error');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const chips = (k, options, multi = false, cap = 99) => (
    <div className="kv-choice">
      {options.map((o) => {
        const on = multi ? d[k].includes(o) : d[k] === o;
        return (
          <button
            key={o}
            type="button"
            aria-pressed={on}
            onClick={() => (multi ? toggle(k, o, cap) : set(k, o))}
          >
            {o}
          </button>
        );
      })}
    </div>
  );

  const field = (k, conf, inputMode = 'text') => (
    <label className="kv-field" htmlFor={`au-${k}`}>
      <span className="kv-label">{conf.label}</span>
      <span className="kv-inputrow">
        <input
          id={`au-${k}`}
          type="text"
          inputMode={inputMode}
          value={d[k]}
          placeholder={conf.ph}
          onChange={(e) => set(k, e.target.value)}
        />
      </span>
    </label>
  );

  if (status === 'done') {
    return (
      <main className="kv-page kv-grain">
        <div className="kv-wrap" style={{ maxWidth: 640, position: 'relative', zIndex: 1 }}>
          <div className="kv-panel" style={{ textAlign: 'center', padding: 40 }}>
            <div className="kv-avatar kv-display" style={{ width: 84, height: 84, fontSize: '2rem', margin: '0 auto 18px' }}>✓</div>
            <h1 className="kv-h2 kv-display">{c.successTitle.replace('{name}', d.name || '')}</h1>
            <p className="kv-lead" style={{ margin: '14px auto 0' }}>{c.successBody}</p>
            <div className="kv-final-ctas">
              <a className="kv-btn kv-btn-primary" href={AUDIT_URL} target="_blank" rel="noreferrer">
                {c.successCall}
                <ArrowRight size={16} />
              </a>
              <button type="button" className="kv-btn kv-btn-ghost" onClick={goHome}>
                {c.successBack}
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="kv-page kv-grain">
      <div className="kv-wrap">
        <Reveal>
          <button type="button" className="kv-back" onClick={goHome}>
            <ChevronLeft size={16} />
            {(salonCopy[lang] || salonCopy.ro).back}
          </button>
        </Reveal>
        <div className="kv-pagegrid" style={{ alignItems: 'start' }}>
          <Reveal delay={60}>
            <div>
              <Eyebrow>{c.eyebrow}</Eyebrow>
              <h1 className="kv-h1 kv-display" style={{ fontSize: 'clamp(2.3rem, 6.5vw, 4.2rem)' }}>{c.title}</h1>
              <p className="kv-lead">{c.body}</p>
              <p className="kv-tip"><Sparkles size={14} />{c.note}</p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="kv-panel">
              <div className="kv-prog">
                {c.steps.map((s, i) => (
                  <React.Fragment key={s}>
                    {i > 0 ? <span className="kv-prog-line" /> : null}
                    <span className={`kv-prog-step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
                      <span className="kv-prog-dot">{i < step ? <Check size={12} /> : i + 1}</span>
                      <span className="kv-prog-label">{s}</span>
                    </span>
                  </React.Fragment>
                ))}
              </div>

              {step === 0 ? (
                <>
                  {field('salonName', c.s1.salonName)}
                  {field('city', c.s1.city)}
                  <div className="kv-field">
                    <span className="kv-label">{c.s1.type.label}</span>
                    {chips('type', c.s1.type.options)}
                  </div>
                  <div className="kv-field">
                    <span className="kv-label">{c.s1.team.label}</span>
                    {chips('team', c.s1.team.options)}
                  </div>
                </>
              ) : null}

              {step === 1 ? (
                <>
                  <div className="kv-field">
                    <span className="kv-label">{c.s2.problems.label}</span>
                    {chips('problems', c.s2.problems.options, true, 3)}
                  </div>
                  <div className="kv-field">
                    <span className="kv-label">{c.s2.goals.label}</span>
                    {chips('goals', c.s2.goals.options, true)}
                  </div>
                  <div className="kv-field">
                    <span className="kv-label">{c.s2.slowDays.label}</span>
                    {chips('slowDays', c.s2.slowDays.options, true)}
                  </div>
                  <div className="kv-field">
                    <span className="kv-label">{c.s2.booking.label}</span>
                    {chips('booking', c.s2.booking.options)}
                  </div>
                </>
              ) : null}

              {step === 2 ? (
                <>
                  {field('name', c.s3.name)}
                  {field('contact', c.s3.contact, 'email')}
                  {field('instagram', c.s3.instagram)}
                  <ConsentCheck checked={d.consent} onToggle={() => set('consent', !d.consent)}>{c.s3.consent}</ConsentCheck>
                </>
              ) : null}

              {showErr ? (
                <p style={{ color: '#e8a0a0', fontSize: '0.82rem', marginTop: 14 }}>{c.required}</p>
              ) : null}
              {status === 'error' ? (
                <p style={{ color: '#e8a0a0', fontSize: '0.82rem', marginTop: 14 }}>{lc.error}</p>
              ) : null}

              <div className="kv-genbtns">
                {step > 0 ? (
                  <button type="button" className="kv-btn kv-btn-ghost" onClick={() => { setShowErr(false); setStep(step - 1); }}>
                    <ChevronLeft size={15} />
                    {c.back}
                  </button>
                ) : null}
                {step < 2 ? (
                  <button type="button" className="kv-btn kv-btn-primary" style={{ flex: 1 }} onClick={next}>
                    {c.next}
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button type="button" className="kv-btn kv-btn-primary" style={{ flex: 1 }} onClick={submit} disabled={status === 'sending'}>
                    {status === 'sending' ? lc.sending : c.submit}
                    <Send size={15} />
                  </button>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
};

/* ---------------- legal pages ---------------- */

const LegalView = ({ lang, kind, goHome }) => {
  const c = (legalCopy[lang] || legalCopy.ro)[kind];
  return (
    <main className="kv-page kv-grain">
      <div className="kv-wrap kv-legal-prose" style={{ position: 'relative', zIndex: 1, maxWidth: 760 }}>
        <button type="button" className="kv-back" onClick={goHome}>
          <ChevronLeft size={16} />
          {(salonCopy[lang] || salonCopy.ro).back}
        </button>
        <Eyebrow>Kavi Automation</Eyebrow>
        <h1>{c.title}</h1>
        <div className="kv-legal-updated">{c.updated}</div>
        {c.sections.map((s) => (
          <div key={s.h}>
            <h3>{s.h}</h3>
            <p>{s.p}</p>
          </div>
        ))}
      </div>
    </main>
  );
};
