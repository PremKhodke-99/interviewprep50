/**
 * landing.js — Landing page interactions
 * No inline event handlers; all registered via addEventListener.
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
    el.style.cssText = 'opacity:0;transform:translateY(20px);transition:opacity .7s ease,transform .7s ease;';
    setTimeout(function () {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, delay);
    delay += 120;
  });
}

/* ── Card ripple ── */
function initCardRipple() {
  // Inject ripple keyframe once
  var s = document.createElement('style');
  s.textContent = '@keyframes _ripple{to{transform:scale(60);opacity:0}}';
  document.head.appendChild(s);

  document.querySelectorAll('.card').forEach(function (card) {
    card.addEventListener('click', function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var ripple = document.createElement('div');
      ripple.setAttribute('aria-hidden', 'true');
      ripple.style.cssText =
        'position:absolute;border-radius:50%;width:8px;height:8px;pointer-events:none;z-index:10;' +
        'left:' + (x - 4) + 'px;top:' + (y - 4) + 'px;' +
        'background:rgba(255,255,255,.18);transform:scale(0);' +
        'animation:_ripple .5s ease forwards;';
      card.appendChild(ripple);
      setTimeout(function () { ripple.remove(); }, 600);
    });
  });
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', function () {
  initHeroAnimation();
  initScrollReveal();
  initCardRipple();
});
