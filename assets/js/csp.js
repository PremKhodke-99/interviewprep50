/**
 * csp.js — Centralised Content Security Policy
 *
 * This is the SINGLE SOURCE OF TRUTH for the CSP across the entire project.
 * It runs synchronously as the very first script in <head> on every page,
 * injecting the CSP <meta> tag before the browser parses any other resources.
 *
 * HOW TO UPDATE:
 *   Edit the DIRECTIVES object below. The policy string is assembled
 *   automatically. Do NOT edit the <meta> tags in individual HTML files.
 *
 * WHY A SCRIPT AND NOT A STATIC <meta>:
 *   A <meta http-equiv="Content-Security-Policy"> tag duplicated in every
 *   HTML file is a maintenance hazard — one edit must be applied N times.
 *   By injecting the tag from a single shared JS file we get one edit point.
 *   The script runs synchronously (no defer/async) so it blocks parsing until
 *   the meta tag is inserted; this means the policy is in effect before any
 *   subsequent <link>, <script>, or <body> content is processed.
 *
 * NOTE ON STATIC SITES:
 *   The ideal place for CSP is an HTTP response header set by a web server
 *   (e.g., nginx, Apache). If you ever add a server, move the policy there
 *   and remove this file. HTTP-header CSP also supports frame-ancestors and
 *   X-Frame-Options, which are silently ignored inside <meta> tags.
 */
(function () {
  'use strict';

  /* ── Policy directives ───────────────────────────────────────────────── */
  var DIRECTIVES = {
    'default-src':  "'self'",
    'script-src':   "'self'",
    'style-src':    "'self' https://fonts.googleapis.com",
    'font-src':     "'self' https://fonts.gstatic.com",
    'img-src':      "'self' data:",
    'connect-src':  "'self'",
    'base-uri':     "'self'",
    'form-action':  "'self'"
  };

  /* ── Assemble policy string ──────────────────────────────────────────── */
  var policy = Object.keys(DIRECTIVES)
    .map(function (key) { return key + ' ' + DIRECTIVES[key]; })
    .join('; ') + ';';

  /* ── Inject as the first <head> child ───────────────────────────────── */
  var meta = document.createElement('meta');
  meta.httpEquiv = 'Content-Security-Policy';
  meta.content   = policy;

  var head = document.head || document.getElementsByTagName('head')[0];
  // insertBefore(newNode, referenceNode) — null means append; firstChild
  // means the meta becomes the very first element, before any resource hints.
  head.insertBefore(meta, head.firstChild);
}());
