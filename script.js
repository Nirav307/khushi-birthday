'use strict';

/* ══════════════════════════════════════════════
   CAPTIONS
══════════════════════════════════════════════ */
const CAPTIONS = [
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
];

const LETTER_GREETING = 'My Love Khushi,';

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
  captions: CAPTIONS,
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

      const text = LETTER_GREETING;
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
  createPetals();
  Gallery.init();
  initLetter();
  initGift();
  initMusic();
  initScrollAnimations();
  initCursorSparkles();
});
