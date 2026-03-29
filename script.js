'use strict';

/* ══════════════════════════════════════════════
   LANGUAGE CONTENT
══════════════════════════════════════════════ */
let currentLang = localStorage.getItem('lang') || 'en';

const CONTENT = {
  en: {
    hero_subtitle:    'Today, the world celebrates',
    hero_title:       'Happy Birthday',
    hero_name:        'Khushi',
    hero_tagline:     'Every moment with you is a poem I never want to finish.',
    scroll_label:     'Scroll down, my love',
    gallery_heading:  'Our Story, In Moments',
    gallery_sub:      'Every picture holds a piece of my heart',
    letter_heading:   'A Letter, From Me To You',
    letter_sub:       'Written with all the love I carry',
    letter_date:      '29th March, 2026',
    letter_greeting:  'My Dearest Khushi,',
    letter_para_1:    'Today, on the day the universe gifted itself by bringing you into this world, I find myself at a complete loss for words — and yet, I cannot stop writing. You are the kind of person who makes ordinary Tuesday mornings feel like something worth remembering. You are warmth in the middle of winter, laughter in a quiet room, and every good thing I never thought to ask for.',
    letter_para_2:    'I know you are far away right now, and I wish more than anything that I could be standing next to you, holding your hand, watching your face as you read this. But distance has never really kept us apart — you are always with me, in every thought, in every moment where something beautiful happens and I instinctively want to share it with you.',
    letter_para_3:    'Khushi, you deserve every celebration this world can offer. Not just today, but every single day. You deserve slow mornings with no alarm, flowers for no reason, someone who notices the small things — and I promise you, I notice everything. The way your eyes light up when you are excited about something. The way you laugh before the punchline even lands. The way you make everyone around you feel like they matter.',
    letter_para_4:    'So here is my promise to you, sealed in gold and rose: I will spend every year we have together making sure you feel as loved as you make me feel. Happy Birthday, my Khushi. You are my greatest adventure, my softest place to land, and the absolute best decision I have ever made.',
    letter_signoff:   'Forever and always yours,',
    letter_signature: 'Your Husband',
    gift_heading:     'A Little Something for You...',
    gift_sub:         "I've been keeping a secret. Tap to find out.",
    gift_hint:        'Tap to unwrap 🎁',
    gift_msg_title:   'Your Gift Awaits, My Love!',
    gift_msg_intro:   'The moment you walk back through our door, I have something very special planned just for you.',
    gift_item1_title: 'A Proper Date Night',
    gift_item1_body:  'Designed entirely around you — your favourite restaurant, your favourite film, candlelight, no phones, just us. I want to hear every story from your trip, and I want you to feel completely spoiled.',
    gift_item2_title: 'A Shopping Trip, Just For You',
    gift_item2_body:  'You pick absolutely anything you want. No budget discussions, no "are you sure about that?". This is your day, extended into a full weekend of celebration.',
    gift_closing:     'You have been so patient, so strong, being away. Come home soon. Everything is waiting — including me.',
    gift_signature:   '— Your Husband, counting down the hours',
    footer_main:      'just for you, Khushi',
    footer_sub:       'Happy Birthday, my love. 🌹',
    captions: [
      'The day everything made sense',
      'My favourite smile in the world',
      'Adventures are better with you',
      'Home is wherever you are',
      "Some days I still can't believe you're mine",
      'Every photo with you is my favourite',
      'Making memories, one day at a time',
      'The best is always yet to come',
      'You make ordinary moments extraordinary',
      'A lifetime of this, please'
    ]
  },

  gu: {
    hero_subtitle:    'આજે, આ દુનિયા ઉજવે છે',
    hero_title:       'જન્મદિવસ મુબારક',
    hero_name:        'ખુશી',
    hero_tagline:     'તારી સાથે વિતાવેલી દરેક ક્ષણ એ એક એવી કવિતા છે, જે હું ક્યારેય પૂરી કરવા નથી ઇચ્છતો.',
    scroll_label:     'નીચે સ્ક્રોલ કર, મારા પ્રેમ',
    gallery_heading:  'આપણી વાર્તા, ક્ષણોમાં',
    gallery_sub:      'દરેક તસ્વીર મારા દિલનો એક ટુકડો સંભાળી રાખે છે',
    letter_heading:   'એક પત્ર, મારા તરફથી, તારા માટે',
    letter_sub:       'જેટલો પ્રેમ હૃદયમાં છે, એ બધા સાથે લખ્યો છે',
    letter_date:      '૨૯ માર્ચ, ૨૦૨૬',
    letter_greeting:  'મારી સૌથી પ્યારી ખુશી,',
    letter_para_1:    'આજે, જ્યારે સૃષ્ટિ ખુદ ઉજવે છે, ત્યારે હું શબ્દો ગુમાવી બેઠો છું — અને છતાં, લખ્યા જ જઉં છું. તું એ પ્રકારની વ્યક્તિ છે, જે સાદા મંગળવારની સવારને પણ યાદ રહે એવી બનાવી દે. તું ઠંડીમાં હૂંફ છે, શાંત ઓરડામાં હાસ્ય છે, અને એ દરેક સારી ચીજ છે — જે માગી નહોતી, પણ મળી ગઈ.',
    letter_para_2:    'હું જાણું છું કે તું અત્યારે દૂર છે, અને ઇચ્છું છું — ખૂબ ઇચ્છું છું — કે હું તારી બાજુમાં ઊભો હોત, તારો હાથ પકડ્યો હોત, અને આ વાંચતી વખતે તારો ચહેરો જોઈ શક્યો હોત. પણ અંતર ક્યારેય આપણને ખરેખર અળગા નથી કર્યા — દરેક વિચારમાં, દરેક સુંદર ક્ષણે — જ્યારે મન ઇચ્છે કે "તને કહું" — ત્યારે તું જ સૌ પ્રથમ યાદ આવે.',
    letter_para_3:    'ખુશી, આ દુનિયા જે ઉજવણી આપી શકે, તું તે દરેકની હકદાર છે. આજ નહીં — હરરોજ. ઘડિયાળ વગરની શાંત સવારો, કોઈ કારણ વિના ફૂલ, એ વ્યક્તિ જે નાની-નાની વાત ધ્યાને રાખે — અને હું, હું સઘળું ધ્યાન રાખું છું. જ્યારે તું ખુશ થાય ત્યારે તારી આંખ કઈ રીતે ચમકે, બોલવાની વાત આવે પહેલાં જ તું કઈ રીતે હસી પડે, અને તારી આસપાસ દરેક વ્યક્તિ કઈ રીતે ખૂદ મહત્ત્વની અનુભવે.',
    letter_para_4:    'તો આ મારું વચન છે, સોના અને ગુલાબ સાથે સીલ કરેલું — આપણી સાથે ગાળેલા દરેક વર્ષમાં, હું ખાતરી રાખીશ કે તને એવો જ પ્રેમ અનુભવાય, જેવો પ્રેમ તું મને અનુભવાવે છે. જન્મદિવસ મુબારક, મારી ખુશી. તું મારું સૌથી મોટું સાહસ છે, મારી સૌથી નરમ ભૂમિ, અને સૌથી સારો નિર્ણય — જે મેં ક્યારેય લીધો.',
    letter_signoff:   'હંમેશ-હંમેશ, ફક્ત તારો,',
    letter_signature: 'તારો પતિ',
    gift_heading:     'તારા માટે એક નાનકડી ભેટ...',
    gift_sub:         'એક ગુપ્ત વાત છે. જાણવા ટેપ કર.',
    gift_hint:        'ખોલવા ટેપ કર 🎁',
    gift_msg_title:   'તારી ભેટ રાહ જોઈ રહી છે, મારા પ્રેમ!',
    gift_msg_intro:   'જ્યારે તું ઘરે પાછી આવે, ત્યારે તારા માટે ખૂબ ખાસ કંઈ આયોજન કર્યું છે.',
    gift_item1_title: 'એક સાચી ડેટ નાઇટ',
    gift_item1_body:  'સંપૂર્ણ તારા માટે — તારી પ્રિય રેસ્ટૉરન્ટ, તારી મનગમતી ફિલ્મ, મીણબત્તીઓ, ફૉન નહીં, ફક્ત આપણે બે. તારી સફરની દરેક વાત સાંભળવી છે, અને ઇચ્છું છું કે તું સંપૂર્ણ લાડ અનુભવે.',
    gift_item2_title: 'ખરીદી, ફક્ત તારા માટે',
    gift_item2_body:  'જે ગમે તે, જેટલું ગમે — ક્યાંય ના નહીં. "ખાતરી છે?" એ સવાલ નહીં. આ તારો દિવસ છે — આખા વીકેન્ડ સુધી.',
    gift_closing:     'તું ઘણી ધૈર્યવાન છે, ઘણી મક્કમ — દૂર રહીને. જલ્દી ઘરે આ. બધું ય રાહ જોઈ રહ્યું છે — હું પણ.',
    gift_signature:   '— તારો પતિ, કલાકો ગણતા',
    footer_main:      'ફક્ત તારા માટે, ખુશી',
    footer_sub:       'જન્મદિવસ મુબારક, મારા પ્રેમ. 🌹',
    captions: [
      'જ્યારે બધું સ્પષ્ટ થઈ ગયું તે દિવસ',
      'દુનિયાની સૌથી વ્હાલી સ્મિત',
      'સાહસ, તારી સાથે હોય ત્યારે જ સારું',
      'ઘર, જ્યાં તું હોય ત્યાં',
      'કેટલીક વાર હજી ય વિશ્વાસ નથી થતો — તું મારી છે',
      'તારી સાથેની દરેક તસ્વીર, મારી સૌથી પ્રિય',
      'એક-એક દિવસ, સ્મૃતિઓ બનાવતા',
      'સૌથી સારું હજી બાકી છે',
      'સાધારણ ક્ષણોને અસાધારણ બનાવે છે તું',
      'આ જ, આખી જિંદગી — બસ'
    ]
  }
};

