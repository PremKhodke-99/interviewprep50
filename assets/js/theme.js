/**
 * theme.js — Runs synchronously before <body> to prevent FOUC.
 * Sets [data-theme] on <html> from saved preference or system default.
 * Also handles the theme toggle button globally across all pages.
 */
(function () {
  'use strict';
  
  // 1. Set theme synchronously
  try {
    var saved = localStorage.getItem('iqhub_theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = (saved === 'dark' || saved === 'light') ? saved : (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    // localStorage unavailable (private browsing) — silently fallback to light
    document.documentElement.setAttribute('data-theme', 'light');
  }

  // 2. Attach toggle listener when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;

    function updateIcon(theme) {
      var label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
      btn.setAttribute('aria-label', label);
      
      // We don't include text labels like "Light/Dark" here so the button can be iconic-only 
      // or styled externally if needed, but since the original logic had text, we'll keep it.
      // Wait, basic-50 actually uses 14x14 with "Light" text. We will use a generic icon approach
      // that works well everywhere.
      btn.innerHTML = theme === 'dark'
        ? '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg> Light'
        : '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg> Dark';
    }

    var current = document.documentElement.getAttribute('data-theme') || 'light';
    updateIcon(current);

    btn.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('iqhub_theme', next); } catch (e) {}
      updateIcon(next);
    });
  });
}());
