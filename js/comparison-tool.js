(function(){
  'use strict';

  const STRINGS = {
    en: {
      title: 'Assessment Comparison',
      subtitle: 'Track progress across assessments with current vs. previous scores',
      emptyTitle: 'No assessment data yet',
      emptyBody: 'Complete at least one assessment to see comparisons here.',
      cta: 'Start an assessment',
      average: 'Average score',
      bestGain: 'Best improvement',
      bestDrop: 'Needs attention',
      noChange: 'Stable',
      current: 'Current',
      previous: 'Previous',
      delta: 'Change',
      new: 'New',
      improved: 'Improved',
      declined: 'Declined',
      stable: 'Stable',
      scoreLabel: (val)=>`${val}%`,
      deltaLabel: (val)=>`${val>0?'+':''}${val}%`,
      loading: 'Loading comparison…',
      assessments: 'assessments'
    },
    de: {
      title: 'Bewertungsvergleich',
      subtitle: 'Verfolge Fortschritt über Bewertungen mit aktuellen vs. früheren Scores',
      emptyTitle: 'Noch keine Bewertungsdaten',
      emptyBody: 'Schließe mindestens eine Bewertung ab, um Vergleiche zu sehen.',
      cta: 'Bewertung starten',
      average: 'Durchschnitt',
      bestGain: 'Größter Fortschritt',
      bestDrop: 'Braucht Aufmerksamkeit',
      noChange: 'Stabil',
      current: 'Aktuell',
      previous: 'Vorher',
      delta: 'Veränderung',
      new: 'Neu',
      improved: 'Verbessert',
      declined: 'Verschlechtert',
      stable: 'Stabil',
      scoreLabel: (val)=>`${val}%`,
      deltaLabel: (val)=>`${val>0?'+':''}${val}%`,
      loading: 'Vergleich wird geladen…',
      assessments: 'Bewertungen'
    }
  };

  const state = {
    lang: 'en',
    containerId: null
  };

  function setLanguage(lang){
    state.lang = lang === 'de' ? 'de' : 'en';
  }

  function safeParseInt(value){
    const n = parseInt(value, 10);
    return Number.isFinite(n) ? n : null;
  }

  function formatName(raw){
    return raw
      .replace(/assessment_/,'')
      .replace(/_score/,'')
      .replace(/[-_]+/g,' ')
      .replace(/\b\w/g, (m)=>m.toUpperCase());
  }

  function loadAssessments(){
    try{
      if(!window.localStorage) return [];
    }catch(e){
      return [];
    }
    const items = [];
    for(const key in localStorage){
      if(!Object.prototype.hasOwnProperty.call(localStorage, key)) continue;
      const match = key.match(/^assessment_(.+)_score$/);
      if(!match) continue;
      const current = safeParseInt(localStorage.getItem(key));
      if(current === null) continue;
      const base = match[1];
      const prevKey = `assessment_${base}_previous_score`;
      const previous = safeParseInt(localStorage.getItem(prevKey));
      const delta = previous !== null ? current - previous : null;
      items.push({
        key: base,
        name: formatName(key),
        current,
        previous,
        delta,
        status: computeStatus(current, previous)
      });
    }
    return items.sort((a,b)=>a.name.localeCompare(b.name));
  }

  function computeStatus(current, previous){
    if(previous === null) return 'new';
    if(current > previous) return 'improved';
    if(current < previous) return 'declined';
    return 'stable';
  }

  function summarize(items){
    if(items.length === 0) return null;
    const avg = Math.round(items.reduce((sum,i)=>sum + i.current,0) / items.length);
    const gains = items.filter(i=>i.delta!==null).sort((a,b)=> (b.delta||0) - (a.delta||0));
    const drops = items.filter(i=>i.delta!==null).sort((a,b)=> (a.delta||0) - (b.delta||0));
    return {
      average: avg,
      bestGain: gains[0] || null,
      bestDrop: drops[0] || null
    };
  }

  function renderSummary(summary, strings){
    if(!summary) return '';
    const pill = (label, value)=>`
      <div style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:12px;padding:12px 14px;display:flex;flex-direction:column;gap:4px;min-width:140px;">
        <span style="color:#cbd5e1;font-size:0.9rem;">${label}</span>
        <strong style="color:#fff;font-size:1.3rem;">${value}</strong>
      </div>
    `;
    const gainText = summary.bestGain ? `${summary.bestGain.name} (${strings.deltaLabel(summary.bestGain.delta)})` : '–';
    const dropText = summary.bestDrop ? `${summary.bestDrop.name} (${strings.deltaLabel(summary.bestDrop.delta)})` : '–';
    return `
      <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:20px;">
        ${pill(strings.average, strings.scoreLabel(summary.average))}
        ${pill(strings.bestGain, gainText)}
        ${pill(strings.bestDrop, dropText)}
      </div>
    `;
  }

  function renderItem(item, strings){
    const statusMap = {
      new: { label: strings.new, color:'#6366f1' },
      improved: { label: strings.improved, color:'#10b981' },
      declined: { label: strings.declined, color:'#f97316' },
      stable: { label: strings.stable, color:'#cbd5e1' }
    };
    const status = statusMap[item.status] || statusMap.stable;
    const previousText = item.previous !== null ? strings.scoreLabel(item.previous) : '—';
    const deltaText = item.delta !== null ? strings.deltaLabel(item.delta) : '—';
    return `
      <div style="border:1px solid rgba(148,163,184,0.25);border-radius:14px;padding:16px 18px;display:flex;justify-content:space-between;align-items:center;gap:12px;background:rgba(15,23,42,0.6);color:#e2e8f0;">
        <div style="display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <strong style="font-size:1.05rem;">${item.name}</strong>
            <span style="background:${status.color}1a;border:1px solid ${status.color}40;color:${status.color};padding:4px 8px;border-radius:8px;font-size:0.8rem;">${status.label}</span>
          </div>
          <div style="display:flex;gap:18px;flex-wrap:wrap;font-size:0.95rem;color:#cbd5e1;">
            <span>${strings.current}: <strong style="color:#fff;">${strings.scoreLabel(item.current)}</strong></span>
            <span>${strings.previous}: <strong style="color:#fff;">${previousText}</strong></span>
            <span>${strings.delta}: <strong style="color:#fff;">${deltaText}</strong></span>
          </div>
        </div>
      </div>
    `;
  }

  function render(containerId){
    const container = document.getElementById(containerId);
    if(!container) return;
    const strings = STRINGS[state.lang];
    container.innerHTML = `<div style="text-align:center;color:#94a3b8;padding:32px;">${strings.loading}</div>`;

    const items = loadAssessments();
    if(items.length === 0){
      const ctaLink = state.lang === 'de' ? 'team-assessment-enhanced-v2-de.html' : 'team-assessment-enhanced-v2.html';
      container.innerHTML = `
        <div style="text-align:center;padding:32px 24px;background:rgba(15,23,42,0.7);border:1px solid rgba(148,163,184,0.3);border-radius:16px;color:#e2e8f0;">
          <h3 style="margin-bottom:8px;font-size:1.2rem;">${strings.emptyTitle}</h3>
          <p style="color:#94a3b8;margin-bottom:16px;">${strings.emptyBody}</p>
          <a href="${ctaLink}" style="display:inline-block;background:#10b981;color:#0b172a;padding:10px 16px;border-radius:10px;font-weight:700;text-decoration:none;">${strings.cta}</a>
        </div>
      `;
      return;
    }

    const summary = summarize(items);
    const cards = items.map(i=>renderItem(i, strings)).join('');
    container.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px;">
          <div>
            <h2 style="color:#0f172a;margin:0 0 6px;font-size:1.4rem;">${strings.title}</h2>
            <p style="color:#475569;margin:0;font-size:0.95rem;">${strings.subtitle}</p>
          </div>
          <div style="color:#475569;font-size:0.9rem;">${items.length} ${strings.assessments}</div>
        </div>
        ${renderSummary(summary, strings)}
        <div style="display:flex;flex-direction:column;gap:12px;">
          ${cards}
        </div>
      </div>
    `;
  }

  const ComparisonTool = {
    setLanguage,
    init(containerId){
      state.containerId = containerId;
      render(containerId);
    },
    refresh(){
      if(state.containerId) render(state.containerId);
    }
  };

  window.ComparisonTool = ComparisonTool;
})();
