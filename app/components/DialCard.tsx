'use client';

import { useState } from 'react';

const options = [
  {
    id: 'day',
    label: 'Day',
    angle: -58,
    title: 'Short-term rental',
    description: 'Get the equipment you need for a project, event, move, or temporary gap.',
    tag: 'Simple daily terms',
  },
  {
    id: 'month',
    label: 'Month',
    angle: 0,
    title: 'Month-to-month',
    description: 'Keep essential appliances without a long contract or an ownership commitment.',
    tag: 'Flexible monthly terms',
  },
  {
    id: 'own',
    label: 'Own',
    angle: 58,
    title: 'Rent-to-own',
    description: 'Choose a path toward ownership with approval options matched to the item.',
    tag: 'Ownership available',
  },
];

export function DialCard() {
  const [selected, setSelected] = useState(options[1]);

  return (
    <div className="dial-card">
      <p className="dial-caption">Choose your rental rhythm</p>
      <div className="dial-wrap">
        <svg className="dial-face" viewBox="0 0 270 180" aria-hidden="true">
          <path d="M29 152a108 108 0 0 1 212 0" fill="none" stroke="rgba(250,245,234,.16)" strokeWidth="2" />
          <path d="M47 149a90 90 0 0 1 176 0" fill="none" stroke="rgba(201,154,91,.45)" strokeWidth="8" strokeDasharray="2 12" />
        </svg>
        <span className="needle" style={{ '--needle': `${selected.angle}deg` } as React.CSSProperties} />
        <span className="dial-hub" />
        {options.map((option, index) => (
          <button
            className="dial-stop"
            style={{ left: `${16 + index * 34}%` }}
            type="button"
            key={option.id}
            aria-pressed={selected.id === option.id}
            onClick={() => setSelected(option)}
          >
            <span className="dot" />
            <span className="lbl">{option.label}</span>
          </button>
        ))}
      </div>
      <div className="dial-readout">
        <div className="readout-panel active" key={selected.id}>
          <h3>{selected.title}</h3>
          <p>{selected.description}</p>
          <span className="tag">{selected.tag}</span>
        </div>
      </div>
    </div>
  );
}
