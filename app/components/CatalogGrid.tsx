'use client';

import type { ReactNode } from 'react';
import { useAppContext } from './AppContext';

type CatalogEntry = {
  name: string;
  icon: ReactNode;
  specs: [string, string][];
};

const WasherIcon = (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3" y="2" width="18" height="20" rx="2" />
    <circle cx="12" cy="13" r="6" />
    <circle cx="12" cy="13" r="2.4" />
    <line x1="7" y1="5" x2="7" y2="5.4" />
    <line x1="10" y1="5" x2="10" y2="5.4" />
  </svg>
);

const DryerIcon = (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3" y="2" width="18" height="20" rx="2" />
    <circle cx="12" cy="13" r="6" />
    <path d="M9 13a3 3 0 0 0 6 0" strokeLinecap="round" />
    <line x1="7" y1="5" x2="7" y2="5.4" />
    <line x1="10" y1="5" x2="10" y2="5.4" />
  </svg>
);

const SetIcon = (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="2.5" y="2" width="8.5" height="20" rx="2" />
    <rect x="13" y="2" width="8.5" height="20" rx="2" />
    <circle cx="6.75" cy="13" r="3" />
    <circle cx="17.25" cy="13" r="3" />
  </svg>
);

const CATALOG: CatalogEntry[] = [
  {
    name: 'Washer',
    icon: WasherIcon,
    specs: [
      ['Terms', 'Month-to-month'],
      ['Delivery', 'Included'],
      ['Price from', '$XX / mo — edit me'],
    ],
  },
  {
    name: 'Dryer',
    icon: DryerIcon,
    specs: [
      ['Terms', 'Month-to-month'],
      ['Delivery', 'Included'],
      ['Price from', '$XX / mo — edit me'],
    ],
  },
  {
    name: 'Washer & Dryer Set',
    icon: SetIcon,
    specs: [
      ['Terms', 'Month-to-month or rent-to-own'],
      ['Delivery', 'Included'],
      ['Price from', '$XX / mo — edit me'],
    ],
  },
];

export function CatalogGrid() {
  const { requestItem } = useAppContext();

  return (
    <div className="catalog-grid">
      {CATALOG.map((item) => (
        <div className="plate" key={item.name}>
          <div className="plate-top">
            {item.icon}
            <span className="status-chip">Available now</span>
          </div>
          <div className="plate-body">
            <h3>{item.name}</h3>
            {item.specs.map(([label, value]) => (
              <div className="spec-row" key={label}>
                <span>{label}</span>
                <span>{value}</span>
              </div>
            ))}
            <button className="plate-cta" onClick={() => requestItem(item.name)}>
              Request this rental
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