/* ══════════════════════════════════════════════
   SWITCH LANGUAGE
══════════════════════════════════════════════ */
let greetingInterval = null;

function switchLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.setAttribute('data-lang', lang);

  // Toggle button label shows the OTHER language
  const label = document.getElementById('lang-label');
  if (label) label.textContent = lang === 'en' ? 'ગુ' : 'EN';

  const strings = CONTENT[lang];

  // Update all [data-key] text elements
  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.dataset.key;
    if (!(key in strings)) return;

    // footer_main has a nested .footer-heart span — preserve it
    if (key === 'footer_main') {
      const heart = el.querySelector('.footer-heart');
      el.textContent = 'Made with ';
      if (heart) el.appendChild(heart);
      el.appendChild(document.createTextNode(' ' + strings[key]));
    } else {
      // gift_signature wraps an <em> — handle it
      if (key === 'gift_signature') {
        const em = el.querySelector('em');
        if (em) { em.textContent = strings[key]; return; }
      }
      el.textContent = strings[key];
    }
  });

  // Update gallery captions array and current caption
  Gallery.captions = strings.captions;
  const captionEl = document.getElementById('gallery-caption');
  if (captionEl) captionEl.textContent = strings.captions[Gallery.current] || '';

  // Update letter greeting (clear any running typewriter first)
  if (greetingInterval) { clearInterval(greetingInterval); greetingInterval = null; }
  const greetingEl = document.getElementById('letter-greeting');
  if (greetingEl) greetingEl.textContent = strings.letter_greeting;
}

