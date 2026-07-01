
class IqhubHeader extends HTMLElement {
  connectedCallback() {
    const badge = this.getAttribute('badge') || '';
    const title = this.getAttribute('title') || '';
    const sub = this.getAttribute('sub') || '';

    this.innerHTML = `
      <header>
        <div class="hdr-top-row">
          <a href="../index.html" class="back-link" aria-label="Back to Interview Prep Hub">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Hub
          </a>
          <button id="theme-toggle" class="theme-btn" aria-label="Switch to dark mode" type="button">
          </button>
        </div>

        <div class="hdr-row">
          <div>
            <div class="badge" aria-label="${badge.replace(/<[^>]*>?/gm, '')}">${badge}</div>
            <h1>${title}</h1>
            <p class="sub">${sub}</p>
          </div>

          <div class="stats" id="stats-region" role="group" aria-label="Progress stats" aria-live="polite">
            <div class="sp">
              <span class="sn" id="tQ" style="color:var(--accent)">0</span>
              <span class="sl">Total</span>
            </div>
            <div class="sp">
              <span class="sn" id="dQ" style="color:var(--accent)">0</span>
              <span class="sl">Done</span>
            </div>
            <div class="sp">
              <span class="sn" id="lQ" style="color:var(--amber)">0</span>
              <span class="sl">Left</span>
            </div>
            <div class="sp">
              <span class="sn" id="pQ" style="color:var(--muted)">0%</span>
              <span class="sl">Done %</span>
            </div>
          </div>
        </div>

        <div class="pw" role="region" aria-label="Overall progress">
          <div class="pm">
            <span>Overall Progress</span>
            <span id="ptxt" aria-live="polite">0 / 0 completed</span>
          </div>
          <div class="ptrack" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" aria-label="Completion progress">
            <div class="pfill" id="pfill"></div>
          </div>
          <div class="cpwrap" id="cpwrap" aria-label="Progress by category"></div>
        </div>
      </header>
    `;
  }
}

class IqhubFilters extends HTMLElement {
  connectedCallback() {
    const diffsAttr = this.getAttribute('diffs') || 'Easy,Medium';
    const diffs = diffsAttr.split(',');
    
    let diffButtons = '<button class="btn" data-d="all" aria-pressed="true" aria-describedby="diff-label">All</button>';
    diffs.forEach(d => {
      diffButtons += `<button class="btn" data-d="${d}" aria-pressed="false" aria-describedby="diff-label">${d}</button>`;
    });

    this.innerHTML = `
      <nav aria-label="Filter questions">
        <div class="fb" role="group" aria-label="Filter controls">
          <span class="fl" id="diff-label">Diff:</span>
          ${diffButtons}
          <div class="fs" role="separator" aria-hidden="true"></div>
          <span class="fl" id="topic-label">Topic:</span>
          <div class="fbwrap" id="catbtns" role="group" aria-labelledby="topic-label"></div>
        </div>
      </nav>
      <div class="sw">
        <svg class="sico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <label for="srch" class="sr-only">Search questions</label>
        <input type="search" id="srch" name="search" placeholder="Search questions…" maxlength="120" autocomplete="off" spellcheck="false" aria-label="Search questions by topic, category or keyword">
      </div>
    `;
  }
}

class IqhubFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer>
        Start here before the advanced set —
        <span>Mark questions done</span> as you go —
        Progress saved in browser
      </footer>
    `;
  }
}

customElements.define('iqhub-header', IqhubHeader);
customElements.define('iqhub-filters', IqhubFilters);
customElements.define('iqhub-footer', IqhubFooter);
