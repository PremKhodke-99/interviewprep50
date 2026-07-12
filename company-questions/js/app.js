window.initCompanyApp = function(Q, SK) {
/* ── Validated localStorage load ── */
function loadDone(key) {
  try {
    var raw = localStorage.getItem(key);
    if (!raw) return new Set();
    var parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter(function(n) {
      return Number.isInteger(n) && n > 0 && n <= 1000;
    }));
  } catch(e) { return new Set(); }
}

var done = loadDone(SK);
var fDiff = 'all';
var fCompany = 'all';

// Identify repeated questions to mark as important
var questionCounts = {};
Q.forEach(function(q) {
  var qText = (q.q || '').toLowerCase().trim();
  questionCounts[qText] = (questionCounts[qText] || 0) + 1;
});

Q.forEach(function(q) {
  var qText = (q.q || '').toLowerCase().trim();
  q.isImportant = questionCounts[qText] > 1;
});

var companies = [...new Set(Q.map(function(q) { return q.company; }).filter(Boolean))];

/* ── Company filter buttons ── */
function buildCompanyButtons() {
  var catbtns = document.getElementById('catbtns'); // Using same ID as category buttons for CSS reuse
  if (!catbtns) return;
  catbtns.innerHTML = '';

  var allBtn = document.createElement('button');
  allBtn.className = 'btn';
  allBtn.setAttribute('aria-pressed', 'true');
  allBtn.textContent = 'All Companies';
  allBtn.addEventListener('click', function() { setC('all', allBtn); });
  catbtns.appendChild(allBtn);

  companies.forEach(function(c) {
    var b = document.createElement('button');
    b.className = 'btn';
    b.setAttribute('aria-pressed', 'false');
    b.textContent = c;
    b.addEventListener('click', function() { setC(c, b); });
    catbtns.appendChild(b);
  });
}

function setC(c, btn) {
  fCompany = c;
  var catbtns = document.getElementById('catbtns');
  if (catbtns) {
    catbtns.querySelectorAll('.btn').forEach(function(b) {
      b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
    });
  }
  render();
}

/* ── Difficulty buttons ── */
function initDiffButtons() {
  document.querySelectorAll('[data-d]').forEach(function(b) {
    b.addEventListener('click', function() {
      document.querySelectorAll('[data-d]').forEach(function(x) {
        x.setAttribute('aria-pressed', 'false');
        x.classList.remove('e', 'm', 'h');
      });
      b.setAttribute('aria-pressed', 'true');
      var v = b.dataset.d;
      fDiff = v;
      if (v === 'Easy') b.classList.add('e');
      else if (v === 'Medium') b.classList.add('m');
      else if (v === 'Hard') b.classList.add('h');
      render();
    });
  });
}

/* ── Toggle accordion ── */
function tog(id) {
  var body   = document.getElementById('b' + id);
  var togBtn = document.getElementById('tb' + id);
  var card   = document.getElementById('c' + id);
  if (!body || !togBtn || !card) return;
  var isOpen = !body.hidden;
  body.hidden = isOpen;
  togBtn.setAttribute('aria-expanded', String(!isOpen));
  card.classList.toggle('open', !isOpen);
  if (!isOpen) {
    announce('Answer expanded');
  }
}

/* ── Mark done ── */
function mkDone(id) {
  var btn  = document.getElementById('db' + id);
  var card = document.getElementById('c' + id);
  if (!btn || !card) return;
  var isDone = done.has(id);
  if (isDone) {
    done.delete(id);
    btn.setAttribute('aria-pressed', 'false');
    btn.setAttribute('aria-label', 'Mark question ' + id + ' as done');
    card.classList.remove('done');
    announce('Marked as not done');
  } else {
    done.add(id);
    btn.setAttribute('aria-pressed', 'true');
    btn.setAttribute('aria-label', 'Question ' + id + ' marked as done. Click to undo.');
    card.classList.add('done');
    announce('Marked as done');
  }
  try { localStorage.setItem(SK, JSON.stringify([...done])); } catch(ex) {}
  upd();
}

