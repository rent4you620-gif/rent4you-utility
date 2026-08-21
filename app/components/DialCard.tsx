'use client';

import { useState } from 'react';

type Term = 'day' | 'month' | 'own';

const STOPS: { term: Term; angle: number; label: string; style: React.CSSProperties }[] = [
  { term: 'day', angle: -60, label: 'Day', style: { left: '35px', top: '105px' } },
  { term: 'month', angle: 0, label: 'Month', style: { left: '130px', top: '50px' } },
  { term: 'own', angle: 60, label: 'Own', style: { left: '225px', top: '105px' } },
];

const PANELS: Record<Term, { title: string; body: string; tag: string }> = {
  day: {
    title: 'Day Rentals',
    body: "Need something for a weekend or a one-off job? Rent by the day and hand it back when you're done.",
    tag: 'Ask about availability',
  },
  month: {
    title: 'Month-to-Month',
    body: "No long contracts. Cancel anytime with 30 days' notice. Washers & dryers are available now, delivered and installed.",
    tag: 'Starting at $XX / mo — edit me',
  },
  own: {
    title: 'Rent-to-Own',
    body: "Regular payments over a set term. Once it's paid off, it's yours — no balloon payment, no surprise fees.",
    tag: 'Coming soon to more categories',
  },
};

export function DialCard() {
  const [active, setActive] = useState<Term>('month');
  const angle = STOPS.find((s) => s.term === active)?.angle ?? 0;

  return (
    <div className="dial-card">
      <p className="dial-caption">Pick your term</p>
      <div className="dial-wrap">
        <div className="needle" id="needle" style={{ ['--angle' as string]: `${angle}deg` }} />
        <div className="dial-hub" />
        {STOPS.map((stop) => (
          <button
            key={stop.term}
            className="dial-stop"
            style={stop.style}
            aria-pressed={active === stop.term}
            onClick={() => setActive(stop.term)}
          >
            <span className="dot" />
            <span className="lbl">{stop.label}</span>
          </button>
        ))}
      </div>
      <div className="dial-readout">
        {(Object.keys(PANELS) as Term[]).map((term) => (
          <div key={term} className={`readout-panel${active === term ? ' active' : ''}`}>
            <h3>{PANELS[term].title}</h3>
            <p>{PANELS[term].body}</p>
            <span className="tag">{PANELS[term].tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