/* ══════════════════════════════════════════════
   UTILITIES
══════════════════════════════════════════════ */
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function rand(min, max)    { return Math.random() * (max - min) + min; }
function randInt(min, max) { return Math.floor(rand(min, max + 1)); }

/* ══════════════════════════════════════════════
   1. FLOATING PETALS & HEARTS
══════════════════════════════════════════════ */
function createPetals() {
  if (reducedMotion) return;

  const container = document.querySelector('.petal-container');
  if (!container) return;

  const petalColors = ['#FADADD','#F4A7B9','#D45E7B','#FFD6E0','#FFC0CB','#F7C5D0'];
  const heartColors = ['#C41E3A','#A8183A','#F4A7B9','#E8527A','#FF85A2'];

  const total = window.innerWidth < 500 ? 20 : 32;

  for (let i = 0; i < total; i++) {
    const isHeart  = i % 2 === 1;
    const size     = rand(10, 22);
    const duration = rand(8, 16);
    const delay    = rand(-18, 0);
    const drift    = rand(-90, 90);
    const leftPos  = rand(0, 100);

    if (isHeart) {
      const span = document.createElement('span');
      span.className = 'petal petal-heart';
      span.textContent = '❤';
      span.setAttribute('aria-hidden', 'true');
      span.style.cssText = `
        font-size: ${size}px;
        left: ${leftPos}%;
        color: ${heartColors[randInt(0, heartColors.length - 1)]};
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        --drift: ${drift}px;
      `;
      container.appendChild(span);
    } else {
      const div = document.createElement('div');
      div.className = 'petal';
      div.setAttribute('aria-hidden', 'true');
      div.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${leftPos}%;
        background: ${petalColors[randInt(0, petalColors.length - 1)]};
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        --drift: ${drift}px;
        opacity: 0;
      `;
      container.appendChild(div);
    }
  }
}

/* ══════════════════════════════════════════════
   2. PHOTO GALLERY
══════════════════════════════════════════════ */
const Gallery = {
  slides:   [],
  dots:     [],
  captions: CONTENT[currentLang].captions,
  current:  0,
  timer:    null,
  interval: 4000,

  init() {
    const track      = document.getElementById('slide-track');
    const dotsEl     = document.getElementById('gallery-dots');
    const captionEl  = document.getElementById('gallery-caption');
    if (!track) return;

    const allSlides = Array.from(track.querySelectorAll('.slide'));

    // Filter out slides whose image failed to load
    const promises = allSlides.map((slide, i) => new Promise(resolve => {
      const img = slide.querySelector('img');
      if (!img) { resolve({ slide, ok: false }); return; }
      if (img.complete) {
        resolve({ slide, ok: img.naturalWidth > 0 });
      } else {
        img.onload  = () => resolve({ slide, ok: true });
        img.onerror = () => resolve({ slide, ok: false });
      }
    }));

    Promise.all(promises).then(results => {
      results.forEach(({ slide, ok }) => { if (!ok) slide.remove(); });
      this.slides = Array.from(track.querySelectorAll('.slide'));

      if (this.slides.length === 0) {
        const section = document.getElementById('gallery');
        if (section) section.style.display = 'none';
        return;
      }

      this.slides.forEach((s, i) => s.classList.toggle('active', i === 0));

      // Build dots
      this.slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to photo ${i + 1}`);
        dot.addEventListener('click', () => { this.goTo(i); this.resetTimer(); });
        dotsEl.appendChild(dot);
        this.dots.push(dot);
      });

      if (captionEl) captionEl.textContent = this.captions[0] || '';

      document.getElementById('gallery-prev').addEventListener('click', () => { this.prev(); this.resetTimer(); });
      document.getElementById('gallery-next').addEventListener('click', () => { this.next(); this.resetTimer(); });

      // Swipe
      let touchStartX = 0;
      const frame = document.querySelector('.gallery-frame');
      if (frame) {
        frame.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
        frame.addEventListener('touchend',   e => {
          const delta = touchStartX - e.changedTouches[0].clientX;
          if (Math.abs(delta) > 50) { delta > 0 ? this.next() : this.prev(); this.resetTimer(); }
        });
      }

      document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft')  { this.prev(); this.resetTimer(); }
        if (e.key === 'ArrowRight') { this.next(); this.resetTimer(); }
      });

      this.startTimer();
    });
  },

  goTo(index) {
    const captionEl = document.getElementById('gallery-caption');
    this.slides[this.current].classList.remove('active');
    if (this.dots[this.current]) this.dots[this.current].classList.remove('active');
    this.current = (index + this.slides.length) % this.slides.length;
    this.slides[this.current].classList.add('active');
    if (this.dots[this.current]) this.dots[this.current].classList.add('active');

    if (captionEl) {
      captionEl.style.opacity = '0';
      setTimeout(() => {
        captionEl.textContent = this.captions[this.current] || '';
        captionEl.style.opacity = '1';
      }, 220);
    }
  },

  next()        { this.goTo(this.current + 1); },
  prev()        { this.goTo(this.current - 1); },
  startTimer()  { this.timer = setInterval(() => this.next(), this.interval); },
  resetTimer()  { clearInterval(this.timer); this.startTimer(); }
};

