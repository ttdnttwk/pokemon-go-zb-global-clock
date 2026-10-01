'use strict';
(() => {
  const BASE = 'Asia/Bangkok';
  let mode = 'connected';
  const grid = document.getElementById('grid');
  const search = document.getElementById('search');
  const region = document.getElementById('region');
  const baseEl = document.getElementById('base');

  const formatterCache = new Map();
  function formatter(zone) {
    if (!formatterCache.has(zone)) {
      formatterCache.set(zone, new Intl.DateTimeFormat('en-CA', {
        timeZone: zone, year:'numeric', month:'2-digit', day:'2-digit',
        hour:'2-digit', minute:'2-digit', second:'2-digit', hourCycle:'h23'
      }));
    }
    return formatterCache.get(zone);
  }
  function parts(date, zone) {
    return Object.fromEntries(formatter(zone).formatToParts(date)
      .filter(x => x.type !== 'literal').map(x => [x.type, x.value]));
  }
  function epoch(p) {
    return Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
  }
  function offset(date, zone) {
    return Math.round(((epoch(parts(date, zone)) - date.getTime()) / 36e5) * 4) / 4;
  }
  function dateKey(p) { return `${p.year}-${p.month}-${p.day}`; }
  function dayRelation(local, base) {
    const a = Date.UTC(+local.year,+local.month-1,+local.day);
    const b = Date.UTC(+base.year,+base.month-1,+base.day);
    const d = Math.round((a-b)/86400000);
    if (d === 0) return 'Today';
    if (d === 1) return 'Tomorrow';
    if (d === -1) return 'Yesterday';
    return d > 0 ? `Thailand +${d} days` : `Thailand ${d} days`;
  }
  function utcLabel(n) {
    const sign=n>=0?'+':'-'; const a=Math.abs(n); const h=Math.floor(a);
    const m=Math.round((a-h)*60);
    return `UTC${sign}${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
  }
  const safeLocations = Array.isArray(window.LOCATIONS) ? window.LOCATIONS : [];
  [...new Set(safeLocations.map(x => x.region).filter(Boolean))].sort()
    .forEach(r => region.add(new Option(r,r)));

  function render() {
    const now = new Date();
    let bp, bo;
    try { bp=parts(now,BASE); bo=offset(now,BASE); }
    catch { baseEl.textContent='Thailand reference clock unavailable'; return; }

    baseEl.innerHTML = `<div>🇹🇭 THAILAND BASE</div><div class="time">${bp.hour}:${bp.minute}:${bp.second}</div><div>${dateKey(bp)} • ${utcLabel(bo)}</div>`;

    const q=search.value.trim().toLocaleLowerCase();
    const rr=region.value;
    let xs=safeLocations.filter(x => (!q || `${x.city} ${x.country}`.toLocaleLowerCase().includes(q)) && (!rr || x.region===rr));
    if(mode==='connected') xs=xs.filter(x=>x.connected);
    if(mode==='tier1') xs=xs.filter(x=>x.tier==='Tier 1');

    grid.replaceChildren(...xs.map(x => {
      const article=document.createElement('article');
      article.className=`card${x.connected?' connected':''}`;
      try {
        const p=parts(now,x.timeZone), o=offset(now,x.timeZone), d=o-bo;
        article.innerHTML=`<div class="top"><div><div class="city">${x.flag} ${x.city}</div><div class="country">${x.country}</div></div><div class="star">${x.connected?'★':''}</div></div><div class="clock">${p.hour}:${p.minute}:${p.second}</div><div class="date">${dateKey(p)}</div><div class="dayrel">${dayRelation(p,bp)}</div><div class="diff">${d===0?'Thailand BASE':`Thailand ${d>0?'+':''}${d}h`}</div><div class="meta">${x.timeZone} • ${utcLabel(o)}</div>`;
      } catch {
        article.classList.add('error');
        article.innerHTML=`<div class="city">${x.flag||''} ${x.city||'Unknown location'}</div><div class="clock">Time zone unavailable</div>`;
      }
      return article;
    }));
  }
  document.querySelectorAll('button[data-mode]').forEach(b => b.addEventListener('click', () => {
    mode=b.dataset.mode;
    document.querySelectorAll('button[data-mode]').forEach(x=>x.classList.toggle('active',x===b));
    render();
  }));
  search.addEventListener('input',render);
  region.addEventListener('change',render);
  render();
  window.setInterval(render,1000);
})();