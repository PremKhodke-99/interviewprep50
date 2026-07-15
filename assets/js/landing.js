/**
 * landing.js — Landing page interactions
 * No inline event handlers; all registered via addEventListener.
 * No inline styles; all visual state managed via CSS classes.
 * Security: no eval(), no innerHTML of user input.
 */
'use strict';

/* ── Scroll-reveal ── */
function initScrollReveal() {
  var reveals = document.querySelectorAll('.reveal');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  reveals.forEach(function (el) { observer.observe(el); });
}

/* ── Hero entrance animation ── */
function initHeroAnimation() {
  var heroChildren = document.querySelectorAll('.hero > *');
  if (!heroChildren.length) return;
  var delay = 0;
  heroChildren.forEach(function (el) {
    // Initial hidden state set via CSS class; JS only manages timing
    el.classList.add('hero-child--hidden');
    setTimeout(function () {
      el.classList.remove('hero-child--hidden');
      el.classList.add('hero-child--visible');
    }, delay);
    delay += 120;
  });
}

/* ── Card ripple ── */
function initCardRipple() {
  document.querySelectorAll('.card').forEach(function (card) {
    card.addEventListener('click', function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var ripple = document.createElement('div');
      ripple.setAttribute('aria-hidden', 'true');
      ripple.className = 'card-ripple';
      // Use CSS custom properties for position so no inline styles needed
      ripple.style.setProperty('--ripple-x', (x - 4) + 'px');
      ripple.style.setProperty('--ripple-y', (y - 4) + 'px');
      card.appendChild(ripple);
      setTimeout(function () { ripple.remove(); }, 600);
    });
  });
}

/* ── Dynamic question count ── */
async function initQuestionCount() {
  try {
    // basic-50, intermediate-50, backend-50 embed questions directly in app.js.
    // company-questions stores them in a separate data.js.
    var modules = [
      'basic-50/js/app.js',
      'intermediate-50/js/app.js',
      'backend-50/js/app.js',
      'company-questions/js/data.js'
    ];
    var total = 0;
    for (var i = 0; i < modules.length; i++) {
      var res = await fetch(modules[i]);
      if (!res.ok) { console.warn('Could not load:', modules[i]); continue; }
      var text = await res.text();
      // Count unique question entries by matching {id: N
      var match = text.match(/\{id:\s*\d+/g);
      if (match) total += match.length;
    }
    if (total > 0) {
      var el = document.getElementById('landing-q-count');
      if (el) el.textContent = total + ' Questions';
    }
  } catch (e) {
    console.warn('Could not fetch dynamic questions length:', e);
  }
}


/* ── Init ── */
document.addEventListener('DOMContentLoaded', function () {
  initHeroAnimation();
  initScrollReveal();
  initCardRipple();
  initQuestionCount();
});
