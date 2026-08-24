'use client';

import { useState, type CSSProperties } from 'react';

interface Stop {
  id: string;
  label: string;
  angle: number;
  left: string;
  top: string;
  title: string;
  body: string;
  tag: string;
}

const STOPS: Stop[] = [
  {
    id: 'day',
    label: 'Day',
    angle: -52,
    left: '15.6%',
    top: '45%',
    title: 'By the day',
    body: 'Need it for a weekend, a move-out clean, or while yours is in the shop? Take it for as long as the job runs and send it back when you’re done.',
    tag: 'No contract',
  },
  {
    id: 'month',
    label: 'Month',
    angle: 0,
    left: '50%',
    top: '20%',
    title: 'Month-to-month',
    body: 'A flat monthly rate with delivery and service included. Cancel any month with a week’s notice — no early-termination fee, ever.',
    tag: 'Cancel anytime',
  },
  {
    id: 'own',
    label: 'Own',
    angle: 52,
    left: '84.4%',
    top: '45%',
    title: 'Rent-to-own',
    body: 'Every payment goes toward ownership. Get approved, we order it new, and it’s yours outright at the end of the term.',
    tag: 'Payments build equity',
  },
];

export function DialCard() {
  const [active, setActive] = useState('month');
  const current = STOPS.find((stop) => stop.id === active) ?? STOPS[1];

  return (
    <div className="dial-card">
      <p className="dial-caption">Turn the dial — pick your term</p>

      <div className="dial-wrap">
        <svg className="dial-face" viewBox="0 0 270 180" fill="none" aria-hidden="true">
          <path
            d="M42 81 A118 118 0 0 1 228 81"
            stroke="rgba(250,245,234,0.18)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M56 96 A98 98 0 0 1 214 96"
            stroke="rgba(250,245,234,0.08)"
            strokeWidth="1"
            strokeDasharray="3 7"
            strokeLinecap="round"
          />
        </svg>

        <div
          className="needle"
          style={{ '--angle': `${current.angle}deg` } as CSSProperties}
        />
        <div className="dial-hub" />

        {STOPS.map((stop) => (
          <button
            key={stop.id}
            type="button"
            className="dial-stop"
            style={{ left: stop.left, top: stop.top }}
            aria-pressed={active === stop.id}
            onClick={() => setActive(stop.id)}
          >
            <span className="dot" />
            <span className="lbl">{stop.label}</span>
          </button>
        ))}
      </div>

      <div className="dial-readout">
        {STOPS.map((stop) => (
          <div
            key={stop.id}
            className={`readout-panel${active === stop.id ? ' active' : ''}`}
          >
            <h3>{stop.title}</h3>
            <p>{stop.body}</p>
            <span className="tag">{stop.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
