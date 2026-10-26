// Shared wireframe helpers: review toolbar, site chrome, gift card pieces, notes rail.

const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const pin = (n, abs) => `<span class="pin${abs ? ' abs' : ''}" aria-label="Note ${n}">${n}</span>`;
const ext = 'target="_blank" rel="noopener"';

function chipsHtml(g, { totals = true } = {}) {
  const chips = g.prices.map(p => {
    const form = p.form || g.form;
    const inner = `<b>${money(p.amt)}</b>${p.label ? `<span>${esc(p.label)}</span>` : ''}`;
    return form ? `<a class="chip" href="${giveUrl(form)}" ${ext} title="Opens Givecloud form ${form}">${inner}</a>`
                : `<span class="chip">${inner}</span>`;
  });
  if (totals && g.total) chips.push(`<span class="chip total"><b>${money(g.total.amt)}</b><span>${esc(g.total.label)}</span></span>`);
  return `<div class="chips">${chips.join('')}</div>`;
}

function giveBtn(g, label = 'Give this gift', cls = '') {
  return g.form
    ? `<a class="btn ${cls}" href="${giveUrl(g.form)}" ${ext}>${esc(label)}</a>`
    : `<span class="btn off ${cls}" title="No active Givecloud form for fund ${g.guideFund}">Form needed</span>`;
}

function flagsHtml(g) {
  const list = giftIssues(g);
  if (!list.length) return '';
  return `<div class="flags">${list.map(f => `<span class="flag">${esc(f)}</span>`).join('')}</div>`;
}

function siteHead(extra = '') {
  return `<header class="site-head"><div class="logo">H4KI</div><nav class="navl" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></nav>${extra}<span class="btn sm">Sponsor a child</span></header>`;
}

function siteFoot() {
  const col = `<div><div class="txt" style="width:60%"></div><div class="txt"></div><div class="txt" style="width:80%"></div></div>`;
  return `<footer class="site-foot">${col.repeat(4)}</footer>`;
}

function notesHtml(title, notes, questions = []) {
  return `<aside class="notes" aria-label="Wireframe notes"><h4>${esc(title)}</h4><ol>${notes.map((n, i) => `<li>${pin(i + 1)}<p>${n}</p></li>`).join('')}</ol>${
    questions.length ? `<div class="q"><h4>Open questions</h4><ol>${questions.map(q => `<li><p>${q}</p></li>`).join('')}</ol></div>` : ''}</aside>`;
}

function toolbar(label) {
  return `<div class="tool"><a href="index.html">&larr; All directions</a><b>${esc(label)}</b><span class="sp"></span>
    <span class="seg" role="group" aria-label="Viewport"><button data-vp="desktop" aria-pressed="true">Desktop</button><button data-vp="mobile" aria-pressed="false">Mobile</button></span>
    <button class="tg" data-tg="nonotes" data-invert aria-pressed="true">Notes</button>
    <button class="tg" data-tg="showflags" aria-pressed="false">Link audit flags</button></div>`;
}

function wireUp() {
  const b = document.body;
  const set = (k, v) => { try { localStorage.setItem('hggwire-' + k, v); } catch (e) {} };
  const get = k => { try { return localStorage.getItem('hggwire-' + k); } catch (e) { return null; } };
  const vp = v => { b.classList.toggle('mobile', v === 'mobile'); document.querySelectorAll('[data-vp]').forEach(x => x.setAttribute('aria-pressed', x.dataset.vp === v)); set('vp', v); };
  document.querySelectorAll('[data-vp]').forEach(x => x.onclick = () => vp(x.dataset.vp));
  document.querySelectorAll('[data-tg]').forEach(x => {
    const k = x.dataset.tg, inv = 'invert' in x.dataset;
    const apply = on => { b.classList.toggle(k, inv ? !on : on); x.setAttribute('aria-pressed', on); set(k, on ? '1' : '0'); };
    const saved = get(k); apply(saved === null ? x.getAttribute('aria-pressed') === 'true' : saved === '1');
    x.onclick = () => apply(x.getAttribute('aria-pressed') !== 'true');
  });
  vp(get('vp') || 'desktop');
}