/* ══════════════════════════════════════════════
   3. LOVE LETTER — TYPEWRITER + SCROLL REVEAL
══════════════════════════════════════════════ */
function initLetter() {
  const greetingEl = document.getElementById('letter-greeting');
  if (greetingEl) {
    const observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      observer.disconnect();

      const text = CONTENT[currentLang].letter_greeting;
      if (reducedMotion) { greetingEl.textContent = text; return; }

      let i = 0;
      greetingEl.textContent = '';
      greetingInterval = setInterval(() => {
        greetingEl.textContent = text.slice(0, ++i);
        if (i >= text.length) { clearInterval(greetingInterval); greetingInterval = null; }
      }, 60);
    }, { threshold: 0.5 });

    observer.observe(greetingEl);
  }

  const paragraphs = document.querySelectorAll('.letter-paragraph');
  if (!paragraphs.length) return;

  const paraObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = parseInt(el.dataset.delay || '0', 10);
      setTimeout(() => el.classList.add('visible'), delay);
      paraObserver.unobserve(el);
    });
  }, { threshold: 0.15 });

  paragraphs.forEach(p => paraObserver.observe(p));
}

/* ══════════════════════════════════════════════
   4. GIFT REVEAL + CONFETTI
══════════════════════════════════════════════ */
function fallbackConfetti() {
  let canvas = document.getElementById('confetti-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:9999;';
    document.body.appendChild(canvas);
  }
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx    = canvas.getContext('2d');
  const colors = ['#C9973A','#E8C96E','#F4A7B9','#FADADD','#D45E7B','#A8183A','#fff','#FFD700'];

  const particles = Array.from({ length: 160 }, () => ({
    x: rand(0, canvas.width),
    y: rand(-canvas.height * 0.3, 0),
    vx: rand(-3, 3),
    vy: rand(3, 8),
    color: colors[randInt(0, colors.length - 1)],
    w: rand(6, 14),
    h: rand(4, 9),
    rot: rand(0, Math.PI * 2),
    rotV: rand(-0.1, 0.1),
    gravity: rand(0.08, 0.18)
  }));

  let startTime = null;
  const duration = 5000;

  function draw(ts) {
    if (!startTime) startTime = ts;
    const elapsed = ts - startTime;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.vy += p.gravity; p.x += p.vx; p.y += p.vy; p.rot += p.rotV;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, 1 - elapsed / duration);
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    if (elapsed < duration) requestAnimationFrame(draw);
    else { ctx.clearRect(0, 0, canvas.width, canvas.height); canvas.remove(); }
  }
  requestAnimationFrame(draw);
}

