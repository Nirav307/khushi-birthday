'use strict';

/* ══════════════════════════════════════════════
   UTILITIES
══════════════════════════════════════════════ */
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function randInt(min, max) {
  return Math.floor(rand(min, max + 1));
}

/* ══════════════════════════════════════════════
   1. FLOATING PETALS
══════════════════════════════════════════════ */
function createPetals() {
  if (reducedMotion) return;

  const container = document.querySelector('.petal-container');
  if (!container) return;

  const colors = [
    '#FFB6C1', '#FF85A2', '#E8527A',
    '#FFD6E0', '#FFC0CB', '#FF69B4',
    '#FADADD', '#FFB7C5'
  ];

  const count = window.innerWidth < 500 ? 18 : 28;

  for (let i = 0; i < count; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';

    const size = rand(8, 20);
    const duration = rand(8, 16);
    const delay = rand(-18, 0);   // negative so they're mid-fall on load
    const drift = rand(-90, 90);
    const color = colors[randInt(0, colors.length - 1)];
    const leftPos = rand(0, 100);

    petal.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${leftPos}%;
      background: ${color};
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      --drift: ${drift}px;
      opacity: 0;
    `;

    container.appendChild(petal);
  }
}

/* ══════════════════════════════════════════════
   2. PHOTO GALLERY
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

const Gallery = {
  slides: [],
  dots: [],
  captions: CAPTIONS,
  current: 0,
  timer: null,
  interval: 4000,

  init() {
    const track = document.getElementById('slide-track');
    const dotsContainer = document.getElementById('gallery-dots');
    const captionEl = document.getElementById('gallery-caption');
    if (!track) return;

    // Filter out slides whose image fails to load (missing photos)
    const allSlides = Array.from(track.querySelectorAll('.slide'));

    // We build visible slides after images resolve
    const promises = allSlides.map((slide, i) => {
      return new Promise(resolve => {
        const img = slide.querySelector('img');
        if (!img) { resolve({ slide, ok: false, index: i }); return; }

        if (img.complete) {
          resolve({ slide, ok: img.naturalWidth > 0, index: i });
        } else {
          img.onload  = () => resolve({ slide, ok: true,  index: i });
          img.onerror = () => resolve({ slide, ok: false, index: i });
        }
      });
    });

    Promise.all(promises).then(results => {
      // Remove slides with missing images
      results.forEach(({ slide, ok }) => {
        if (!ok) {
          slide.remove();
        }
      });

      this.slides = Array.from(track.querySelectorAll('.slide'));

      if (this.slides.length === 0) {
        // No photos at all — hide the gallery section gracefully
        const section = document.getElementById('gallery');
        if (section) {
          section.style.display = 'none';
          // Also hide the scroll-to link
          const scrollLink = document.querySelector('.scroll-prompt');
          if (scrollLink) scrollLink.setAttribute('href', '#love-letter');
        }
        return;
      }

      // Reset: make sure only index 0 is active
      this.slides.forEach((s, i) => {
        s.classList.toggle('active', i === 0);
      });

      // Build dots
      this.slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to photo ${i + 1}`);
        dot.addEventListener('click', () => {
          this.goTo(i);
          this.resetTimer();
        });
        dotsContainer.appendChild(dot);
        this.dots.push(dot);
      });

      // Set first caption
      if (captionEl) {
        captionEl.textContent = this.captions[0] || '';
      }

      // Nav buttons
      document.getElementById('gallery-prev').addEventListener('click', () => {
        this.prev();
        this.resetTimer();
      });
      document.getElementById('gallery-next').addEventListener('click', () => {
        this.next();
        this.resetTimer();
      });

      // Touch / swipe
      let touchStartX = 0;
      const frame = document.querySelector('.gallery-frame');
      if (frame) {
        frame.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
        frame.addEventListener('touchend', e => {
          const delta = touchStartX - e.changedTouches[0].clientX;
          if (Math.abs(delta) > 50) {
            delta > 0 ? this.next() : this.prev();
            this.resetTimer();
          }
        });
      }

      // Keyboard navigation
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
      }, 200);
    }
  },

  next() { this.goTo(this.current + 1); },
  prev() { this.goTo(this.current - 1); },

  startTimer() {
    this.timer = setInterval(() => this.next(), this.interval);
  },

  resetTimer() {
    clearInterval(this.timer);
    this.startTimer();
  }
};

/* ══════════════════════════════════════════════
   3. LOVE LETTER — TYPEWRITER + SCROLL REVEAL
══════════════════════════════════════════════ */
function initLetter() {
  // Typewriter for greeting
  const greetingEl = document.getElementById('letter-greeting');
  if (greetingEl) {
    const text = 'My Dearest Khushi,';
    let i = 0;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        observer.disconnect();
        if (reducedMotion) {
          greetingEl.textContent = text;
          return;
        }
        const interval = setInterval(() => {
          greetingEl.textContent = text.slice(0, ++i);
          if (i >= text.length) clearInterval(interval);
        }, 60);
      }
    }, { threshold: 0.5 });

    observer.observe(greetingEl);
  }

  // Fade-up paragraphs on scroll
  const paragraphs = document.querySelectorAll('.letter-paragraph');
  if (!paragraphs.length) return;

  const paraObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.dataset.delay || '0', 10);
        setTimeout(() => el.classList.add('visible'), delay);
        paraObserver.unobserve(el);
      }
    });
  }, { threshold: 0.15 });

  paragraphs.forEach(p => paraObserver.observe(p));
}

/* ══════════════════════════════════════════════
   4. GIFT REVEAL + CONFETTI
══════════════════════════════════════════════ */

// Fallback confetti (pure canvas, no CDN)
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
  const ctx = canvas.getContext('2d');

  const colors = ['#D4AF37','#F0D060','#FF85A2','#FFB6C1','#E8527A','#C41E3A','#fff','#FFD700'];
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
      p.vy += p.gravity;
      p.x  += p.vx;
      p.y  += p.vy;
      p.rot += p.rotV;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, 1 - (elapsed / duration));
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    if (elapsed < duration) {
      requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.remove();
    }
  }

  requestAnimationFrame(draw);
}

function launchConfetti() {
  if (reducedMotion) return;

  if (typeof confetti !== 'undefined') {
    // canvas-confetti CDN version
    const options = {
      particleCount: 160,
      spread: 100,
      origin: { x: 0.5, y: 0.55 },
      colors: ['#D4AF37','#F0D060','#FF85A2','#FFB6C1','#E8527A','#C41E3A','#ffffff'],
      ticks: 300
    };
    confetti(options);
    setTimeout(() => confetti({ ...options, origin: { x: 0.3, y: 0.6 }, particleCount: 80 }), 300);
    setTimeout(() => confetti({ ...options, origin: { x: 0.7, y: 0.6 }, particleCount: 80 }), 500);
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

    // After animation completes, hide box and show message
    setTimeout(() => {
      giftBox.hidden = true;
      giftMsg.hidden = false;
      launchConfetti();
    }, 650);
  }

  giftBox.addEventListener('click', handleOpen);
  giftBox.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpen();
    }
  });
}

/* ══════════════════════════════════════════════
   INIT ON DOM READY
══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  createPetals();
  Gallery.init();
  initLetter();
  initGift();
});
