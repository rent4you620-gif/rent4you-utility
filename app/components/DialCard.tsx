'use client';

import { useState } from 'react';

type Term = {
  id: string;
  label: string;
  angle: number;
  left: string;
  top: string;
  title: string;
  copy: string;
  tag: string;
};

const TERMS: Term[] = [
  {
    id: 'day',
    label: 'Day',
    angle: -58,
    left: '14%',
    top: '52%',
    title: 'Day rental',
    copy: 'Grab what you need for a weekend move, a guest visit, or a one-off job. Delivery and pickup are scheduled together.',
    tag: 'Minimum 1 day',
  },
  {
    id: 'month',
    label: 'Month',
    angle: 0,
    left: '50%',
    top: '22%',
    title: 'Month-to-month',
    copy: 'A flat monthly rate with service included. Keep it as long as you need it and cancel with a short notice — no year-long contract.',
    tag: 'Cancel anytime',
  },
  {
    id: 'own',
    label: 'Own',
    angle: 58,
    left: '86%',
    top: '52%',
    title: 'Rent-to-own',
    copy: 'Every payment goes toward ownership. Get approved first, then we order the item and it ships straight to you.',
    tag: 'Approval required',
  },
];

export function DialCard() {
  const [active, setActive] = useState(TERMS[1].id);
  const current = TERMS.find((term) => term.id === active) ?? TERMS[1];

  return (
    <div className="dial-card">
      <p className="dial-caption">Set your term</p>

      <div className="dial-wrap">
        <svg className="dial-face" viewBox="0 0 270 180" aria-hidden="true">
          <path
            d="M35 90.5 A118 118 0 0 1 235 90.5"
            fill="none"
            stroke="rgba(250,245,234,0.18)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M62 60 A98 98 0 0 1 208 60"
            fill="none"
            stroke="rgba(250,245,234,0.08)"
            strokeWidth="1"
            strokeDasharray="3 9"
          />
        </svg>

        <div
          className="needle"
          style={{ '--angle': `${current.angle}deg` } as React.CSSProperties}
        />
        <div className="dial-hub" />

        {TERMS.map((term) => (
          <button
            key={term.id}
            type="button"
            className="dial-stop"
            style={{ left: term.left, top: term.top }}
            aria-pressed={term.id === active}
            onClick={() => setActive(term.id)}
          >
            <span className="dot" />
            <span className="lbl">{term.label}</span>
          </button>
        ))}
      </div>

      <div className="dial-readout">
        {TERMS.map((term) => (
          <div
            key={term.id}
            className={term.id === active ? 'readout-panel active' : 'readout-panel'}
          >
            <h3>{term.title}</h3>
            <p>{term.copy}</p>
            <span className="tag">{term.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