function launchConfetti() {
  if (reducedMotion) return;
  if (typeof confetti !== 'undefined') {
    const opts = {
      particleCount: 160,
      spread: 100,
      origin: { x: 0.5, y: 0.55 },
      colors: ['#C9973A','#E8C96E','#F4A7B9','#FADADD','#D45E7B','#A8183A','#ffffff'],
      ticks: 300
    };
    confetti(opts);
    setTimeout(() => confetti({ ...opts, origin: { x: 0.3, y: 0.6 }, particleCount: 80 }), 300);
    setTimeout(() => confetti({ ...opts, origin: { x: 0.7, y: 0.6 }, particleCount: 80 }), 500);
  } else {
    fallbackConfetti();
  }
}

function initGift() {
  const giftBox = document.getElementById('gift-box');
  const giftMsg = document.getElementById('gift-message');
  if (!giftBox || !giftMsg) return;
  let opened = false;

  function handleOpen() {
    if (opened) return;
    opened = true;
    giftBox.classList.add('opening');
    setTimeout(() => {
      giftBox.hidden = true;
      giftMsg.hidden = false;
      launchConfetti();
    }, 650);
  }

  giftBox.addEventListener('click', handleOpen);
  giftBox.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleOpen(); }
  });
}

/* ══════════════════════════════════════════════
   5. BACKGROUND MUSIC
══════════════════════════════════════════════ */
function initMusic() {
  const audio  = document.getElementById('bg-music');
  const btn    = document.getElementById('music-toggle');
  if (!audio || !btn) return;

  audio.volume = 0.3;
  let started  = false;

  function startAudio() {
    if (started) return;
    started = true;
    audio.play().then(() => { btn.textContent = '♫'; }).catch(() => {});
  }

  // Start on first user interaction
  document.addEventListener('scroll',     startAudio, { once: true, passive: true });
  document.addEventListener('touchstart', startAudio, { once: true, passive: true });
  document.addEventListener('click',      startAudio, { once: true });

  btn.addEventListener('click', e => {
    e.stopPropagation(); // don't re-trigger the startAudio click listener
    if (audio.paused) {
      audio.play().catch(() => {});
      btn.textContent = '♫';
    } else {
      audio.pause();
      btn.textContent = '♪';
    }
  });
}