/* ── Accessible live announcer ── */
function announce(msg) {
  var live = document.getElementById('a11y-live');
  if (!live) return;
  live.textContent = '';
  setTimeout(function() { live.textContent = msg; }, 50);
}

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ── Render question list grouped by company ── */
function render() {
  var srchEl = document.getElementById('srch');
  var s = srchEl ? srchEl.value.toLowerCase().trim().slice(0, 120) : '';

  var list = document.getElementById('ql');
  if (!list) return;
  list.innerHTML = '';

  var hasQuestions = false;

  var compsToRender = fCompany === 'all' ? companies : [fCompany];

  compsToRender.forEach(function(comp) {
    var compQs = Q.filter(function(q) {
      if (q.company !== comp) return false;
      var d = fDiff === 'all' || q.diff === fDiff;
      var sr = !s ||
        (q.q || '').toLowerCase().includes(s) ||
        (q.tech || []).some(function(t) { return t.toLowerCase().includes(s); });
      return d && sr;
    });

    if (compQs.length > 0) {
      hasQuestions = true;
      
      // Add Company Header
      var header = document.createElement('h2');
      header.className = 'company-header';
      header.textContent = comp;
      header.style.marginTop = '2rem';
      header.style.marginBottom = '1rem';
      header.style.borderBottom = '1px solid var(--border-color, #e2e8f0)';
      header.style.paddingBottom = '0.5rem';
      list.appendChild(header);

      compQs.forEach(function(q) {
        var isDone = done.has(q.id);
        var article = document.createElement('article');
        article.className = 'qc' + (isDone ? ' done' : '');
        article.id = 'c' + q.id;

        var tagsHTML = (q.tech || []).map(function(t) {
          return '<span class="tg tt">' + escapeHTML(t) + '</span>';
        }).join('') +
        '<span class="tg t' + escapeHTML((q.diff || '').toLowerCase().charAt(0)) + '">' + escapeHTML(q.diff || 'N/A') + '</span>';
        
        if (q.isImportant) {
          tagsHTML += '<span class="tg t-important" style="background-color:#fee2e2;color:#991b1b;border:1px solid #f87171;">★ Important</span>';
        }

        var codeHTML = q.code
          ? '<div class="cb" role="region" aria-label="Code example"><code>' + q.code + '</code></div>'
          : '';

        article.innerHTML =
          '<div class="qh">' +
            '<span class="qn" aria-hidden="true">' + String(q.id).padStart(2, '0') + '</span>' +
            '<div class="qm">' +
              '<div class="qt" aria-label="Tags">' + tagsHTML + '</div>' +
              '<p class="qq" id="qq' + q.id + '">' + (q.q || '') + '</p>' +
            '</div>' +
            '<div class="qa">' +
              '<button class="db' + (isDone ? ' done' : '') + '"' +
                ' id="db' + q.id + '"' +
                ' aria-pressed="' + (isDone ? 'true' : 'false') + '"' +
                ' aria-label="' + (isDone ? 'Question ' + q.id + ' done. Click to undo' : 'Mark question ' + q.id + ' as done') + '"' +
                ' data-done-id="' + q.id + '">' +
                '<svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>' +
              '</button>' +
              '<button class="toggle-btn"' +
                ' id="tb' + q.id + '"' +
                ' aria-expanded="false"' +
                ' aria-controls="b' + q.id + '"' +
                ' aria-labelledby="qq' + q.id + '"' +
                ' data-toggle-id="' + q.id + '">' +
                '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>' +
                '<span class="sr-only">Toggle answer</span>' +
              '</button>' +
            '</div>' +
          '</div>' +
          '<div class="qb" id="b' + q.id + '" role="region" aria-labelledby="qq' + q.id + '" hidden>' +
            '<div class="sh" aria-hidden="true">Answer</div>' +
            '<div class="at">' + (q.a || '') + '</div>' +
            codeHTML +
            (q.explain ? ('<div class="eb"><div class="ehe" aria-hidden="true">How to explain it to the interviewer</div><p class="et">' + q.explain + '</p></div>') : '') +
            (q.tip ? ('<div class="tb"><div class="tbl" aria-hidden="true">Pro Tip</div><p>' + q.tip + '</p></div>') : '') +
          '</div>';

        list.appendChild(article);
      });
    }
  });

  if (!hasQuestions) {
    var emp = document.createElement('div');
    emp.className = 'es';
    emp.setAttribute('role', 'status');
    emp.innerHTML = '<p>No questions match. Try adjusting filters or search.</p>';
    list.appendChild(emp);
  }

  // Attach events AFTER insertion
  Q.forEach(function(q) {
    var qh = document.getElementById('c' + q.id);
    if(qh) {
       var qhHeader = qh.querySelector('.qh');
       var doneBtn = document.getElementById('db' + q.id);
       if (qhHeader) qhHeader.addEventListener('click', function() { tog(q.id); });
       if (doneBtn) doneBtn.addEventListener('click', function(e) { e.stopPropagation(); mkDone(q.id); });
    }
  });

  upd();
}

function initKeyboard() {
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.toggle-btn[aria-expanded="true"]').forEach(function(btn) {
        var id = btn.dataset.toggleId;
        if (id) tog(parseInt(id, 10));
      });
    }
  });
}

function upd() {
  var tot = Q.length;
  var dn  = done.size;
  var pct = tot > 0 ? Math.round((dn / tot) * 100) : 0;

  var setTxt = function(id, val) {
    var el = document.getElementById(id);
    if (el) el.textContent = val;
  };
  setTxt('tQ', tot);
  setTxt('dQ', dn);
  setTxt('lQ', tot - dn);
  setTxt('pQ', pct + '%');
  setTxt('ptxt', dn + ' / ' + tot + ' completed');

  var pfill = document.getElementById('pfill');
  if (pfill) pfill.style.width = pct + '%';

  var statsRegion = document.getElementById('stats-region');
  if (statsRegion) statsRegion.setAttribute('aria-label', dn + ' of ' + tot + ' questions completed, ' + pct + ' percent');

  var cpwrap = document.getElementById('cpwrap');
  if (cpwrap) {
    cpwrap.innerHTML = '';
    companies.forEach(function(c) {
      var ct = Q.filter(function(q) { return q.company === c; }).length;
      var cd = Q.filter(function(q) { return q.company === c && done.has(q.id); }).length;
      var p  = document.createElement('div');
      p.className = 'cpill';
      p.innerHTML = '<span class="dot" aria-hidden="true"></span>' + escapeHTML(c) + ': ' + cd + '/' + ct;
      cpwrap.appendChild(p);
    });
  }
}

function debounce(fn, delay) {
  var timer;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
}

document.addEventListener('DOMContentLoaded', function() {
  buildCompanyButtons();
  initDiffButtons();
  initKeyboard();
  document.getElementById('srch') && document.getElementById('srch').addEventListener('input', debounce(render, 200));
  render();
  
  var qCountEl = document.getElementById('dynamic-q-count');
  if (qCountEl) {
    qCountEl.textContent = Q.length + ' Questions in this module';
  }
});

};

initCompanyApp(Q, 'company-questions');