/* ══════════════════════════════════════════════
   6. SCROLL SECTION ANIMATIONS
══════════════════════════════════════════════ */
function initScrollAnimations() {
  if (reducedMotion) {
    document.querySelectorAll('.animate-on-scroll').forEach(el => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════════
   7. CURSOR / TOUCH SPARKLES
══════════════════════════════════════════════ */
function initCursorSparkles() {
  if (reducedMotion) return;

  const chars   = ['✦', '✧', '⋆', '✺', '❋'];
  let lastSpawn = 0;

  function spawnSparkle(x, y) {
    const now = Date.now();
    if (now - lastSpawn < 40) return;
    lastSpawn = now;

    const el = document.createElement('span');
    el.className   = 'sparkle';
    el.textContent = chars[randInt(0, chars.length - 1)];
    el.style.left  = (x + rand(-8, 8)) + 'px';
    el.style.top   = (y + rand(-8, 8)) + 'px';
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }

  document.addEventListener('mousemove', e => spawnSparkle(e.clientX, e.clientY));
  document.addEventListener('touchmove', e => {
    const t = e.touches[0];
    spawnSparkle(t.clientX, t.clientY);
  }, { passive: true });
}

/* ══════════════════════════════════════════════
   INIT ON DOM READY
══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Apply persisted language
  document.documentElement.setAttribute('data-lang', currentLang);
  if (currentLang === 'gu') switchLang('gu');

  // Language toggle button
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => switchLang(currentLang === 'en' ? 'gu' : 'en'));
  }

  createPetals();
  Gallery.init();
  initLetter();
  initGift();
  initMusic();
  initScrollAnimations();
  initCursorSparkles();
});
